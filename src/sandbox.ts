import { lex } from "./lex";
import { topDownParse } from "./parse";
import { domains } from "./spec/arith/lex";
import { parseParams } from "./spec/arith/table";

const input = "id + id $";
const tokens = lex(input, domains);
console.log(tokens);
const rules = topDownParse(tokens, parseParams);

console.log(rules);
