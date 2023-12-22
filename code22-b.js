var fs =  require("fs");

var lines = fs.readFileSync("input22-a.txt","utf8").split("\n").filter(x=>x);
//var lines = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

const xa=0,ya=1,za=2,xb=3,yb=4,zb=5;

var RE = /([0-9]+),([0-9]+),([0-9]+)~([0-9]+),([0-9]+),([0-9]+)/;

var bricks = lines.map(x=>x.match(RE).slice(1,7).map(x=>parseInt(x)));

bricks.sort( (a,b) => a[za]-b[za]);

// make the bricks fall

for(var i=0;i<bricks.length;i++) {
	var z = 1;
	for(var j=0;j<i;j++)
		if(overlap(bricks[i],bricks[j])) z = Math.max(z,bricks[j][zb]+1);
	var dz = z-bricks[i][za]
	bricks[i][za]+=dz;
	bricks[i][zb]+=dz;
}

// build links
var down = bricks.map(x=>[]);
var up = bricks.map(x=>[]);

for(var i=0;i<bricks.length;i++) {
	for(var j=i+1;j<bricks.length;j++) {
		if(!overlap(bricks[i],bricks[j])) continue;
		if(bricks[j][za]!=bricks[i][zb]+1) continue;
		up[i].push(j);
		down[j].push(i);
	}
}

var total = 0;
for(var i=0;i<bricks.length;i++) {
	var gone = bricks.map((x,j)=>i==j);
	visit(i);
	gone.forEach(x=>total+=x?1:0);
	total--;
}

console.log(total);


function visit(i) {
	var u = up[i];
	for(var j of u)
		if(down[j].every(x=>gone[x]))
			gone[j] = true;
	for(var j of u)
		visit(j);
}

function overlap(a,b) {
	if(b[xa]>a[xb]) return false;
	if(b[xb]<a[xa]) return false;
	if(b[ya]>a[yb]) return false;	
	if(b[yb]<a[ya]) return false;
	return true;
}

