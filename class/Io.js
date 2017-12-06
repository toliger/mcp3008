var Gpio = require('onoff');
let gpio = Gpio.Gpio;

class Io{
	constructor(clockpin, mosipin, misopin, cspin, Vref){
		this.clockpin    =    new gpio(clockpin,  'out' );
		this.mosipin     =    new gpio(mosipin,   'out' );
		this.misopin     =    new gpio(misopin,   'in'  );
		this.cspin       =    new gpio(cspin,     'out' );
		this.Vref        =    Vref;
	}

	readSync(input){
		if(input > 7 || input < 0){return -1}
		this.cspin.writeSync(1);

		this.clockpin.writeSync(0);
		this.cspin.writeSync(0);

		var commandout = input;
		commandout |= 0x18;
		commandout <<= 3;

		for(var i = 0; i < 5; i++){
			if(commandout & 0x80){
				this.mosipin.writeSync(1);
			}else{
				this.mosipin.writeSync(0);
			}
			commandout <<= 1;
			this.clockpin.writeSync(1);
			this.clockpin.writeSync(0);
		}
		var res = 0;

		for(var i = 0; i < 12; i++){
			this.clockpin.writeSync(1);
			this.clockpin.writeSync(0);
			res <<= 1;
			if(this.misopin.readSync()){
				res |= 0x1;
			}
		}
		this.cspin.writeSync(1);

		res >>= 1;
		return res;
	}
}

module.exports = Io
