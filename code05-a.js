var fs = require("fs");

var lines = fs.readFileSync("input05-a.txt","utf8").split("\n").filter(x=>x);
//var lines = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var seeds = lines[0].match(/[0-9]+/g).map(x=>parseInt(x));

var maps = {};
var map = null;

for(var i=1;i<lines.length;i++) {
	var line = lines[i];
	if(line=="") continue;
	if(line.indexOf("map")>=0) {
		var name= line.replace(/ map:.*/,"");
		map = [];
		maps[name] = map;
		continue;
	}
	map.push( line.match(/[0-9]+/g).map(x=>parseInt(x)));
}

var min = 1e99;

for(var i=0;i<seeds.length;i++) {
	var x = seeds[i];
	var name1 = "seed";
	while(name1!="location") {
		var name2 = find_map(name1);
		var map = maps[name1+"-to-"+name2];
		x = convert(x,map);		
		name1 = name2;
	}
	if(x<min) min = x;
}

console.log(min);

function find_map(name1) {
	for(var name in maps)
		if(name.indexOf(name1)==0)
			return name.split("-")[2];
}

function convert(x,map) {
	for(var i=0;i<map.length;i++) {
		var entry = map[i];
		if((x>=entry[1])&&(x<entry[1]+entry[2]))	
			return entry[0]+(x-entry[1]);
	}
	return x;
}

