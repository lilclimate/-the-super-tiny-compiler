import { NodeTypes, RootNode, ChildNode } from "./ast";

export interface VisitorOption {
	enter();
	exit();
}

export interface Visitor {
	Program?: VisitorOption;
	CallExpression?: VisitorOption;
	NumberLiteral?: VisitorOption;
	StringLiteral?: VisitorOption;
	}

export function traverser(rootNode: RootNode, visitor: Visitor) { 
	// 1. 深度优先搜索
	// 2. visitor

	function traverseArray(array:ChildNode[]) {
		array.forEach(node => { 
			traverseNode(node);
		});		
	}

	function traverseNode(node: ChildNode| RootNode) {
		const visitorObj = visitor[node.type];
		if (visitorObj)
			visitorObj.enter();

		switch (node.type) {
		case NodeTypes.NumberLiteral:
			console.log('number', node);
			break;
		case NodeTypes.CallExpression:
			traverseArray(node.params);
			break;
		case NodeTypes.Program:
			traverseArray(node.body);
			break;
		}

		if (visitorObj)
			visitorObj.exit();
	}

	traverseNode(rootNode);
}