var fs = require("fs");

var lines = fs.readFileSync("input06-a.txt","utf8").split("\n").filter(x=>x);
//var lines = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var time = lines[0].match(/[0-9]+/g).map(x=>parseInt(x));
var dist = lines[1].match(/[0-9]+/g).map(x=>parseInt(x));

result = 1;
for(var i=0;i<time.length;i++)
	result *= ways(time[i],dist[i]);

console.log(result);

function ways(t,d) {

	var x;
	var r = 0;
	for(var i=0;i<t;i++) {
		x = i*(t-i);	
		if(x>d) r++;
	}
	return r;
}
