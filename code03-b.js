var fs = require("fs");

var lines = fs.readFileSync("input03-a.txt","utf8").split("\n").filter(x=>x);
//var lines = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var re = /[*]/g;

var total = 0;

for(var i=0;i<lines.length;i++) {
	var line = lines[i];
	while(m= re.exec(line)) {
		var gears = [];
		touch(m.index,lines[i-1],gears);
		touch(m.index,lines[i],gears);
		touch(m.index,lines[i+1],gears);
		if(gears.length==2)
			total += gears[0]*gears[1];
	}
}
console.log(total);

function touch(pos,line,gears) {
	if(!line) return;
	var m;
	var re = /[0-9]+/g;
	while(m=re.exec(line)) {
		if((pos>=m.index-1)&&(pos<=m.index+m[0].length))
			gears.push(1*m[0]);
	}
}
