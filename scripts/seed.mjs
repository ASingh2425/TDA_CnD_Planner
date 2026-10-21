import { writeFileSync, readFileSync } from "node:fs";
import ts from "typescript";
let source = readFileSync("src/data.ts", "utf8").replace(
  /import initiatives from ['"]\.\/initiatives\.json['"];/,
  `const initiatives=${readFileSync("src/initiatives.json", "utf8")};`,
);
const js = ts.transpile(source, {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ES2022,
});
const { tasks, initiatives } = await import(
  "data:text/javascript;base64," + Buffer.from(js).toString("base64")
);
const quote = (x) => "'" + String(x).replaceAll("'", "''") + "'";
const rows = initiatives.map(
  (p) =>
    `insert into public.initiatives(id,title,description,specification) values(${quote(p.id)},${quote(p.title)},${quote(p.description)},${quote(JSON.stringify(p))}::jsonb) on conflict do nothing;\n` +
    p.tasks
      .map(
        (t) =>
          `insert into public.milestones values(${quote(t.id)},${quote(p.id)},${quote(t.text)}) on conflict do nothing;`,
      )
      .join("\n"),
);
for (const t of tasks) {
  rows.push(
    `insert into public.tasks(id,title,description,initiative_id,track,difficulty,skills,prerequisites,instructions,criteria,deliverable,effort,resources,repository_url) select id,title,description,initiative_id,track,difficulty,skills,prerequisites,instructions,criteria,deliverable,effort,resources,repository_url from jsonb_populate_record(null::public.tasks,${quote(JSON.stringify(t))}::jsonb) on conflict do nothing;`,
  );
}
writeFileSync(
  "supabase/002_catalog.sql",
  "-- Public catalog only: no members, assignments, submissions or achievements.\n" +
    rows.join("\n"),
);
console.log("Generated catalog seed.");
