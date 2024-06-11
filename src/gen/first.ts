import { areSetsEqual } from "../utils";
import { Language } from "./lang";

export const getF = (lang: Language, firsts: Map<string, Set<string>>) => {
    const first = (X: string) => firsts.get(X);
    const isEps = (X: string) => first(X).has("epsilon");
    const isTerm = (a: string) => lang.terms.includes(a);

    const F = (seq: string[]): Set<string> => {
        if (seq.length === 0) {
            return new Set(["epsilon"]);
        }
        if (isTerm(seq[0])) {
            return new Set([seq[0]]);
        }
        const X = seq[0];
        if (isEps(X)) {
            const firstX = new Set(first(X));
            firstX.delete("epsilon");
            return new Set([...firstX, ...F(seq.slice(1))]);
        }
        return new Set(first(X));
    };

    return F;
};

export const getFirst = (lang: Language) => {
    const firsts = new Map<string, Set<string>>();
    const first = (X: string) => firsts.get(X);

    lang.nterms.forEach((v) => {
        firsts.set(v, new Set());
    });

    const F = getF(lang, firsts);

    let changed = true;
    while (changed) {
        changed = false;
        lang.rules.forEach((r) => {
            const X = r.lhs;
            const newFirstX = new Set([...first(X), ...F(r.rhs)]);
            if (!areSetsEqual(first(X), newFirstX)) {
                changed = true;
                firsts.set(X, newFirstX);
            }
        });
    }

    return [F, firsts] as const;
};
