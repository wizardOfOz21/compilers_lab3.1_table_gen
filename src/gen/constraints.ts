import { areSetsEqual } from "../utils";
import { Language } from "./lang";

export const checkNTermDef = (lang: Language) => {
    return areSetsEqual(
        new Set(lang.nterms),
        new Set(lang.rules.map((r) => r.lhs))
    );
};

export const checkAxiomDefine = (lang: Language) => {
    return lang.axioms.length !== 0;
};

export const checkMultipleAxiomDefine = (lang: Language) => {
    return lang.axioms.length < 2;
};

export const checkUse = (lang: Language) => {
    for (const r of lang.rules) {
        if (!lang.nterms.includes(r.lhs)) {
            return false;
        }
        for (const s of r.rhs) {
            if (!(lang.nterms.includes(s) || lang.terms.includes(s))) {
                return false;
            }
        }
    }
    for (const a of lang.axioms) {
        if (!lang.nterms.includes(a)) {
            return false;
        }
    }
    return true;
};

let findDuplicates = (arr) =>
    arr.filter((item, index) => arr.indexOf(item) !== index);
export const checkMultipleDecl = (lang: Language) => {
    const dupls = findDuplicates([...lang.nterms, ...lang.terms]);
    return dupls.length === 0;
};

export const errorMessages = [
    "Аксиома не определена",
    "Определено несколько аксиом",
    "Множественная декларация символа",
    "Множества описанных и определенных нетерминалов не совпадают",
    "Использован неделарированный символ"
]

export const checkSimple = (lang: Language) => {
    return [
        checkAxiomDefine(lang),
        checkMultipleAxiomDefine(lang),
        checkMultipleDecl(lang),
        checkNTermDef(lang),
        checkUse(lang),
    ]
};
