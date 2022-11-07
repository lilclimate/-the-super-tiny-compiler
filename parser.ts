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
	const rootNode = createRootNode();
	let current = 0;
	let token = tokens[current];
	if (token.type === TokenTypes.Number) 
		rootNode.body.push(createNumberNode(token.value));
	
	if (token.type === TokenTypes.Paren && token.value === '(') { 
		token = tokens[++current];
		const node = createCallExpressionNode(token.value);

		token = tokens[++current];
		while (!(token.type === TokenTypes.Paren && token.value === ')')) { 
			if (token.type === TokenTypes.Number) 
				node.params.push(createNumberNode(token.value));
				token = tokens[++current];
		}
		current++;
		rootNode.body.push(node);
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

