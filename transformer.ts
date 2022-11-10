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
					node.context = expressionNode.arguments;

					if (parent?.type !== NodeTypes.CallExpression) {
						expressionNode = {
							type: "ExpressionStatement",
							expression: expressionNode,
						};
					}

					parent?.context?.push(expressionNode);
				}
			}
		},
		NumberLiteral: {
			enter(node, parent) { 
				if (node.type === NodeTypes.NumberLiteral) {
					const numberNode = {
						type: node.type,
						value: node.value,
					};
					parent?.context?.push(numberNode);
				}
			}
		},
	});

	console.log('newAst: ', JSON.stringify(newAst));
	return newAst;
}