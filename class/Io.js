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
