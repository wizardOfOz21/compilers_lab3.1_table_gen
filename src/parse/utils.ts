
export const parseRule = (str: string) => {
    const arr: string[] = str.split(/->|[ ]/).filter(v => v !== '');
    return {lhs: arr[0], rhs: arr.slice(1)}
}

export const parseInput = (str: string) => {
    return str.split(' ').filter(v => v !== '');
}
