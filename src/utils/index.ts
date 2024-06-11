export function back(arr: any[]) {
    const l = arr.length;
    if (l === 0) {
        return undefined;
    }
    return arr[l-1];
}

export const areSetsEqual = (a, b) =>
    a.size === b.size && [...a].every((value) => b.has(value));

export const getTable = (n, m, initVal?) => {
    const table = new Array(n);

    for (let i = 0; i < n; ++i) {
        table[i] = new Array(m);
    }

    if (initVal) {
        for (let i = 0; i < n; ++i) {
            for (let j = 0; j < m; ++j) {
                table[i][j] = initVal;
            }
        }
    }

    return table;
};
