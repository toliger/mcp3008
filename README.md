# mcp3008

## Contents

 * [Installation](https://github.com/toliger/mcp3008#installation)
 * [Usage](https://github.com/toliger/mcp3008#usage)

## Installation

```
npm install mcp3008
```

# Usage

```js
// (SPICLK, SPIMISO, SPIMOSI, SPICS);
var mcp = require('mcp3008')(18, 4, 24, 25);

mcp.read(0, (value) => {
	console.log(value);
});

console.log(mcp.readSync(0));
```
