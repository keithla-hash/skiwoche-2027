// Prerenders the German default into index.html so the comparison is readable without JavaScript.
import fs from "node:fs"; import vm from "node:vm"; import path from "node:path";
const dir = path.join(path.dirname(new URL(import.meta.url).pathname), "docs");
const ctx = { window: {} }; ctx.globalThis = ctx.window; vm.createContext(ctx);
for (const f of ["data.js", "render.js"]) vm.runInContext(fs.readFileSync(path.join(dir, f), "utf8"), ctx);
const { SKI, STAYS } = ctx.window; const st = { lang: "de", sort: "couple", region: "all", withPass: false, refundable: false };
const t = SKI.STR.de;
let html = fs.readFileSync(path.join(dir, "..", "index.src.html"), "utf8")
  .replace("<!--board-->", SKI.board(STAYS, "de"))
  .replace("<!--sort-->", SKI.seg(SKI.SORTS, t.sortBy, st.sort, "sort"))
  .replace("<!--region-->", SKI.seg(SKI.REGIONS, t.regions, st.region, "region"))
  .replace("<!--thead-->", SKI.thead("de"))
  .replace("<!--rows-->", SKI.rows(STAYS, "de", st))
  .replace("<!--facts-->", SKI.facts("de"));
fs.writeFileSync(path.join(dir, "index.html"), html);
console.log("built", html.length, "bytes");
