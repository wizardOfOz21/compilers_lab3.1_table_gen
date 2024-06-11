import {
    ExternalVertex,
    InternalVertex,
    isExternal,
    isInternal,
    ParseTable,
    Rule,
    Vertex,
} from "../parse";
import { getTable } from "../utils";
import { getFirst } from "./first";
import { getFollow } from "./follow";

export type Language = {
    terms: string[];
    nterms: string[];
    rules: Rule[];
    axioms: string[];
};

let terms: string[];
let nterms: string[];
let rules: Rule[];
let axioms: string[];

export const toLang = (root: InternalVertex): Language => {

    terms = [];
    nterms = [];
    rules = [];
    axioms = [];

    dfs(root, toLangV);

    return { terms, nterms, rules, axioms };
};

const dfs = (v: Vertex, visit: (v: Vertex) => void) => {
    visit(v);
    if (isExternal(v)) {
        return;
    }
    for (const c of v.childs) {
        dfs(c, visit);
    }
};

const getNterms = (v: Vertex) => {
    if (isExternal(v)) {
        return;
    }
    switch (v.nterm) {
        case "IL":
            nterms.push((v.childs[0] as ExternalVertex).val.attr);
            break;

        case "ILt":
            if (v.childs.length !== 0)
                nterms.push((v.childs[1] as ExternalVertex).val.attr);
            break;
    }
};

const getTerms = (v: Vertex) => {
    if (isExternal(v)) {
        return;
    }
    if (v.nterm === "E") {
        terms.push((v.childs[0] as ExternalVertex).val.attr);
    }
};

const getRules = (v: InternalVertex) => {
    const lhs = (v.childs[0] as ExternalVertex).val.attr;

    dfs(v, (s: Vertex) => {
        if (isExternal(s)) {
            return;
        }
        if (s.nterm === "S") {
            const rhs = [];
            dfs(s, (e: Vertex) => {
                if (isExternal(e)) {
                    return;
                }
                if (e.nterm === "E") {
                    rhs.push((e.childs[0] as ExternalVertex).val.attr);
                }
            });
            rules.push({ lhs, rhs });
        }
    });
};

const toLangV = (v: Vertex) => {
    if (isExternal(v)) {
        return;
    }
    switch (v.nterm) {
        case "NTS":
            dfs(v, getNterms);
            return;
        case "TS":
            dfs(v, getTerms);
            return;
        case "R":
            getRules(v);
            return;
        case "AX":
            axioms.push((v.childs[1] as ExternalVertex).val.attr);
        default:
            break;
    }
};

export const getParseTable = (lang: Language): ParseTable => {
    const [FIRST, f] = getFirst(lang);
    const [FOLLOW, fl] = getFollow(lang, FIRST);

    lang.terms.push('$');

    const table: ParseTable = getTable(lang.nterms.length, lang.terms.length, 'error');
    const add = (X,a,r) => {
        const pred = table[lang.nterms.indexOf(X)][lang.terms.indexOf(a)];
        if (!pred) {return;}
        if (pred !== 'error') {throw new Error("Not LL1 grammar ):"); }

        table[lang.nterms.indexOf(X)][lang.terms.indexOf(a)] = r;
    }

    lang.rules.forEach(r => {
        const X = r.lhs;
        const u = r.rhs;

        for (const a of FIRST(u)) {
            add(X,a,r);
        }

        if (FIRST(u).has('epsilon')) {
            for (const b of FOLLOW(X)) {
                add(X,b,r);
            }
        }
    })

    return table;
}
