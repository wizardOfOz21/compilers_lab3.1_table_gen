import { areSetsEqual } from "../utils";
import { Language } from "./lang";

export const getFollow = (lang: Language, F: (s: string[]) => Set<string>) => {
    const follows = new Map<string, Set<string>>();
    const follow = (X: string) => follows.get(X);

    lang.nterms.forEach((X) => {
        follows.set(X, new Set());
    });

    follow(lang.axioms[0]).add("$");

    const isNTerm = (X: string) => lang.nterms.includes(X);

    lang.rules.forEach((r) => {
        r.rhs.forEach((Y, i) => {
            if (isNTerm(Y)) {
                const v = r.rhs.slice(i + 1);
                const firstV = new Set(F(v));
                firstV.delete("epsilon");
                follows.set(Y, new Set([...follow(Y), ...firstV]));
            }
        });
    });

    let changed = true;

    while (changed) {
        changed = false;
        lang.rules.forEach((r) => {
            const X = r.lhs;
            r.rhs.forEach((Y, i) => {
                if (!isNTerm(Y)) {
                    return;
                }

                const v = r.rhs.slice(i + 1);
                const firstV = new Set(F(v));
                if (firstV.has("epsilon")) {
                    const newFollowY = new Set([...follow(Y), ...follow(X)]);
                    if (!areSetsEqual(follow(Y), newFollowY)) {
                        changed = true;
                        follows.set(Y, newFollowY);
                    }
                }
            });
        });
    }

    return [(X: string) => follows.get(X), follows] as const;
};
