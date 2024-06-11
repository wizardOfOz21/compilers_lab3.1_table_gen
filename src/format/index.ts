const fs = require("node:fs");
import { type InternalVertex, isExternal, isInternal, Vertex } from "../parse";

const vertex = (name, val, params?: Record<string, string>) => {
    let paramsString = "";
    for (const key in params) {
        paramsString += `,${key}="${params[key]}"`;
    }
    return `${name}[label="${val}"${paramsString}];\n`;
};

const connect = (lhs, rhs) => {
    return `${lhs} -> ${rhs};\n`;
};

const getOrder = (order: any[]) => {
    let orderString = "";
    for (const el of order) {
        orderString += ` -> ${el}`;
    }
    return `{\nrank=same;\nedge[style=invis];\n${orderString.slice(
        4
    )};\nrankdir=LR;\n}\n`;
};

let counter = 0;
let nterms: number[];

export const toGraph = (root: InternalVertex) => {
    let resultString: string = "";

    counter = 0;
    nterms = [];
    resultString += "digraph G {\n";
    resultString += toGraphDFS(root);
    resultString += getOrder(nterms);
    resultString += "\n}";

    return resultString;
};

export const toGraphDFS = (v: Vertex) => {
    let resultString = "";
    if (isInternal(v)) {
        let order = [];
        resultString += vertex(counter, v.nterm);
        const parentName = counter;
        for (const c of v.childs) {
            counter++;
            if (isInternal(c)) {
                order.push(counter);
            }
            resultString += connect(parentName, counter);
            resultString += toGraphDFS(c);
        }
        if (v.childs.length === 0) {
            // counter++;
            // resultString += connect(parentName, counter);
            // resultString += vertex(counter, '\\"\\"');
        } else {
            resultString += getOrder(order) && "";
        }
        return resultString;
    }
    resultString += vertex(counter, v.val.attr ? v.val.attr : v.val.tag, {
        shape: "box",
    });
    nterms.push(counter);
    return resultString;
};
