var fs = require("fs");

var grid = fs.readFileSync("input11-a.txt","utf8").split("\n").filter(x=>x);
//var grid = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var NR = grid.length;
var NC = grid[0].length;

//  galaxies
var gal = [];
for(var row=0;row<NR;row++)
	for(var col=0;col<NC;col++)
		if(grid[row][col]=="#")
			gal.push([row,col]);

// expand the universe

for(var row=NR-1;row>=0;row--) {

	var n = 0;
	for(var col=0;col<NC;col++)
		if(grid[row][col]!=".")
			n++;
	
	if(n==0) {
		// shift all galaxies above
		for(var i=0;i<gal.length;i++)
			if(gal[i][0]>row)
				gal[i][0]++;
	}
}

for(var col=NC-1;col>=0;col--) {

	var n = 0;
	for(var row=0;row<NR;row++) {
		if(grid[row][col]!=".")
			n++;
	}

	if(n==0) {
		// shift all galaxies to the right
		for(var i=0;i<gal.length;i++) 
			if(gal[i][1]>col)
				gal[i][1]++;
	}
}


var total = 0;
for(var i=0;i<gal.length-1;i++)
	for(var j=i+1;j<gal.length;j++) 
		total+= Math.abs(gal[i][0]-gal[j][0])+Math.abs(gal[i][1]-gal[j][1]);

console.log(total);

