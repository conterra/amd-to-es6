"use strict";

const Module = require("./class/Module");

module.exports = function (source, options) {
    options = options || {};
    // enable comments by default
    if (options.comments !== false) {
        options.comments = true;
    }

    if (source.indexOf('define') === -1) { return source; }

    var module = new Module(source, options);

    if (module.has('CallExpression[callee.name="define"]')) {
        module.convert(options);
    }

    return module.toSource(options);
};
