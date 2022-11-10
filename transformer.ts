import { CallExpressionNode, NodeTypes, RootNode } from "./ast";
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
				if (node.type !== NodeTypes.CallExpression) return;
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

				pushNode(parent, expressionNode);
			}
		},
		NumberLiteral: {
			enter(node, parent) {
				if (node.type !== NodeTypes.NumberLiteral) return;
				const numberNode = {
					type: node.type,
					value: node.value,
				};
				pushNode(parent, numberNode);
			}
		},
	});

	return newAst;
}

function pushNode(parent: RootNode|CallExpressionNode|undefined, data: any) {
	parent?.context?.push(data);
}
