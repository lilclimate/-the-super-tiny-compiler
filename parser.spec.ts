import { expect, test  } from "vitest";
import { NodeTypes } from "./ast";
import { parser } from "./parser";
import { TokenTypes } from "./tokenizer";
test('parser', () => {
	const tokens = 
    [
      { type: TokenTypes.Paren,  value: '('        },
      { type: TokenTypes.Name,   value: 'add'      },
      { type: TokenTypes.Number, value: '2'        },
      { type: TokenTypes.Paren,  value: '('        },
      { type: TokenTypes.Name,   value: 'subtract' },
      { type: TokenTypes.Number, value: '4'        },
      { type: TokenTypes.Number, value: '2'        },
      { type: TokenTypes.Paren,  value: ')'        },
      { type: TokenTypes.Paren,  value: ')'        },
    ];	

	const ast = {
      type: NodeTypes.Program,
      body: [{
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [{
          type: NodeTypes.NumberLiteral,
          value: '2',
        }, {
          type: NodeTypes.CallExpression,
          name: 'subtract',
          params: [{
            type: NodeTypes.NumberLiteral,
            value: '4',
          }, {
            type: NodeTypes.NumberLiteral,
            value: '2',
          }]
        }]
      }]
    };
	expect(parser(tokens)).toEqual(ast);
});

test('number', () => { 
	const tokens = [{
		type: TokenTypes.Number,
		value: "2"
	}];

	const ast = {
		type: NodeTypes.Program,
		body: [{
			type: NodeTypes.NumberLiteral,
			value: "2"
		}]
	};
	expect(parser(tokens)).toEqual(ast);
});

test('callExpression', () => {
	const tokens = 
    [
      { type: TokenTypes.Paren,  value: '('        },
      { type: TokenTypes.Name,   value: 'add'      },
      { type: TokenTypes.Number, value: '2'        },
      { type: TokenTypes.Number, value: '4'        },
      { type: TokenTypes.Paren,  value: ')'        },
    ];	

	const ast = {
      type: NodeTypes.Program,
      body: [{
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [{
          type: NodeTypes.NumberLiteral,
          value: '2',
        }, {
          type: NodeTypes.NumberLiteral,
          value: '4',
        }]
      }]
    };
	expect(parser(tokens)).toEqual(ast);
});

test('two callExpression', () => {
	const tokens = 
    [
      { type: TokenTypes.Paren,  value: '('        },
      { type: TokenTypes.Name,   value: 'add'      },
      { type: TokenTypes.Number, value: '2'        },
      { type: TokenTypes.Number, value: '4'        },
      { type: TokenTypes.Paren,  value: ')'        },
			{ type: TokenTypes.Paren,  value: '('        },
      { type: TokenTypes.Name,   value: 'add'      },
      { type: TokenTypes.Number, value: '3'        },
      { type: TokenTypes.Number, value: '5'        },
      { type: TokenTypes.Paren,  value: ')'        },
    ];	

	const ast = {
      type: NodeTypes.Program,
      body: [{
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [{
          type: NodeTypes.NumberLiteral,
          value: '2',
        }, {
          type: NodeTypes.NumberLiteral,
          value: '4',
        }]
			},
			{
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [{
          type: NodeTypes.NumberLiteral,
          value: '3',
        }, {
          type: NodeTypes.NumberLiteral,
          value: '5',
        }]
      }]
    };
	expect(parser(tokens)).toEqual(ast);
});