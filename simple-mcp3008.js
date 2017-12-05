/*
MIT License

Copyright (c) 2017 Oliger Timothée

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var Gpio = require('onoff').Gpio;

class mcp3008{
	constructor(clockpin, mosipin, misopin, cspin, Vref){
		this.clockpin    =    new Gpio(clockpin,  'out' );
		this.mosipin     =    new Gpio(mosipin,   'out' );
		this.misopin     =    new Gpio(misopin,   'in'  );
		this.cspin       =    new Gpio(cspin,     'out' );
		this.resistances =    [0, 0, 0, 0, 0, 0, 0, 0];
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

	read(pin, cb){
		cb(pin, this.readSync(pin));
	}

	getVoltage(value){
		return (this.Vref * value) / 1024;
	}

	setresistance(pin, ohm){
		this.resistances[pin] = ohm;
	}

	getsensorresistanceSync(pin){
		return ((this.Vref * this.resistances[pin])/this.getVoltage(this.readSync(pin))) - this.resistances[pin];
	}

	getsensorresistance(pin, cb){
		cb(pin, this.getsensorresistanceSync(pin));
	}
}
module.exports = mcp3008
