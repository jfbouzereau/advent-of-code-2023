var fs = require("fs");

var lines = fs.readFileSync("input04-a.txt","utf8").split("\n").filter(x=>x);
//var lines = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var total = 0;

for(var line of lines) {
	line = line.split(":")[1];
	line = line.split("|");
	var win = line[0].match(/[0-9]+/g);	
	var min = line[1].match(/[0-9]+/g);
	var points =0;
	for(var m of min) {
		if(win.indexOf(m)>=0)
			points = (points==0)?1:points*2;
	}
	total += points;
}

console.log(total);


