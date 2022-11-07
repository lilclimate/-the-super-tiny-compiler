import { NodeTypes, RootNode, ChildNode } from "./ast";

export interface VisitorOption {
	enter(node: RootNode|ChildNode, parent: RootNode|ChildNode|undefined);
	exit(node: RootNode|ChildNode, parent: RootNode|ChildNode|undefined);
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

	function traverseArray(array:ChildNode[], parent: RootNode |ChildNode|undefined) {
		array.forEach(node => { 
			traverseNode(node, parent);
		});		
	}

	function traverseNode(node: ChildNode| RootNode, parent?: ChildNode|RootNode) {
		const visitorObj = visitor[node.type];
		if (visitorObj)
			visitorObj.enter(node, parent);

		switch (node.type) {
			case NodeTypes.NumberLiteral:
				console.log('number', node);
				break;
			case NodeTypes.CallExpression:
				traverseArray(node.params, node);
				break;
			case NodeTypes.Program:
				traverseArray(node.body, node);
				break;
		}

		if (visitorObj)
			visitorObj.exit(node, parent);
	}

	traverseNode(rootNode);
}