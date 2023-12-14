var fs = require("fs");

var grid = fs.readFileSync("input14-a.txt","utf8").split("\n").filter(x=>x);
//var grid = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var nr = grid.length;
var nc = grid[0].length;

var load = 0;

var  top;

for(var col=0;col<nc;col++) {
	top = nr;  // rock can go up to this row
	for(var row=0;row<nr;row++) {
		if(grid[row][col]=="#") {
			top = nr-row-1;
			continue;
		}
		if(grid[row][col]=="O") {
			load += top;	
			top--;
		}
	}
}

console.log(load);


