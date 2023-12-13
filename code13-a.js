var fs = require("fs");

var lines = fs.readFileSync("input13-a.txt","utf8").split("\n");
//var lines = fs.readFileSync("test.txt","utf8").split("\n");

var grid = [];

var total = 0,count;

for(var i=0;i<lines.length;i++) {
	if(lines[i].length==0) {
		count = run(grid);
		total += count;
		grid = [];
	}
	else
		grid.push(lines[i]);
}

if(grid.length>0) {
	count = run(grid);
	total += count;
	}

console.log(total);

function run(grid) {
	var k;

	var nr = grid.length;	
	var nc = grid[0].length;

	// check horizontal symmetry

	var hash = [];
	for(var row=0;row<nr;row++) {
		var r = 0;
		for(var col=0;col<nc;col++)
			r = ((r<<5)-r)+grid[row].charCodeAt(col);	
		hash.push(r);
	}

	r = check(hash);	
	if(r) return r*100;

	// check vertical symmetry
	hash = [];
	for(var col=0;col<nc;col++) {

		var r = 0;
		for(var row=0;row<nr;row++) 
			r = ((r<<5)-r)+grid[row][col].charCodeAt(0);
		hash.push(r);
	}

	r = check(hash);
	if(r) return r;

	return 0;
		
}

function hash(s) {	
	var r = 0;
	for(var i=0;i<s.length;i++)
		r = ((r<<5)-r)+s.charCodeAt(i);
	return r;
}

function check(h) {
	var a,b,c,d;

	var n = h.length;
	for(var i=0;i<n-1;i++) {
		a = 0;
		b = i;
		c = i+1;
		d = i+i+1;

		if(d>=n) {
			d = n-1;
			c = i+1;
			b = i;	
			//b-a = d -c
			//b-d+c=a
			a = i-(n-1)+i+1;
		}

		var ok = true;
		for(var k=0;k<=b-a;k++)
			if(h[a+k]!=h[d-k]) {ok = false; break; }

		if(ok) return i+1;
	}

	return 0;
}

