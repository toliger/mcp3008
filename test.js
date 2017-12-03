var mcp = require('./mcp3008.js');
var mymcp = new mcp(18,24,4,25);

for(var i = 0; i < 8; i++){
	mymcp.read(i,(id, value) =>{
		console.log("pin #" + id + " = " + value + "/1024");
	});
}
