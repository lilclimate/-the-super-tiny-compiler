import { NodeTypes } from "./ast";

export function codegen(node: any) { 
	switch (node.type) {
		case NodeTypes.Program:
			return node.body.map(codegen).join("");
		case "ExpressionStatement":
			return codegen(node.expression) + ';';
		case NodeTypes.NumberLiteral:
			return node.value;	
		case NodeTypes.CallExpression:
			return node.callee.name + `(${node.arguments.map(codegen).join(', ')})`;
		default:
			break;
	}
}