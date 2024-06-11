import * as fs from "fs/promises";
import { lex } from "./lex";
import { topDownParse } from "./parse";
import { domains } from "./spec/rules/lex";
import { parseParams } from "./spec/rules/handmade";
import { toGraph } from "./format";
import { getParseTable, toLang } from "./gen/lang";
import { toLiteral } from "./format/ToLiteral";

const data = await fs.readFile("input/input.txt", "utf8");

const tokens = lex(data, domains);
const { tree } = topDownParse(tokens, parseParams);

const lang = toLang(tree);
const table = getParseTable(lang);

fs.writeFile("out/graph", toGraph(tree))
fs.writeFile("out/table", toLiteral(table))
