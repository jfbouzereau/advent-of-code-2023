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
	var nr = grid.length;	
	var nc = grid[0].length;

	// check horizontal symmetry

	r = check(grid);
	if(r) return r*100;

	// check vertical symmetry
	var trans = [];
	for(var col=0;col<nc;col++) {

		var r = [];
		for(var row=0;row<nr;row++) 
			r.push(grid[row][col]);
		trans.push(r);
	}

	r = check(trans);
	if(r) return r;

	return 0;
		
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

		var sum = 0;
		for(var k=0;k<=b-a;k++) {
			sum += diff(h[a+k],h[d-k]);
			if(sum>1) {  break; }
		}

		if(sum==1) return i+1;
	}

	return 0;
}

function diff(a,b) {
	var r = 0;
	for(var i=0;i<a.length;i++)
		if(a[i]!=b[i]) {
			r++;
			if(r>1) break;
		}
	return r;
}


