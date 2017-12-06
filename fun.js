var resistancetab = [	[-30, 173755],
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


function getCelciusDegre(){
			var resistance = 17000, i = 0;
			for(; i < resistancetab.length && resistance < resistancetab[i][1]; i++);
			if(i < (resistancetab.length - 2)){
				return (((resistance - Math.min(resistancetab[i - 1][1],resistancetab[i][1]))*(Math.max(resistancetab[i - 1][0],resistancetab[i][0])- Math.min(resistancetab[i - 1][0],resistancetab[i][0])))/ (Math.max(resistancetab[i - 1][1],resistancetab[i][1])- Math.min(resistancetab[i - 1][1],resistancetab[i][1])) + Math.min(resistancetab[i - 1][0],resistancetab[i][0]));
			}
			return -10000;
}

console.log(getCelciusDegre());
