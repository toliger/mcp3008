# simple-mcp3008

MCP 3008 SPI analog to digital conversion with Node.js on raspberry boards.

## Contents

 * [Installation](https://github.com/toliger/simple-mcp3008#installation)
 * [Usage](https://github.com/toliger/simple-mcp3008#usage)

## Installation

```
npm install simple-mcp3008
```

# Usage

```js
var mcp = require('simple-mcp3008')(18,24,4,25,3.3);

for(var i = 0; i < 8; i++){
	console.log("pin #" + i + " = " + mcp.pins[i].getDecimalValue() + "/1024");
}
```
