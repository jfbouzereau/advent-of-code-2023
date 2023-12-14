var fs = require("fs");

var lines = fs.readFileSync("input14-a.txt","utf8").split("\n").filter(x=>x);
//var lines = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var grid = [];
for(var line of lines)
	grid.push(...line.split(""))


var mem = [];

var nr = lines.length;
var nc = lines[0].length;

var k = 0;
while(k<1000000000) {
	north();
	west();
	south();
	east();
	var hash = gethash();
	var l = mem.indexOf(hash);
	if(l>=0) {
		// loop found
		var skip = k-l;
		while(k+skip<1000000000)
			k+=skip;		
		k++;
		break;
	}
	mem[k] = hash;
	k++;
}

while(k<1000000000) {
	north();
	west();
	south();
	east();
	k++;
}

var total = 0;
for(var row=0;row<nr;row++)
	for(var col=0;col<nc;col++)
		if(grid[row*nc+col]=="O")
			total += (nr-row);

console.log(total);

function tilt(start1,step1,n1,start2,step2,n2) {

	var top;
	
	for(var i=0;i<n1;i++) {
		top = start1*step1 + i*step1 + start2*step2;
		for(var j=0;j<n2;j++) {
			var k = start1*step1 +i*step1 + start2*step2 + j*step2;
			if(grid[k]=="#")
				top = k+step2;
			else if(grid[k]=="O") {
				grid[k] = ".";
				grid[top] = "O";
				top += step2;
			}
		}
	}
}

function north() { tilt(0,1,nc,0,nc,nr) }
function west()  { tilt(0,nc,nr,0,1,nc) }
function south() { tilt(0,1,nc,1-nr,-nc,nr) }
function east()  { tilt(0,nc,nr,1-nc,-1,nc) }

function gethash() {
	var r = 0;
	for(var i=0;i<grid.length;i++)
		r = ((r<<5)-r)+grid[i].charCodeAt(0);
	return r;
}


