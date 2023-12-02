var fs = require("fs");

var lines = fs.readFileSync("input02-a.txt","utf8").split("\n").filter(x=>x);

var b,r,g,m,ok,id;

var id = 0;
var total = 0;

for(var line of lines) {	
	id++;
	line = line.split(":")[1];
	line = line.split(";");
	ok = true;
	for(var part of line) {
		b = r = g = 0;	
		m = part.match(/(\d+) blue/);
		if(m) b = m[1]*1;
		m = part.match(/(\d+) green/);
		if(m) g = m[1]*1;
		m = part.match(/(\d+) red/);
		if(m) r = m[1]*1;	
		if((r>12)||(g>13)||(b>14)) ok = false;
		if(!ok) break;
	}
	if(ok) total+=id;
}

console.log(total);

