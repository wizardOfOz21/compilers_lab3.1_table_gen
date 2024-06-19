import * as fs from "fs/promises";
const { exec } = require("child_process");
import { lex } from "./lex";
import { topDownParse } from "./parse";
import { domains } from "./spec/rules/lex";
import { parseParams } from "./spec/rules/autogen";
import { toGraph } from "./format";
import { getParseTable, toLang } from "./gen/lang";
import { toLiteral } from "./format/ToLiteral";
import { toMapLiteral } from "./format/ToMapLiteral";
import { checkSimple, errorMessages } from "./gen/constraints";

try {
  const data = await fs.readFile(`input/grammar/${process.argv[2]}`, "utf8");

  const tokens = lex(data, domains).filter((t) => t.tag != "comment");
  console.log("Фаза лексического анализа позади!");
  const { tree } = topDownParse(tokens, parseParams);
  console.log("Построено дерево разбора, загляните в out/imgs!");

  const lang = toLang(tree);

  const errors = checkSimple(lang)
    .map((v, i) => [v, errorMessages[i]])
    .filter((v) => !v[0])
    .map((v) => v[1]);

  if (errors.length === 0) {
    console.log("Простые семантические проверки пройдены!");
  } else {
    console.log(errors);
  }
  const table = getParseTable(lang);
  console.log("Таблица сгенерирована, загляните в out/!");

  const out_path = `out/${process.argv[2]}`;

  await fs.mkdir(out_path, { recursive: true });

  fs.writeFile(`${out_path}/graph`, toGraph(tree));
  fs.writeFile(`${out_path}/map`, toMapLiteral(table));
  fs.writeFile(`${out_path}/array`, toLiteral(table));

  exec(`dot -Tjpg -Gdpi=300 ${out_path}/graph -o ${out_path}/graph.jpg`);
} catch (e) {
  console.log(e.message);
}
