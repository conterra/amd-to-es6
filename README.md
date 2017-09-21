# AMD to ES6 converter

## Installation

`npm install -g @conterra/amd-to-es6`

## Usage

This project is intended to convert map.apps bundles to ES6 import syntax.

Convert a bundle recursively with:

`amdtoes6 --src=bundle-dir --replace --quotes=double --glob=**/*.js`


### Problems:

This tool will produce `export default` statements. In some cases this will lead to problems,
because it makes the converted file incompatible to bundles which still use the old 'define' code.

This can be 'fixed' by replacing `export default` with `module.exports = `.
But in the future if all bundles are converted to ES6, the use of `export default` is the correct way.

### Effects

#### MyComponent.js

```
define([
    "dojo/_base/declare",
    "./Other"
], function(declare, Other){

    return declare([],{
         startup: function(){
            this.other = new Other();
         }
    });
});
```

ES6

```
import declare from "dojo/_base/declare";
import Other from "./Other";

export default declare([],{
         startup: function(){
            this.other = new Other();
         }
    });
```

#### module.js

AMD

```
define([
    "./MyComponent",
    "./OtherComponent"
], {});
```

ES6

```
import "./MyComponent";
import "./OtherComponent";
;
```

### Options
```sh

  Usage: amdtoes6 [options]

  Options:

    -s, --src <dirname>     Directory of the source files
    -d, --dest <dirname>    Directory of the destination files
    -g, --glob [glob]       Glob pattern for the src to match for input files
    -r, --recursive         Set glob pattern to **/*.js with no hassle
    -b, --beautify          Beautify the output
    --replace           Replace the input files with results
    --suffix <string>   Replace suffix of the files
    --side              Import side effects with camel cased named
    --assigned          Automatically assign custom name to side effects
    --quotes            Single, double or auto quotes in the output
```

## Forked and extended for map.apps requirements from:

https://github.com/buxlabs/amd-to-es6
