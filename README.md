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
// (SPICLK, SPIMISO, SPIMOSI, SPICS);
var mcp = require('simple-mcp3008');
var mymcp = new mcp(18,24,4,25);

for(var i = 0; i < 8; i++){
	mymcp.read(i,(id, value) => {
		console.log("pin #" + id + " = " + value + "/1024");
	});
}

console.log(mymcp.readSync(0));
```
