var fs = require("fs");

var lines = fs.readFileSync("input02-a.txt","utf8").split("\n").filter(x=>x);

var b,r,g,m,power;

var total = 0;

for(var line of lines) {	
	line = line.split(":")[1];
	line = line.split(";");
	r = g = b = 0;
	for(var part of line) {
		m = part.match(/(\d+) blue/);
		if(m) if(b<m[1]*1) b = m[1]*1;
		m = part.match(/(\d+) green/);
		if(m) if(g<m[1]*1) g = m[1]*1;
		m = part.match(/(\d+) red/);
		if(m) if(r<m[1]*1) r = m[1]*1;	
	}
	power = r*g*b;
	total += power;
}

console.log(total);

