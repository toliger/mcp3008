var Io = require('./Io.js');

class Pin extends Io{
	constructor(clockpin, mosipin, misopin, cspin, Vref, pinid){
		super(clockpin, mosipin, misopin, cspin, Vref);
		this.id = pinid;
		this.resistanceSensorType = ['temp'];
		this.type = ['default'].concat(this.resistanceSensorType);
		this.resistance = 0;
		this.decimalvalue = 0;
		this.Vref = 3.3;
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
		return (this.decimalvalue * this.Vref) / 1024;
	}

	getSensorResistance(){
		return ((this.Vref * this.resistance)/this.getVoltage()) - this.resistance;
	}
}
module.exports = Pin
