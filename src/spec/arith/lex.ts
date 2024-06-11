import { DomainSpec } from "../../lex";

// приоритет задаётся порядком в массиве
export const domains: DomainSpec[] = [
    {
        tag: "id",
        re: /^[a-zA-Z]\w*/,
        getAttr: (match) => match[0],
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
