import { type TopDownParseParams, type ParseTable } from "../../parse";
import { parseRule, parseTable } from "../../parse/utils";

const rawTable = [
    [ 'error', 'error', 'E -> T E1', 'E -> T E1', 'error', 'error',  ],
    [ 'E1 -> + T E1', 'error', 'error', 'error', 'E1 -> ', 'E1 -> ',  ],
    [ 'error', 'error', 'T -> F T1', 'T -> F T1', 'error', 'error',  ],
    [ 'T1 -> ', 'T1 -> * F T1', 'error', 'error', 'T1 -> ', 'T1 -> ',  ],
    [ 'error', 'error', 'F -> n', 'F -> ( E )', 'error', 'error',  ],
]

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
