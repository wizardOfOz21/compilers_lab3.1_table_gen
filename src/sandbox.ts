import { toGraph } from "./format";
import { lex } from "./lex";
import { topDownParse } from "./parse";
import { domains } from "./spec/arith/lex";
import { parseParams } from "./spec/arith/table";

const input = "id + id $";
const tokens = lex(input, domains);
console.log(tokens);
const {tree} = topDownParse(tokens, parseParams);
toGraph(tree, './out');
// console.log(rules);
