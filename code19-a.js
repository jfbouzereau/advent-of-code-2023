var fs = require("fs");

var lines = fs.readFileSync("input19-a.txt","utf8").split("\n");
//var lines = fs.readFileSync("test.txt","utf8").split("\n");

var works = [];

for(var i=0;i<lines.length;i++) {
	if(lines[i].length==0) break;
	var m = lines[i].match(/([a-z0-9]+){(.*)}/)
	var name = m[1];
	var work = [];
	var steps = m[2].split(",");	
	for(var j=0;j<steps.length;j++) {
		m = steps[j].match(/([amsx])([<>])(-?[0-9]+):(.*)/);
		if(m)
			work.push([m[1],m[2],m[3]*1,m[4]]);
		else
			work.push([steps[j]]);
	}	
	works[name] = work;
}

var total = 0;

for(i++;i<lines.length;i++) {
	if(lines[i].length==0) break;
	var m = lines[i].match(/{x=([0-9]+),m=([0-9]+),a=([0-9]+),s=([0-9]+)}/);
	if(!m) console.log("DATA ERROR",lines[i]);
	var part = {x:m[1]*1,m:m[2]*1,a:m[3]*1,s:m[4]*1}

	var ok = check(part,works);
	if(ok) {
		total += part.x + part.m + part.a + part.s;
	}
}

console.log(total);


function check(part,works) {

	var name,cond;
	var work = works["in"];

	while(1) {
		//console.log("WHILE",work);
		for(var i=0;i<work.length;i++) {
			var rule = work[i];			
			//console.log("     RULE ",rule);
			if(rule.length==4) {
				var key = rule[0];
				var val = part[key];
				//console.log("             KEY",key,val);
				if(rule[1]=="<")
					cond = val < rule[2];
				else
					cond = val > rule[2];	
				if(cond) {
					name = rule[3];
					break;
				}
			}
			else  {
				name = rule[0];
				break;
			}
		}
		if(name=="R") return false;
		if(name=="A") return true;
		work = works[name];
	}
}


