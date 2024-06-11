import { ParseTable } from ".";
import { getTable } from "../utils";

export const parseRule = (str: string) => {
    const arr: string[] = str.split(/->|[ ]/).filter(v => v !== '');
    return {lhs: arr[0], rhs: arr.slice(1)}
}

export const parseInput = (str: string) => {
    return str.split(' ').filter(v => v !== '');
}

export const parseTable = (rawTable: string[][]): ParseTable => {
    const table = getTable(rawTable.length, rawTable[0].length, 'error');

    rawTable.forEach((row, i) => {
        row.forEach((rule, j) => {
            if (rule !== 'error') {
                table[i][j] = parseRule(rawTable[i][j]);
            }
        })
    })

    return table;
}
