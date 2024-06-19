import { type TopDownParseParams, type ParseTable } from "../../parse";
import { parseInput, parseRule, parseTable } from "../../parse/utils";

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

const rawTable = [
    [ "X -> NTS TS RS AX", 'error', 'error', 'error', 
        'error', 'error', 'error', 'error', 'error', 'error', 'error',  ],
    [ "NTS -> non-terminal IL ;", 'error', 'error', 'error', 'error', 
        'error', 'error', 'error', 'error', 'error', 'error',  ],
    [ 'error', 'error', "IL -> id ILt", 'error', 
        'error', 'error', 'error', 'error', 'error', 'error', 'error',  ],
    [ 'error', "ILt -> ", 'error', "ILt -> , id ILt", 
        'error', 'error', 'error', 'error', 'error', 'error', 'error',  ],
    [ 'error', 'error', 'error', 'error', "TS -> terminal ISL ;", 
        'error', 'error', 'error', 'error', 'error', 'error',  ],
    [ 'error', 'error', "ISL -> E ISLt", 'error', 'error', 
        'error', 'error', 'error', "ISL -> E ISLt", 'error', 'error',  ],
    [ 'error', "ISLt -> ", 'error', "ISLt -> , E ISLt", 'error', 
        'error', 'error', 'error', 'error', 'error', 'error',  ],
    [ 'error', 'error', "RS -> R ; RSt", 'error', 
        'error', 'error', 'error', 'error', 'error', 'error', 'error',  ],
    [ 'error', 'error', "RSt -> R ; RSt", 'error', 
        'error', 'error', 'error', 'error', 'error', "RSt -> ", 'error',  ],
    [ 'error', 'error', "R -> id ::= SS", 'error', 
        'error', 'error', 'error', 'error', 'error', 'error', 'error',  ],
    [ 'error', 'error', "SS -> S SSt", 'error', 'error', 'error', 
        'error', "SS -> S SSt", "SS -> S SSt", 'error', 'error',  ],
    [ 'error', "SSt -> ", 'error', 'error', 'error', 
        'error', "SSt -> | S SSt", 'error', 'error', 'error', 'error',  ],
    [ 'error', 'error', "S -> E St", 'error', 'error', 'error', 
        'error', "S -> epsilon", "S -> E St", 'error', 'error',  ],
    [ 'error', "St -> ", "St -> E St", 'error', 'error', 'error', 
        "St -> ", 'error', "St -> E St", 'error', 'error',  ],
    [ 'error', 'error', "E -> id", 'error', 'error', 
        'error', 'error', 'error', "E -> str", 'error', 'error',  ],
    [ 'error', 'error', 'error', 'error', 'error', 'error', 'error', 
        'error', 'error', "AX -> axiom id ;", 'error',  ],
    ]

const table = parseTable(rawTable);

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
