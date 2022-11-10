import { CallExpressionNode, NodeTypes, NumberLiteralNode, RootNode } from "./ast";
import { Token, TokenTypes } from "./tokenizer";


export function parser(tokens: Token[]) { 
	let current = 0;
	const rootNode = createRootNode();

	function walk() { 
		let token = tokens[current];
		if (token.type === TokenTypes.Number) { 
			current++;
			return createNumberLiteralNode(token.value);
		}

		if (token.type === TokenTypes.Paren && token.value === '(') { 
			token = tokens[++current];
			const node = createCallExpressionNode(token.value);
		
			token = tokens[++current];
			while (!(token.type === TokenTypes.Paren && token.value === ')')) { 
				node.params.push(walk());
				token = tokens[current];
			}
			current++;
			return node;
		}
		throw new Error(`undefined token: ${token}`);
	}
	
	while(current < tokens.length) { 
		rootNode.body.push(walk());
	}

	return rootNode;
	
}
function createCallExpressionNode(name: string): CallExpressionNode {
	return {
		type: NodeTypes.CallExpression,
		name,
		params: [],
	};
}

function createNumberLiteralNode(value: string): NumberLiteralNode {
	return {
		type: NodeTypes.NumberLiteral,
		value,
	};
}

function createRootNode(): RootNode {
	return {
		type: NodeTypes.Program,
		body: [],
	};
}

