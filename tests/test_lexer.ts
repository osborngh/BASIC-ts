import { Lexer, TokenType } from "../src/lex";

function completed(num: number) {
	console.log(`test_lexer_${num} completed successfully`);
}

function test_lexer_1() {
	const code: string =  "LET foobar = 123";

	let lexer = new Lexer(code);

	while (lexer.peekChar() != '\0') {
		console.log(lexer.currChar)
		lexer.nextChar()
	}
	completed(1);
}

function test_lexer_2() {
	const code: string = `+- */+*`;
	let lexer = new Lexer(code);

	let token = lexer.nextToken();
	while (true) {
		if (token == null) {
			console.log("NULL TOKEN");

			token = lexer.nextToken()
			continue;
		}
		if (token.kind != TokenType.EOF) {
			console.log(token.kind);
			token = lexer.nextToken();
		} else {
			break;
		}
	}
	completed(2);
}

function test_lexer_3() {
	const code: string = '+-*/>>==!=';

	let lexer = new Lexer(code);
	let token = lexer.nextToken();
	while (true) {
		if (token == null) {
			console.log("NULL TOKEN");

			token = lexer.nextToken()
			continue;
		}
		if (token.kind != TokenType.EOF) {
			console.log(token.kind);
			token = lexer.nextToken();
		} else {
			break;
		}
	}

	completed(3);
}


// test_lexer_1();
// test_lexer_2();
test_lexer_3();
