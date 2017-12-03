var mcp = require('./mcp3008.js');
var mymcp = new mcp(18,24,4,25);
console.log(mymcp.read(0));
