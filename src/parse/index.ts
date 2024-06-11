import { Token } from "../lex";
import { back } from "../utils";

export type Rule = {
    lhs: string;
    rhs: string[];
};
export type ParseTable = (Rule | "error")[][];

export interface TopDownParseParams {
    N: Set<string>;
    T: Set<string>; // содержит $
    S: string;
    delta: (X: string, a: string) => Rule | "error";
}

export type Vertex = InternalVertex | ExternalVertex;

export type InternalVertex = {
    nterm: string;
    childs: Vertex[];
};

export type ExternalVertex = {
    val?: Token;
};

export const isInternal = (vertex: Vertex): vertex is InternalVertex => {
    return "nterm" in vertex;
};

export const isExternal = (vertex: Vertex): vertex is ExternalVertex => {
    return "val" in vertex;
};

export function topDownParse(
    input: Token[],
    params: TopDownParseParams
): { rules: Rule[]; tree: InternalVertex } {
    const { T, S, delta } = params;
    const rules: Rule[] = [];
    const treeRoot: InternalVertex = { nterm: S, childs: [] };

    const eofVertex: ExternalVertex = {val: {tag: '$', attr: null}};
    treeRoot.childs.push(eofVertex);
    const stack = ["$", S];
    const vertexStack: Vertex[] = [eofVertex, treeRoot];

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

                const vertex = vertexStack.pop();
                if (!isExternal(vertex)) {
                    throw new Error("Vertex stack mismatch: term");
                }
                vertex.val = a;

                next();
            } else {
                throw new Error(`Terminal mismatch ${i}`);
            }
            continue;
        }
        const rule = delta(X, a.tag);
        if (rule === "error") {
            throw new Error(`No rule found ${i}`);
        }
        stack.pop();

        const parent = vertexStack.pop();

        if (!isInternal(parent)) {
            throw new Error("Vertex stack mismatch: nterm");
        }

        for (let i = rule.rhs.length - 1; i >= 0; --i) {
            const sym = rule.rhs[i];
            stack.push(sym);
            let child: Vertex;
            if (T.has(sym)) {
                child = { val: undefined };
            } else {
                child = { nterm: sym, childs: [] };
            }
            parent.childs.push(child);
            vertexStack.push(child);
        }
        parent.childs.reverse();

        rules.push(rule);
    } while (X != "$");
    return {rules, tree: treeRoot};
}
