# simple-mcp3008

MCP 3008 SPI analog to digital conversion with Node.js on raspberry boards.

## Contents

 * [Installation](https://github.com/toliger/simple-mcp3008#installation)
 * [Usage](https://github.com/toliger/simple-mcp3008#usage)

## Installation

```
npm install simple-mcp3008
```

# Usage


```js
var mcp = require('simple-mcp3008')(18,24,4,25,3.3);

for(var i = 0; i < 8; i++){
	console.log("pin #" + i + " = " + mcp.pins[i].getDecimalValue() + "/1024");
}
```
```js
var mcp = require('./simple-mcp3008.js')(18,24,4,25,3.3);
var temp_pin = mcp.pins[0];

/* MJSTS-103-3950-1-600-3D  [celcius degre, ohm]*/
var temp_sensor_resistances = [	[-30, 173755],
																[-29, 163652.4],
																[-20, 97420.46],
																[-10, 55801.49],
																[0,		32997.68],
																[10, 20068.96],
																[20, 12513.07],
																[30, 8070.342],
																[40, 5320.219],
																[50, 3583.472],
																[60, 2490.09]];


console.log("pin value = " + temp_pin.getDecimalValue() + "/1024");
console.log("pin #0 voltage = " + temp_pin.getVoltage());

console.log("Define type + constant resistance to pin 0");
temp_pin.setType("temp");
temp_pin.setConstantResistance(10000 - 5000);

console.log("constant resistance = " + temp_pin.resistance);
console.log("New voltage = " + temp_pin.getVoltage() + " V");
console.log("Sensor resistance = " + temp_pin.getSensorResistance() + " Ohm");

temp_pin.setResistanceTab(temp_sensor_resistances);
console.log("temp = " + temp_pin.getCelciusDegre() + " °C");
```
