"use strict";
/* eslint-env node */

function transformVisitor() {
  // in order to debug
  // **** copy from here ****
  const tagsStack = [];

  function handleTextNode(node) {
    if (tagsStack.includes("pre") || tagsStack.includes("code")) {
      return;
    }
    const textValue = node.chars.trim();
    if (textValue.length === 0 && node.chars !== " ") {
      return null;
    }
  }

  let visitor = {
    TextNode: handleTextNode,
    BlockStatement(node) {
      if (node.path.original === "if") {
        if (node.params.length && node.params.length === 1) {
          const firstParam = node.params[0];
          if (firstParam.type === "BooleanLiteral") {
            if (firstParam.value === false && firstParam.original === false) {
              return null;
            }
          }
        }
      }
    },
    ElementNode: {
      enter(node) {
        tagsStack.push(node.tag);
      },
      exit() {
        tagsStack.pop();
      }
    }
  };

  // **** copy to here ****

  return visitor;
}

class TemplateNewlineTrimmingTransform {
  constructor(options) {
    this.syntax = null;
    this.options = options;
  }

  transform(ast) {
    this.syntax.traverse(ast, transformVisitor());

    return ast;
  }
}

module.exports = TemplateNewlineTrimmingTransform;
module.exports.transformFunction = transformVisitor;
