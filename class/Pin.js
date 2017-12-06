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

var Io = require('./Io.js');

class Pin extends Io{
	constructor(clockpin, mosipin, misopin, cspin, Vref, pinid){
		super(clockpin, mosipin, misopin, cspin, Vref);
		this.id = pinid;
		this.resistanceSensorType = ['temp'];
		this.type = ['default'].concat(this.resistanceSensorType);
		this.resistance = 0;
		this.decimalvalue = 0;
		this.Vref = Vref;
	}

	getDecimalValue(){
		this.decimalvalue = super.readSync(this.id);
		return this.decimalvalue;
	}

	setType(type){
		if (this.type.indexOf(type) >= 0){
			this.type = type;
		}
	}

	setConstantResistance(resistance){
		if (this.resistanceSensorType.indexOf(resistance) >= 0){
			this.resistance = resistance;
		}
	}

	getVoltage(){
		return (this.getDecimalValue * this.Vref) / 1024;
	}

	getSensorResistance(){
		return ((this.Vref * this.resistance)/this.getVoltage()) - this.resistance;
	}
}
module.exports = Pin
