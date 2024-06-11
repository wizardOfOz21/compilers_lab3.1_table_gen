// re должно начинаться с ^, не должно содержать флага g
export type DomainSpec = {
    tag: string;
    re: RegExp;
    getAttr?: (str: RegExpMatchArray) => any;
};

export type Token = {
    tag: string;
    attr: any;
};

const EOF: DomainSpec = {
    tag: "EOF",
    re: /^\$/,
};

const NL: DomainSpec = {
    tag: "NL",
    re: /^\n/,
};

const SP: DomainSpec = {
    tag: "SP",
    re: /^[ ]+/,
};

// input – строка терминированная $
export function lex(input: string, specs: DomainSpec[]): Token[] {
    let col = 1;
    let row = 1;
    const tokens: Token[] = [];
    specs.push(EOF);
    specs.push(NL);
    specs.push(SP);
    while (true) {
        let hasMatch = false;
        for (const spec of specs) {
            const match = input.match(spec.re);
            if (match) {
                const matchLength = match[0].length;
                hasMatch = true;
                switch (spec.tag) {
                    case EOF.tag:
                        tokens.push({
                            tag: '$',
                            attr: null,
                        });
                        return tokens;
                    case NL.tag:
                        row += 1;
                        col = 1;
                        input = input.slice(matchLength);
                        break;
                    case SP.tag:
                        col += matchLength;
                        input = input.slice(matchLength);
                        break;
                    default:
                        col += matchLength;
                        input = input.slice(matchLength);
                        tokens.push({
                            tag: spec.tag,
                            attr: spec.getAttr ? spec.getAttr(match) : null,
                        });
                        break;
                }
                break;
            }
        }
        if (!hasMatch) {
            throw new Error(`unknown lexem on ${row}.${col}`);
        }
    }
}
