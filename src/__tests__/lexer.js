import { lex } from "../lex";
import { domains } from "../lex/specs/lang";

test("lexer работаетб", () => {
    const input =
        "abba ::= ; , || 'asdasd' axiom terminal epsilon non-terminal # asdasd 1$";
    expect(lex(input, domains)).toMatchSnapshot();
});
