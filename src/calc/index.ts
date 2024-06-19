import * as fs from "fs/promises";
const { exec } = require('child_process');
import { domains } from "../spec/arith/lex";
import { lex } from "../lex";
import { topDownParse } from "../parse";
import { toGraph } from "../format";
import { parseParams } from "../spec/arith/autogen";
import { calculate } from "./calculate";

try {
    const data = await fs.readFile(`input/sentence/${process.argv[2]}`, "utf8");
    const tokens = lex(data, domains);
    const { tree } = topDownParse(tokens, parseParams);

    const out_path = `out/calc`;

    await fs.mkdir(out_path, { recursive: true });

    console.log(calculate(tree));
    fs.writeFile("out/calc/graph", toGraph(tree));
    exec(`dot -Tjpg -Gdpi=300 ${out_path}/graph -o ${out_path}/graph.jpg`)
} catch (e) {
    console.log(e.message);
}
