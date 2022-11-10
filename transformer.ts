import { NodeTypes, RootNode } from "./ast";
import { traverser } from "./traverser";

export function transformer(ast: RootNode) { 
	const newAst = {
		type: NodeTypes.Program,
		body: [],
	};	

	ast.context = newAst.body;

	traverser(ast, {
		CallExpression: {
			enter(node, parent) { 
				if (node.type === NodeTypes.CallExpression) {
					let expressionNode:any;

					expressionNode = {
						type: node.type,	
						callee: {
							type: "Identifier",
							name: node.name,
						},
						arguments: [],
					};

					expressionNode = {
						type: "ExpressionStatement",
						expression: expressionNode,
					};

					parent?.context?.push(expressionNode);
				}
			}
		}		
	});
	return newAst;
}