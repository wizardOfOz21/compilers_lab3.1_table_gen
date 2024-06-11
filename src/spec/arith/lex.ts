import { DomainSpec } from "../../lex";

// приоритет задаётся порядком в массиве
export const domains: DomainSpec[] = [
    {
        tag: "n",
        re: /^[0-9]+/,
        getAttr: (match) => Number(match[0]),
    },
    {
        tag: "+",
        re: /^\+/,
    },
    {
        tag: "-",
        re: /^-/,
    },
    {
        tag: "*",
        re: /^\*/,
    },
    {
        tag: "(",
        re: /^\(/,
    },
    {
        tag: ")",
        re: /^\)/,
    },
];
