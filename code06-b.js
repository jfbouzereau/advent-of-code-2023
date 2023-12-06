var fs = require("fs");

var lines = fs.readFileSync("input06-a.txt","utf8").split("\n").filter(x=>x);
//var lines = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var time = parseInt(lines[0].replace(/[^0-9]/g,""));
var dist = parseInt(lines[1].replace(/[^0-9]/g,""));

console.log(time,dist);

result = ways(time,dist);

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
