var fs = require("fs");

var lines = fs.readFileSync("input08-a.txt","utf8").split("\n").filter(x=>x);
//var lines = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var dict = {}

var rules = lines[0];

for(var i=1;i<lines.length;i++) {
	var items = lines[i].match(/[0-9A-Z][0-9A-Z][0-9A-Z]/g);
	dict[items[0]] = [items[1],items[2]];
}

var keys = [];
for(var key in dict)
	if(key[2]=="A")
		keys.push(key);

var common = 1;

// this supposes that each ghost makes a loop 
// (which is not specified in the problem !)

for(var i=0;i<keys.length;i++) {
	var key = keys[i];
	var start = key;
	var kr = -1;
	var steps = 0;
	while(1)	 {
		steps++;
		kr++;
		if(kr>=rules.length) kr = 0;
		if(rules[kr]=="L")
			key = dict[key][0]
		else
			key = dict[key][1]
		if(key[2]=="Z") {
			common = lcm(common,steps);
			break;
		}
	}
}

console.log(common);

// least common multiple
function lcm(x,y) {
	var xx = x;
	var yy = y;
	while(x!=y) {
		if(x>y)
			y = y+yy;
		else
			x = x+xx;
	}
	return x;
}

