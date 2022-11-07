

export enum NodeTypes {
	NumberLiteral = "NumberLiteral",
	Program = "Program",
	StringLiteral = "StringLiteral",
	CallExpression = "CallExpression"
}

export type ChildNode = |NumberLiteralNode | CallExpressionNode| StringLiteralNode;

export interface Node {
	type: NodeTypes;
}
export interface RootNode extends Node {
	body: ChildNode[];
}
export interface NumberLiteralNode extends Node {
	value: string;
}

export interface StringLiteralNode extends Node {
  value: string;
}

export interface CallExpressionNode extends Node {
	name: string;
	params: ChildNode[];
}
