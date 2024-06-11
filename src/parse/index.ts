import { Token } from "../lex";
import { back } from "../utils";

export type Rule = {
    lhs: string;
    rhs: string[];
    };
export type ParseTable = (Rule | 'error')[][];

export interface TopDownParseParams {
    N: Set<string>;
    T: Set<string>; // содержит $
    S: string;
    delta: (X: string, a: string) => Rule | "error";
}

export function topDownParse(input: Token[], params: TopDownParseParams): Rule[] {
    const { N, T, S, delta} = params;
    const stack = ["$", S];
    const result: Rule[] = [];

    let i = 0;
    let a = input[i];
    const next = () => {
        a = input[++i];
    };
    let X: string;
    do {
        X = back(stack);
        if (T.has(X)) {
            if (X === a.tag) {
                stack.pop();
                next();
            } else {
                throw new Error(`parse error ${i}`);
            }
            continue;
        }
        const rule = delta(X, a.tag);
        if (rule === "error") {
            throw new Error(`parse error ${i}`);
        }
        stack.pop();
        for (let i = rule.rhs.length - 1; i >= 0; --i) {
            stack.push(rule.rhs[i]);
        }
        result.push(rule);
    } while (X != "$");
    return result;
}
