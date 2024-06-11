import { type TopDownParseParams } from "../../parse";
import { parseTable } from "../../parse/utils";

const rawTable = [
    [ 'error', 'error', 'E -> T E1', 'E -> T E1', 'error', 'error',  ],
    [ 'E1 -> + T E1', 'error', 'error', 'error', 'E1 -> ', 'E1 -> ',  ],
    [ 'error', 'error', 'T -> F T1', 'T -> F T1', 'error', 'error',  ],
    [ 'T1 -> ', 'T1 -> * F T1', 'error', 'error', 'T1 -> ', 'T1 -> ',  ],
    [ 'error', 'error', 'F -> n', 'F -> ( E )', 'error', 'error',  ],
]

const nonTerminalsOrder = ['E', 'E1', 'T', 'T1', 'F'];
const terminalsOrder = ['+', '*', 'n', '(', ')', '$'];

const table = parseTable(rawTable);

export const delta = (X: string, a: string) => {
    const i = nonTerminalsOrder.indexOf(X);
    const j = terminalsOrder.indexOf(a);
    return table[i][j];
}

export const parseParams: TopDownParseParams = {
    N: new Set(nonTerminalsOrder),
    T: new Set(terminalsOrder),
    S: 'E',
    delta,
}
