var fs = require("fs");

var grid = fs.readFileSync("input10-a.txt","utf8").split("\n").filter(x=>x);
//var grid = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var NR = grid.length;
var NC = grid[0].length;

var dir = {"|":"NS","-":"WE","L":"NE","J":"NW","7":"SW","F":"SE","S":"NWSE"};

var visited = {};
var tovisit = [];

//look for the starting point
for(var row=0;row<NR;row++)
	for(var col=0;col<NC;col++)
		if(grid[row][col]=="S") {
			tovisit.push([row,col,0,""]);
			break;
		}

while(tovisit.length>0) {

	var e = tovisit.pop();
	var row = e[0]	
	var col = e[1];
	var len = e[2];
	var from = e[3];

	if(row<0) continue;
	if(row>=NR) continue;
	if(col<0) continue;
	if(col>=NC) continue;

	var key = row+"/"+col;

	if(key in visited) continue;

	var d = dir[grid[row][col]];

	// if previous position not logical
	if(from)
		if(d.indexOf(from)<0) continue;

	visited[key] = 1;

	if(grid[row][col]==".") continue;

	if(d.match(/N/)) tovisit.push([row-1,col,len+1,"S"]);
	if(d.match(/S/)) tovisit.push([row+1,col,len+1,"N"]);
	if(d.match(/W/)) tovisit.push([row,col-1,len+1,"E"]);
	if(d.match(/E/)) tovisit.push([row,col+1,len+1,"W"]);

}

var count = 0;
var inside;
var nto,sto;  // path traversing the row 

for(var row=0;row<NR;row++) {	
	nto = sto = inside = false;
	for(var col=0;col<NC;col++) {
		var key = row+"/"+col;	
		if(!(key in visited)) {
			if(inside) count++;
		}
		else if(grid[row][col]!="S") {
			var g = grid[row][col];
			switch(g) {
				case "|": nto = sto = true; break;
				case "L": nto = !nto; break;
				case "F": sto = !sto; break;
				case "J": nto = !nto; break;
				case "7": sto = !sto; break;
			}
			if(nto&&sto) { inside = !inside; nto = sto = false; }
		}
	}
}

console.log(count);

