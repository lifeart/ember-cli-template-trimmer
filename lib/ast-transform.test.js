"use strict";
/* eslint-env jest */
/* eslint-env node */

const { preprocess, print }= require("@glimmer/syntax");
const { precompile } = require("@glimmer/compiler");
const { transformFunction } = require("./ast-transform");

it('should skip newlines', ()=>{
    const input = `
        <a>
        </a>
    `;
    assert(transformInput(input).length, 3);
});

it('should keep newlines for code', ()=>{
    const input = `
        <a>
        <code>
        </code>
        </a>
    `;
    assert(transformInput(input).length, 7);
});

it('should keep newlines for pre', ()=>{
    const input = `
        <a>
        <pre>
        </pre>
        </a>
    `;
    assert(transformInput(input).length, 7);
});


it('should keep newlines with text', ()=>{
    const input = `
        <a>
        <b>a
        </b>
        </a>
    `;
    assert(transformInput(input).length, 7);
});

it('should keep single-spaced text', ()=>{
    const input = `
        <a>
        </a> <n></n>
    `;
    assert(transformInput(input).length, 7);
});

it('should skip dead blocks', ()=>{
    const input = `
        {{#if false}}
        <a>
        </a> <n></n>
        {{/if}}
    `;
    assert(transformInput(input).length, 0);
});

it('reduce codes count for long formatted lines', ()=>{
    const input = `
       <div>
        <div>
         <div>
          <div></div>
         </div>
        </div>
       </div>
    `;
    assert(transformInput(input).length, 12);
});

function transformInput(template) {
    function createPlugin() {
        return {
            visitor: transformFunction(),
            name: "templates-newline-transform"
        }
    }
    const ast = preprocess(template, {
        plugins: {
          ast: [ createPlugin ]
        }
    });
    return JSON.parse(JSON.parse(precompile(print(ast))).block).statements;
}

function assert(left, right) {
    expect(left).toEqual(right);
}
  