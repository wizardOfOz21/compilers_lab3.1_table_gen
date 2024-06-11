import { type TopDownParseParams, type ParseTable } from "../../parse";
import { parseRule, parseTable } from "../../parse/utils";

const rawTable = 
[
    /*0*/ ['error', 'error', "E -> T Et", 'error', "E -> T Et", 'error'],
    /*1*/ ["Et -> + T Et", 'error', 'error', 'Et -> ', 'error', 'Et -> '],
    /*2*/ ['error', 'error', "T -> F Tt", 'error', "T -> F Tt", 'error'],
    /*3*/ ["Tt -> ", "Tt -> * F Tt", 'error', "Tt -> ", 'error', "Tt -> "],
    /*4*/ ['error', 'error', "F -> ( E )", 'error', "F -> id", 'error'],
];

const nonTerminalsOrder = ['E', 'Et', 'T', 'Tt', 'F'];
const terminalsOrder = ['+', '*', '(', ')', 'id', '$'];

const table = parseTable(rawTable);

export const delta = (X: string, a: string) => {
    return table[nonTerminalsOrder.indexOf(X)][terminalsOrder.indexOf(a)];
}

export const parseParams: TopDownParseParams = {
    N: new Set(nonTerminalsOrder),
    T: new Set(terminalsOrder),
    S: 'E',
    delta,
}
