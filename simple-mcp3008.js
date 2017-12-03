var Gpio = require('onoff').Gpio;

class mcp3008{
	constructor(clockpin, mosipin, misopin, cspin, Vref){
		this.clockpin			=		new Gpio(clockpin,	'out'	);
		this.mosipin			=		new Gpio(mosipin,		'out'	);
		this.misopin			=		new Gpio(misopin,		'in'	);
		this.cspin				=		new Gpio(cspin,			'out'	);
		this.resistances	=		[0, 0, 0, 0, 0, 0, 0, 0];
		this.Vref					=		Vref;
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

	read(pin, cb){
		cb(pin, this.readSync(pin));
	}

	setresistance(pin, ohm){
		this.resistances[pin] = ohm;
	}

	getsensorresistanceSync(pin){
		return ((this.Vref * this.resistances[pin])/readSync(pin)) - this.resistances[pin];
	}

	getsensorresistance(pin, cb){
		cb(pin, getsensorresistanceSync(pin));
	}
}
module.exports = mcp3008
