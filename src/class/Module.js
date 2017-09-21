"use strict";

const AbstractSyntaxTree = require("@buxlabs/ast");
const getDependencies = require("../lib/getDependencies");
const getModuleCode = require("../lib/getModuleCode");
const generateImports = require("../lib/generateImports");
const generateCode = require("../lib/generateCode");
const isDefineWithObjectExpression = require("../lib/isDefineWithObjectExpression");

class Module extends AbstractSyntaxTree {

    convert (options) {
        var body = this.ast.body;
        var leadingComments = (body && body[0] && body[0].leadingComments) || [];
        var define = this.first('CallExpression[callee.name=define]');
        if (isDefineWithObjectExpression(define)) {
            this.ast.body = [{
                type: "ExportDefaultDeclaration",
                declaration: define.arguments[0],
                leadingComments: leadingComments
            }];
        } else {
            var dependencies = getDependencies(define);
            var nodes = getModuleCode(this.ast);
            var imports = generateImports(dependencies, options);
            var code = generateCode(this.ast, nodes, options);
            body = imports.concat(code);
            if (body[0]) {
                body[0].leadingComments = leadingComments;
            }
            this.ast.body = body;
            this.removeUseStrict();
        }
    }

    removeUseStrict () {
        this.remove({
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: "use strict"
            }
        });
    }

}

module.exports = Module;
