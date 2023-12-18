var fs = require("fs");

var lines = fs.readFileSync("input18-a.txt","utf8").split("\n").filter(x=>x);
//var lines = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var P = [];
var x = 0, y = 0;

P.push([x,y]);

for(var line of lines) {
	var m = line.match(/([LRUD]) ([0-9]+) [(]#([0-9a-f]+)[)]/);
	var d = "RDLU"[m[3][5]*1];
	var n = parseInt(m[3].substring(0,5),16);
	switch(d) {
		case "R": x += n; break;
		
		case "L": x -=n; break;

		case "U": y -=n; break;

		case "D": y += n; break;
	}
	P.push([x,y]);
}

var l = P.length;

// compute area
var area = 0;
for(var i=0;i<l;i++) {
	area += P[i][0]*P[(i+1)%l][1] - P[i][1]*P[(i+1)%l][0];
	}
area /= 2;

// compute perimeter
var peri = 0;
for(var i=0;i<l;i++) {
	var a = P[i];
	var b = P[(i+1)%l];
	if(a[0]==b[0])
		peri += Math.abs(a[1]-b[1]);
	else
		peri += Math.abs(a[0]-b[0]);
}
peri /= 2;

console.log(area+peri+1);

