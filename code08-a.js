var fs = require("fs");

var lines = fs.readFileSync("input08-a.txt","utf8").split("\n").filter(x=>x);
//var lines = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var dict = {}

var rules = lines[0];

for(var i=1;i<lines.length;i++) {
	var items = lines[i].match(/[A-Z][A-Z][A-Z]/g);
	dict[items[0]] = [items[1],items[2]];
}

var steps = 0;
var krule = -1;
var key = "AAA";

while(key!="ZZZ") {
	steps++;
	krule++;
	if(krule>=rules.length) krule = 0;
	if(rules[krule]=="L")
		key = dict[key][0];
	else
		key = dict[key][1];
}

console.log(steps);
