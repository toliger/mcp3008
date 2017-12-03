var mcp = require('./simple-mcp3008.js');
var mymcp = new mcp(18,24,4,25, 3.3);

mymcp.setresistance(0, 1000);
mymcp.getsensorresistance(0, (pin, value) => {
	console.log("resistance = " + value);
});
