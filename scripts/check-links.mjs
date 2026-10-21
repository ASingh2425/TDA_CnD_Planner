import fs from "node:fs";
const projects = JSON.parse(fs.readFileSync("src/initiatives.json", "utf8"));
const urls = [
  ...new Set(
    projects
      .flatMap((p) => p.resources.map((r) => r.url))
      .filter((u) => u.startsWith("https://")),
  ),
];
for (const path of ["src/data.ts", "src/MemberPages.tsx"]) {
  for (const match of fs
    .readFileSync(path, "utf8")
    .matchAll(/https:\/\/[^"'\s<>]+/g)) {
    if (!match[0].includes("*") && !urls.includes(match[0]))
      urls.push(match[0]);
  }
}
urls.unshift("https://tda-cnd26.vercel.app/");
const results = [];
for (let i = 0; i < urls.length; i += 5) {
  await Promise.all(
    urls.slice(i, i + 5).map(async (url) => {
      try {
        const response = await fetch(url, {
          signal: AbortSignal.timeout(8000),
          redirect: "follow",
        });
        results.push({ url, status: response.status, final: response.url });
        if (url === "https://tda-cnd26.vercel.app/") {
          const html = await response.text();
          const original = fs.readFileSync("archive/original.html", "utf8");
          const normalize = (x) => x.replaceAll("\r\n", "\n").trim();
          fs.writeFileSync(
            "docs/LIVE_AUDIT.json",
            JSON.stringify(
              {
                url,
                status: response.status,
                title: html.match(/<title>(.*?)<\/title>/s)?.[1],
                matchesOriginal: normalize(html) === normalize(original),
                hasOriginalChecklist: html.includes("MASTER_PROJECTS"),
                checkedAt: new Date().toISOString(),
              },
              null,
              2,
            ),
          );
        } else await response.body?.cancel();
      } catch (e) {
        results.push({ url, status: "unverified", reason: e.message });
      }
    }),
  );
}
fs.writeFileSync("docs/LINK_CHECKS.json", JSON.stringify(results, null, 2));
console.log(JSON.stringify(results));
