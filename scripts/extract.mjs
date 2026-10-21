import { readFileSync, writeFileSync } from "node:fs";
import vm from "node:vm";
const html = readFileSync("archive/original.html", "utf8");
const source = html.match(/const MASTER_PROJECTS = (\[[\s\S]*?\n    \]);/)[1];
const projects = vm.runInNewContext(source);
writeFileSync("src/initiatives.json", JSON.stringify(projects, null, 2));
console.log(
  `Preserved ${projects.length} initiatives and ${projects.reduce((n, p) => n + p.tasks.length, 0)} milestones.`,
);
