export function back(arr: any[]) {
    const l = arr.length;
    if (l === 0) {
        return undefined;
    }
    return arr[l-1];
}
