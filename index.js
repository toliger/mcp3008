var Gpio = require('onoff').Gpio;

var SPICLK = new Gpio(18, 'out'),
		SPIMISO = new Gpio(4, 'in','both'),
		SPIMOSI = new Gpio(24, 'out'),
		SPICS = new Gpio(25, 'out');

console.log(SPIMISO.readSync());

function readadc(adcnum, clockpin, mosipin, misopin, cspin){
	if(adcnum > 7 || adcnum < 0){return -1}

	cspin.writeSync(1);

	clockpin.writeSync(0);
	cspin.writeSync(0);

	var commandout = adcnum;
	console.log(commandout);
	commandout |= 0x18;
	console.log(commandout);
	commandout <<= 3;
	console.log(commandout);

	console.log("for");
	for(var i = 0; i < 5; i++){
		console.log(commandout);
		console.log(commandout & 0x80);
		if(commandout & 0x80){
			mosipin.writeSync(1);
		}else{
			mosipin.writeSync(0);
		}
		commandout <<= 1;
		clockpin.writeSync(1);
		clockpin.writeSync(0);
	}
	console.log("fin boucle" + commandout);
	var adcout = 0;

	for(var i = 0; i < 12; i++){
		clockpin.writeSync(1);
		clockpin.writeSync(0);
		adcout <<= 1;
		console.log(adcout);
		console.log("test = " + misopin.readSync());
		if(misopin.readSync()){
			adcout |= 0x1;
		}
		console.log("adcout= " + adcout);
	}
	cspin.writeSync(1);

	adcout >>= 1;
	return adcout;
}

var potentiometer_adc = 0;
console.log(readadc(potentiometer_adc, SPICLK, SPIMOSI, SPIMISO, SPICS));

