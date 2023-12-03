var fs = require("fs");

var lines = fs.readFileSync("input03-a.txt","utf8").split("\n").filter(x=>x);
//var lines = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var re = /[0-9]+/g;

var total = 0;

for(var i=0;i<lines.length;i++) {
	var line = lines[i];
	while(m= re.exec(line)) {
		var ok = false;
		if(touch(m[0],m.index,lines[i-1])) ok = true;
		if(touch(m[0],m.index,lines[i])) ok = true;
		if(touch(m[0],m.index,lines[i+1])) ok = true;
		if(ok)
		total += 1*m[0];
	}
}
console.log(total);

function touch(s,pos,line) {
	if(!line) return false;
	var part = line.substring(pos-1,pos+s.length+1);
	return part.match(/[^a-z0-9.]/);
}
