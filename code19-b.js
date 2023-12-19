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


var P = [];

run(works,"in",[]);


var key,op,val,log;

var total = 0;
for(var path of P) {
	var min = {a:1,m:1,s:1,x:1};
	var max = {a:4000,m:4000,s:4000,x:4000}
	for(var p of path) {	
		[key,op,val,log] = p;
		if(log) {
			if(op=="<")
				max[key] = Math.min(max[key],val-1);
			else
				min[key] = Math.max(min[key],val+1);
		}
		else {
			if(op=="<") 
				min[key] = Math.max(min[key],val);
			else
				max[key] = Math.min(max[key],val);
		}
	}
	if(max.a<min.a) continue;
	if(max.m<min.m) continue;
	if(max.s<min.s) continue;
	if(max.x<min.x) continue;
	total += (max.a-min.a+1)*(max.m-min.m+1)*(max.s-min.s+1)*(max.x-min.x+1);
}

console.log(total);


function run(works,name,path) {

	var savename = name;

	path = path.slice();	// clone

	var work = works[name];
	
	for(var i=0;i<work.length;i++) {
		var rule = work[i];
		if(rule.length==4) {
			name = rule[3]; 
			rule[3] = true;
			path.push(rule.slice());	
			if(name=="A")  P.push(path.slice());
			if((name!="A")&&(name!="R"))
				run(works,name,path);
			path.pop();
			rule[3] = false;
			path.push(rule.slice());
			}
		else {
			name = rule[0];
			if(name=="A") { P.push(path); return; }
			if(name=="R") { return; }
			run(works,name,path);
			return;
			}
	}
}

