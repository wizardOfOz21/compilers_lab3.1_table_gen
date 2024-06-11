import { ParseTable } from "../parse";

export const toLiteral = (table: ParseTable) => {
    let resultString = "";
    resultString += "[\n";

    table.forEach((row) => {
        resultString += "[ ";
        const deleteQuotes = (v: string) => {
            if (v[0] === "'") {
                return v.slice(1, -1);
            }
            return v;
        };
        row.forEach((r) => {
            if (r === "error") {
                resultString += `'error', `;
            } else {
                resultString += `"${r.lhs} -> ${r.rhs
                    .map(deleteQuotes)
                    .join(" ")}", `;
            }
        });
        resultString += " ],\n";
    });

    resultString += "]";

    return resultString;
};
