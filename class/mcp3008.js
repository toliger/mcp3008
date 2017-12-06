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

var Pin = require('./Pin.js');

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
