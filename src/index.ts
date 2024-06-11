import * as fs from "fs/promises";
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
    const data = await fs.readFile("input/rules_grammar.txt", "utf8");

    const tokens = lex(data, domains).filter(t => t.tag != 'comment');
    console.log("Фаза лексического анализа позади!");
    const { tree } = topDownParse(tokens, parseParams);
    console.log("Построено дерево разбора, загляните в out/imgs!");
    fs.writeFile("out/graph", toGraph(tree));

    const lang = toLang(tree);

    const errors = checkSimple(lang)
        .map((v, i) => [v, errorMessages[i]])
        .filter((v) => !v[0]).map(v => v[1]);

    if (errors.length === 0) {
        console.log("Простые семантические проверки пройдены!");
    } else {
        console.log(errors);
    }
    const table = getParseTable(lang);
    console.log("Таблица сгенерирована, загляните в out/!");
    fs.writeFile("out/map-table", toMapLiteral(table));
    fs.writeFile("out/array-table", toLiteral(table));
} catch (e) {
    console.log(e.message);
}
