var fs = require("fs");

var grid = fs.readFileSync("input21-a.txt","utf8").split("\n").filter(x=>x);
//var grid = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var nr = grid.length;
var nc = grid[0].length;

var total = 0;

var mark1,mark2;

mark1 = grid.map(x=>x.split("").map(y=>y=="S"));

for(var step=1;step<=64;step++) {
	mark2 = grid.map(x=>x.split("").map(y=>false));
	for(var row=0;row<nr;row++) 
		for(var col=0;col<nc;col++) 
			if(mark1[row][col]) {
				check(row-1,col);
				check(row+1,col);
				check(row,col-1);
				check(row,col+1);
			}	
	mark1 = mark2;
}

var total = 0;
mark1.forEach(x=>x.forEach(y=>total+=y?1:0))
console.log(total);


function check(row,col) {
	if(row<0) return;
	if(row>=nr) return;
	if(col<0) return;
	if(col>=nc) return;
	if(mark1[row][col]) return;
	if(grid[row][col]=="#") return;		
	mark2[row][col] = true;
}


