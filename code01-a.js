var fs = require('fs');
var lines = fs.readFileSync("input01-a.txt","utf8").split("\n").filter(x=>x);

var total = 0;
for(var line of lines) {
	line = line.replace(/[a-z]/g,"");
	total = total+= 1*(line[0]+line[line.length-1])
}

console.log(total);

