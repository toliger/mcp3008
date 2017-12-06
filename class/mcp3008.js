var Pin = require('./class/Pin.js');

class mcp3008{
	constructor(clockpin, mosipin, misopin, cspin, Vref){
		this.pins = [	new Pin(clockpin, mosipin, misopin, cspin, Vref, 0),
									new Pin(clockpin, mosipin, misopin, cspin, Vref, 1),
									new Pin(clockpin, mosipin, misopin, cspin, Vref, 2),
									new Pin(clockpin, mosipin, misopin, cspin, Vref, 3),
									new Pin(clockpin, mosipin, misopin, cspin, Vref, 4),
									new Pin(clockpin, mosipin, misopin, cspin, Vref, 5),
									new Pin(clockpin, mosipin, misopin, cspin, Vref, 6),
									new Pin(clockpin, mosipin, misopin, cspin, Vref, 7)];
	}
}

module.exports = mcp3008
