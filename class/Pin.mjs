export Pin{
	constructor(){
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

	get sensorResistance(){
		return ((this.Vref * this.resistance)/this.getVoltage()) - this.resistance;
	}
}
module.exports = Pin;
