import { ParseTable } from "../parse";

export const toMapLiteral = (table: ParseTable) => {
    let resultString = "";
    resultString += "[\n";

    table.forEach((row, i) => {
        resultString += '[ ';
        row.forEach((r, j) => {
            if (r !== 'error'){
                resultString += `[[${i+1}, ${j+1}], "${r.lhs} -> ${r.rhs.join(' ')}"], `;
            }
        })
        resultString += '\n';
    })

    resultString += "]"

    return resultString;
}
