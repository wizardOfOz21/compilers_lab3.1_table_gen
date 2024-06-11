import * as fs from "fs/promises";
import { domains } from "../spec/arith/lex";
import { lex } from "../lex";
import { topDownParse } from "../parse";
import { toGraph } from "../format";
import { parseParams } from "../spec/arith/autogen";
import { calculate } from "./calculate";

try {
    const data = await fs.readFile("input/calc_input.txt", "utf8");
    const tokens = lex(data, domains);
    const { tree } = topDownParse(tokens, parseParams);

    console.log(calculate(tree));
    fs.writeFile("out/calc/graph", toGraph(tree));
} catch (e) {
    console.log(e.message);
}
