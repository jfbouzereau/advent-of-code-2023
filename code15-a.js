var fs = require("fs");

var input = fs.readFileSync("input15-a.txt","utf8").replace(/\n/g,"");
//var input = fs.readFileSync("test.txt","utf8").replace(/\n/g,"");

input = input.split(",");

var total = 0;
for(var item of input)
	total += hash(item);

console.log(total);

function hash(s) {
	var r = 0;
	for(var i=0;i<s.length;i++) {
		r = r+s.charCodeAt(i);
		r *= 17;
		r = r%256;
	}
	return r;
}

