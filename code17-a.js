var fs = require("fs");

var grid = fs.readFileSync("input17-a.txt","utf8").split("\n").filter(x=>x);
//var grid = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var nr = grid.length;
var nc = grid[0].length;

grid = grid.map( v=>v.split("").map(x=>parseInt(x)));

var done = [];
for(var r=0;r<nr;r++) {
	done[r] = [];
	for(var c=0;c<nc;c++)
		done[r][c] = [];
}

var A = [];

var row = 0;
var col = 0;
var len = 0;
var pat = "";

while(1) {

	check(row-1,col,"N",len,pat,A);
	check(row+1,col,"S",len,pat,A);
	check(row,col-1,"W",len,pat,A);
	check(row,col+1,"E",len,pat,A);

	// look for minimum 
	var ind = 0;
	for(var i=1;i<A.length;i++)
		if(A[i][2]<A[ind][2]) ind = i;

	[row,col,len,pat] = A[ind];

	if((row==nr-1)&&(col==nc-1)) break;

	A.splice(ind,1);
}


console.log(len);


function check(r,c,d,len,pat,A) {
	if(r<0) return;
	if(r>=nr) return;
	if(c<0) return;
	if(c>=nc) return;
	
	pat += d;

	if(pat.match(/NNNN$/)) return;
	if(pat.match(/SSSS$/)) return;
	if(pat.match(/WWWW$/)) return;
	if(pat.match(/EEEE$/)) return;
	if(pat.match(/NS$/)) return;
	if(pat.match(/SN$/)) return;
	if(pat.match(/WE$/)) return;
	if(pat.match(/EW$/)) return;

	var key = d;
	if(pat.at(-2)==d) {
		key +=d;
		if(pat.at(-3)==d) {
			key +=d;
		}
	}
	if(done[r][c].indexOf(key)>=0) return;
	
	if(pat.length>4)
		pat = pat.substring(pat.length-4);

	len += grid[r][c];
		
	A.push([r,c,len,pat]);

	done[r][c].push(key);
}


