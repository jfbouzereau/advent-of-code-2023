var fs = require("fs");

var lines = fs.readFileSync("input04-a.txt","utf8").split("\n").filter(x=>x);
//var lines = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var stack = [];
for(var i=0;i<lines.length;i++)
	stack[i] = [lines[i]];

for(var i=0;i<stack.length;i++) {
	var g = gain(stack[i][0]);
	var n = stack[i].length;
	for(var j=0;j<g;j++) {
		for(var k=0;k<n;k++)
			stack[i+j+1].push(stack[i+j][0]);
	}
}

var total = 0;
for(var i=0;i<stack.length;i++) {
	//console.log(stack[i].length);
	total += stack[i].length; 
	}

console.log(total);

function gain(line) {
	line = line.split(":")[1];
	line = line.split("|");
	var win = line[0].match(/[0-9]+/g);	
	var min = line[1].match(/[0-9]+/g);
	var points= 0;	
	for(var m of min) 
		if(win.indexOf(m)>=0)
			points++;
	return points;
}



