import { DomainSpec } from "../../lex";

// приоритет задаётся порядком в массиве
export const domains: DomainSpec[] = [
    {
        tag: "non-terminal",
        re: /^non-terminal\b/,
    },
    {
        tag: "terminal",
        re: /^terminal\b/,
    },
    {
        tag: "axiom",
        re: /^axiom\b/,
    },
    {
        tag: "epsilon",
        re: /^epsilon\b/,
    },
    {
        tag: "comment",
        re: /^#[^$\n]*/,
    },
    {
        tag: "id",
        re: /^[a-zA-Z]\w*/,
        getAttr: (match) => match[0],
    },
    {
        tag: "str",
        re: /^'([^\n]*?)'/,
        getAttr: (match) => match[1],
    },
    {
        tag: ",",
        re: /^,/,
    },
    {
        tag: ";",
        re: /^;/,
    },
    {
        tag: "::=",
        re: /^::=/,
    },
    {
        tag: "|",
        re: /^\|/,
    },
];
