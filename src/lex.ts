import { Nullable } from "./common";

export enum TokenType {
	EOF = "EOF",
	NEWLINE = "NEWLINE",
	NUMBER = "NUMBER",
	IDENT = "IDENT",
	STRING = "STRING",

	LABEL = "LABEL",
	GOTO = "GOTO",
	PRINT = "PRINT",
	INPUT = "INPUT",
	LET = "LET",
	IF = "IF",
	THEN = "THEN",
	ENDIF = "ENDIF",
	WHILE = "WHILE",
	REPEAT = "REPEAT",
	ENDWHILE = "ENDWHILE",

	EQ = "EQ",
	PLUS = "PLUS",
	MINUS = "MINUS",
	ASTERISK = "ASTERISK",
	SLASH = "SLASH",
	EQEQ = "EQEQ",
	NOTEQ = "NOTEQ",
	LT = "LT ",
	LTEQ = "LTEQ",
	GT = "GT",
	GTEQ = "GTEQ",
}

export class Token {
	text: string;
	kind: TokenType;

	constructor(tokenText: string, tokenKind: TokenType) {
		this.text = tokenText;
		this.kind = tokenKind;
	}
}

export class Lexer {
	code: string;
	currChar: string;
	currPos: number;

	constructor(code: string) {
		this.code = code + "\n";
		this.currChar = '';
		this.currPos = -1;

		this.nextChar();
	}

	// Return next character
	nextChar(): void {
		this.currPos += 1;

		if (this.currPos >= this.code.length) {
			this.currChar = '\0';
		} else {
			this.currChar = this.code.charAt(this.currPos);
		}
	}

	// Return the character at position next + 1
	peek(): string {
		if (this.currPos + 1 >= this.code.length) {
			return '\0';
		} else {
			return this.code.charAt(this.currPos + 1);
		}
	}

	// Print error message and exits
	abort(): void {

	}

	// Skip whitespace except newlines in code
	skipWhitespace(): void {

	}

	// Skip comments in code
	skipComment(): void {

	}

	// Return next token
	nextToken(): Nullable<Token> {
		let token: Nullable<Token> = null;
		switch (this.currChar) {
			case '+': {
				token = new Token(this.currChar, TokenType.PLUS);
				break;
			}
			case '-': {
				token = new Token(this.currChar, TokenType.MINUS);
				break;
			}
			case '*': {
				token = new Token(this.currChar, TokenType.ASTERISK);
				break;
			}
			case '/': {
				token = new Token(this.currChar, TokenType.SLASH);
				break;
			}
			case '\n': {
				token = new Token(this.currChar, TokenType.NEWLINE);
				break;
			}
			case '\0': {
				token = new Token('', TokenType.EOF);
				break;
			}
			default: {
			}
		}
		this.nextChar()

		return token;
	}
}

