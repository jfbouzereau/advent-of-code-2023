var fs = require("fs");

var lines = fs.readFileSync("input12-a.txt","utf8").split("\n").filter(x=>x);
//var lines = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var total =0;

var mem = {};

for(var line of lines) {
	run(line);
	}


function run(line) {
	save = total;
	var pattern = line.split(" ")[0];
	var g = line.split(" ")[1].split(",").map(x=>parseInt(x));	

	pattern = pattern+"?"+pattern+"?"+pattern+"?"+pattern+"?"+pattern;
	pattern = pattern.split("");
	var groups = [...g,...g,...g,...g,...g];
	
	mem = {};
	count = sub(pattern,0,groups,0,0);
	total += count;
	console.log("PART",count,groups.join("-"));
}

console.log(total);

function sub(pattern,ip,groups,ig,len) {

	var key = ip+"/"+ig+"/"+len;
	if(key in mem)
		return mem[key];

	if(ip==pattern.length) {
		if((ig==groups.length)&&(len==0))
			return 1;
		else if((ig==groups.length-1)&&(groups[ig]==len))
			return 1;
		else
			return 0;
	}

	var res = 0;
	if((pattern[ip]==".")||(pattern[ip]=="?")) {
		if(len==0)
			res += sub(pattern,ip+1,groups,ig,0);
		else if((len>0)&&(ig<groups.length)&&(groups[ig]==len))
			res += sub(pattern,ip+1,groups,ig+1,0);
	}
	if((pattern[ip]=="#")||(pattern[ip]=="?")) {
		res += sub(pattern,ip+1,groups,ig,len+1);	
	}
	mem[key] = res;
	return res;
}


