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

for(var i=0;i<seeds.length;i+=2) {
	var range1 = [[seeds[i],seeds[i]+seeds[i+1]]];
	var name1 = "seed";
	while (name1!="location") {
		var name2 = find_map(name1);
		var map = maps[name1+"-to-"+name2];
		var range2 = convert(range1,map);
		name1 = name2;
		range1 = range2;
		}
		for(var k=0;k<range2.length;k++)
			if(range2[k][0]<min) min = range2[k][0];
	}

console.log(min);

function find_map(name1) {
	for(var name in maps)
		if(name.indexOf(name1)==0)
			return name.split("-")[2];
}

function convert(ranges,map) {
	var result = [];
	for(var i=0;i<ranges.length;i++) {
		var range = ranges[i];
		for(var j=0;j<map.length;j++) {
			var entry = map[j];
			var first = entry[1];
			var last = entry[1]+entry[2];

			// range not concerned by this map entry
			if(range[1]<first) continue;
			if(range[0]>=last) continue;

			// first  range[0]  range[1]  last
			if((range[0]>=first)&&(range[1]<=last)) {
				var r = [entry[0]+range[0]-first,entry[0]+range[1]-first];
				result.push(r);
				range[1] = range[0];
				break;
			}	

			// first range[0]  last  range[1]
			if((range[0]>=first)&&(range[1]>last)) {
				var r = [entry[0]+range[0]-first,entry[0]+last-first];
				result.push(r);
				range[0] = last;
				continue;
			}

			// range[0]  first  range[1]   last
			if((range[0]<first)&&(range[1]<=last)) {
				var r = [entry[0],entry[0]+range[1]-first];
				result.push(r);
				range[1] = first;
				continue;
			}

			// range[0]  first  last  range[1]
			if((range[0]<first)&&(range[1]>=last)) {
				var r = [entry[0],entry[0]+last-first];
				result.push(r);
				r = [range[0],first];
				ranges.push(r);
				range[0] = last;
				continue;
			}
		}
	}
	for(var i=0;i<ranges.length;i++) {
		var range = ranges[i]
		if(range[0]!=range[1])
			result.push(range);
	}
	return result;
}

