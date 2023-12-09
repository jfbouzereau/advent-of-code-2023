var fs = require("fs");

var lines = fs.readFileSync("input09-a.txt","utf8").split("\n").filter(x=>x);
//var lines = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var total = 0;

for(var line of lines)
	total += next_value(line);


console.log(total);

function next_value(line) {	
	var nz;
	var x = [];
	var k = 0;
	x[k] = line.match(/[0-9-]+/g).map(a=>parseInt(a));
	while(1)	{
		x[k+1] = [];
		nz=0;	
		for(var i=0;i<x[k].length-1;i++) {
			x[k+1][i] = x[k][i+1]-x[k][i];
			if(x[k+1][i]!=0) nz++;
		}
		k++;
		if(nz==0) break;
	}

	var r = 0;
	while(k>=0) {
		r += x[k][x[k].length-1];
		k--;
	}
	return r;
}

