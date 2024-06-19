import { type TopDownParseParams, type ParseTable } from "../../parse";
import { parseRule } from "../../parse/utils";

const error = "error";

const errors = (n) => {
    const res = [];
    for (let i = 0; i < n; ++i) {
        res.push(error);
    }
    return res;
};

const getTable = (
    n: number,
    m: number,
    rules: Map<[number, number], string>
): ParseTable => {
    const table: ParseTable = new Array(n);

    for (let i = 0; i < n; ++i) {
        table[i] = new Array(m);
        for (let j = 0; j < m; ++j) {
            table[i][j] = error;
        }
    }

    rules.forEach((value, key, map) => {
        table[key[0]-1][key[1]-1] = parseRule(value);
    });

    return table;
};

const nonTerminalsOrder = [
    /*1*/ "X",
    /*2*/ "NTS",
    /*3*/ "IL",
    /*4*/ "ILt",
    /*5*/ "TS",
    /*6*/ "ISL",
    /*7*/ "ISLt",
    /*8*/ "RS",
    /*9*/ "RSt",
    /*10*/ "R",
    /*11*/ "SS",
    /*12*/ "SSt",
    /*13*/ "S",
    /*14*/ "St",
    /*15*/ "E",
    /*16*/ "AX",
];

const terminalsOrder = [
    /*1*/ "non-terminal",
    /*2*/ ";",
    /*3*/ "id",
    /*4*/ ",",
    /*5*/ "terminal",
    /*6*/ "::=",
    /*7*/ "|",
    /*8*/ "epsilon",
    /*9*/ "str",
    /*10*/ "axiom",
    /*11*/ "$",
];

const tableOptions: [[number, number], string][] = [
    [[1, 1], "X -> NTS TS RS AX"],
    [[2, 1], "NTS -> non-terminal IL ;"],
    [[3, 3], "IL -> id ILt"],
    [[4, 2], "ILt -> "], [[4, 4], "ILt -> , id ILt"],
    [[5, 5], "TS -> terminal ISL ;"],
    [[6, 3], "ISL -> E ISLt"], [[6, 9], "ISL -> E ISLt"],
    [[7, 2], "ISLt -> "], [[7, 4], "ISLt -> , E ISLt"],
    [[8, 3], "RS -> R ; RSt"],
    [[9, 3], "RSt -> R ; RSt"], [[9,10], "RSt -> "],
    [[10,3], "R -> id ::= SS"],
    [[11,3], "SS -> S SSt"], [[11,8], "SS -> S SSt"], [[11, 9], "SS -> S SSt"],
    [[12,2], "SSt ->"], [[12,7], "SSt -> | S SSt"],
    [[13,3], "S -> E St"],[[13,8], "S -> epsilon"], [[13, 9], "S -> E St"],
    [[14,2], "St ->"], [[14,3], "St -> E St"], [[14,7], "St -> "], [[14,9], "St -> E St"],
    [[15,3], "E -> id"], [[15,9], "E -> str"],
    [[16,10], "AX -> axiom id ;"],
];

const table = getTable(
    nonTerminalsOrder.length,
    terminalsOrder.length,
    new Map(tableOptions)
);

export const delta = (X: string, a: string) => {
    const i = nonTerminalsOrder.indexOf(X);
    const j = terminalsOrder.indexOf(a);
    return table[i][j];
};

export const parseParams: TopDownParseParams = {
    N: new Set(nonTerminalsOrder),
    T: new Set(terminalsOrder),
    S: "X",
    delta,
};
