import { ParseTable } from "../parse";

export const toLiteral = (table: ParseTable) => {
    let resultString = "";
    resultString += "[\n";

    table.forEach(row => {
        resultString += '[ ';
        row.forEach(r => {
            if (r === 'error'){
                resultString += `'error', `;
            } else {
                resultString += `'${r.lhs} -> ${r.rhs.join(' ')}', `;
            }

        })
        resultString += ' ],\n';
    })

    resultString += "]"

    return resultString;
}

