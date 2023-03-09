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

	static checkIfKeyword(tokenText: string): Nullable<TokenType> {
		return null;
	}
}

export class Lexer {
	code: string;
	currChar: string;
	currPos: number;

	constructor(code: string) {
		this.code = code + '\n';
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
	peekChar(): string {
		if (this.currPos + 1 >= this.code.length) {
			return '\0';
		} else {
			return this.code.charAt(this.currPos + 1);
		}
	}

	// Print error message and exits
	quit(msg: string): void {
		console.log("Lexing Error: " + msg);
	}

	// Skip whitespace except newlines in code
	skipWhitespace(): void {
		let ch = this.currChar;
		if (ch == '\t' || ch == ' ' || ch == '\r') {
			this.nextChar();
		}
	}

	// Skip comments in code
	skipComment(): void {
		if (this.currChar === '#') {
			this.currChar = '0';
			while (this.currChar !== "\n") {
				this.nextChar();
			}
		}
	}


	// Return next token
	nextToken(): Nullable<Token> {
		let token: Nullable<Token> = null;

		this.skipWhitespace();
		this.skipComment();

		switch (this.currChar) {
			case '=': {
				if (this.peekChar() == '=') {
					this.nextChar()
					token = new Token("==", TokenType.EQEQ);
				} else {
					token = new Token(this.currChar, TokenType.EQ);
				}
				break;
			}
			case '>': {
				if (this.peekChar() == '=') {
					this.nextChar();
					token = new Token(">=", TokenType.GTEQ)
				} else {
					token = new Token('=', TokenType.GT)
				}
				break;
			}
			case '<': {
				if (this.peekChar() == '=') {
					this.nextChar();
					token = new Token("<=", TokenType.GTEQ)
				} else {
					token = new Token('=', TokenType.GT)
				}
				break;
			}
			case '!': {
				if (this.peekChar() == '=') {
					this.nextChar();
					token = new Token("!=", TokenType.NOTEQ)
				} else {
					this.quit(`Expected !=, got !${this.peekChar()}`);
				}
				break;
			}
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
			case '\"': {
				this.nextChar()
				let startPos = this.currPos;

				while (this.currChar != '\"') {
					if (this.currChar == '\r' || this.currChar == '\n' || this.currChar == '\t' || this.currChar == '\\' || this.currChar == '%') {
						this.quit("Illegal character in string.");
					}
					this.nextChar()

					let tokText = this.code.substring(startPos, this.currPos);
					token = new Token(tokText, TokenType.STRING);
				}
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
				if (isDigit(this.currChar)) {
					let startPos = this.currPos;

					while (isDigit(this.peekChar())) {
						this.nextChar();
					}

					if (this.peekChar() == '.') {
						this.nextChar()

						if (!(isDigit(this.peekChar()))) {
							this.quit("Illegal character in number.");
						}

						while (isDigit(this.peekChar())) {
							this.nextChar()
						}
						
						let tokText = this.code.substring(startPos, this.currPos + 1);
						token = new Token(tokText, TokenType.NUMBER);
					}
				} else if (isAlpha(this.currChar)) {
					let startPos = this.currPos;

					while (isAlphaNum(this.peekChar())) {
						this.nextChar()
					}

					let tokText = this.code.substring(startPos, this.currPos + 1);
					let keyword = Token.checkIfKeyword(tokText);

					if (keyword == null) {
						token = new Token(tokText, TokenType.IDENT);
					} else {
						token = new Token(tokText, keyword);
					}
				} else {
					this.quit(`Unknown Token: ${this.currChar}`);
				}
			}
		}
		this.nextChar()

		return token;
	}
}


function isDigit(ch: string): boolean {
	return Number(ch) != null || Number(ch) != undefined;
}

function isAlpha(ch: string): boolean {
	return 'a' >= ch && ch <= 'z' || 'A' >= ch && ch <= 'Z';
}

function isAlphaNum(ch: string): boolean {
	return isAlpha(ch) || isDigit(ch);
}
