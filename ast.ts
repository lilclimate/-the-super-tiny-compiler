

export enum NodeTypes {
	NumberLiteral = "NumberLiteral",
	Program = "Program",
	StringLiteral = "StringLiteral",
	CallExpression = "CallExpression"
}

export type ChildNode = NumberNode | CallExpressionNode| StringLiteralNode;

interface Node {
	type: NodeTypes;
}
export interface RootNode extends Node {
	body: ChildNode[];
}
export interface NumberNode extends Node {
	value: string;
}

export interface StringLiteralNode extends Node {
  value: string;
}

export interface CallExpressionNode extends Node {
	name: string;
	params: ChildNode[];
}
