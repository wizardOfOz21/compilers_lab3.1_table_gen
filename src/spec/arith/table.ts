import { type TopDownParseParams, type ParseTable } from "../../parse";
import { parseInput, parseRule } from "../../parse/utils";

const table: ParseTable = 
[
    /*0*/ ['error', 'error', parseRule("E -> T Et"), 'error', parseRule("E -> T Et"), 'error'],
    /*1*/ [parseRule("Et -> + T Et"), 'error', 'error', parseRule('Et -> '), 'error', parseRule('Et -> ')],
    /*2*/ ['error', 'error', parseRule("T -> F Tt"), 'error', parseRule("T -> F Tt"), 'error'],
    /*3*/ [parseRule("Tt -> "), parseRule("Tt -> * F Tt"), 'error', parseRule("Tt -> "), 'error', parseRule("Tt -> ")],
    /*4*/ ['error', 'error', parseRule("F -> ( E )"), 'error', parseRule("F -> id"), 'error'],
];

const nonTerminalsOrder = ['E', 'Et', 'T', 'Tt', 'F'];

const terminalsOrder = ['+', '*', '(', ')', 'id', '$'];

export const delta = (X: string, a: string) => {
    return table[nonTerminalsOrder.indexOf(X)][terminalsOrder.indexOf(a)];
}

export const parseParams: TopDownParseParams = {
    N: new Set(nonTerminalsOrder),
    T: new Set(terminalsOrder),
    S: 'E',
    delta,
}
