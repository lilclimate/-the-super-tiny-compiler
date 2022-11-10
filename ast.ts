

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
	type: NodeTypes.Program;
	context?: ChildNode[];
}
export interface NumberLiteralNode extends Node {
	value: string;
	type: NodeTypes.NumberLiteral;
	context?: ChildNode[];
}

export interface StringLiteralNode extends Node {
  value: string;
	type: NodeTypes.StringLiteral;
	context?: ChildNode[];
}

export interface CallExpressionNode extends Node {
	name: string;
	params: ChildNode[];
	type: NodeTypes.CallExpression;
	context?: ChildNode[];
}
