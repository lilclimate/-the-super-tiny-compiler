import { Token, TokenTypes } from "./tokenizer";


export enum NodeTypes {
	Root,
	Number,
	CallExpression
}

interface Node { 
	type: NodeTypes
}

type ChildNode = NumberNode | CallExpressionNode

interface RootNode extends Node { 
	body: ChildNode[]
}

interface NumberNode extends Node { 
	value: string
}

interface CallExpressionNode extends Node { 
	name: string,
	params: ChildNode[]
}


export function parser(tokens: Token[]) { 
	let current = 0;
	const rootNode = createRootNode();

	function walk() { 
		let token = tokens[current];
		if (token.type === TokenTypes.Number) { 
			current++;
			return createNumberNode(token.value);
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

function createNumberNode(value: string): NumberNode {
	return {
		type: NodeTypes.Number,
		value,
	};
}

function createRootNode(): RootNode {
	return {
		type: NodeTypes.Root,
		body: [],
	};
}

