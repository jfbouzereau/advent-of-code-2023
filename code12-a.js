var fs = require("fs");

var lines = fs.readFileSync("input12-a.txt","utf8").split("\n").filter(x=>x);
//var lines = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var total =0;

for(var line of lines)
	run(line);

function run(line) {
	var pattern = line.split(" ")[0].split("");
	var groups = line.split(" ")[1].split(",").map(x=>parseInt(x));	
	sub(pattern,0,groups);
}

console.log(total);

function sub(pattern,index,groups) {

	if(index>=pattern.length) return check(pattern,groups);
	
	if(pattern[index]!="?")
		return sub(pattern,index+1,groups);	

	pattern[index] = ".";
	sub(pattern,index+1,groups);

	pattern[index] = "#";
	sub(pattern,index+1,groups);

	pattern[index] = "?";
}

function check(pattern,groups){

	var counting = false;
	var counts = [];
	var ic = -1;
	
	for(var i=0;i<pattern.length;i++) {
		if(counting) {
			if(pattern[i]=="#") counts[ic]++;
			else counting = false;
		}
		else {
			if(pattern[i]=="#") {
				counting = true;
				ic++;
				counts[ic]= 1;
			}
		}
	}	

	if(counts.length!=groups.length) return;
	for(var i=0;i<counts.length;i++)
		if(counts[i]!=groups[i]) return;
	total++;
}


