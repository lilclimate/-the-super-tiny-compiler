import { NodeTypes } from "./ast";

export function codegen(node: any) { 
	switch (node.type) {
		case NodeTypes.Program:
			return codegen(node.body[0]);
		case "ExpressionStatement":
			return codegen(node.expression) + ';';
		case NodeTypes.NumberLiteral:
			return node.value;	
		default:
			break;
	}
}