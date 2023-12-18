var fs = require("fs");

var lines = fs.readFileSync("input18-a.txt","utf8").split("\n").filter(x=>x);
//var lines = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var G = [];

var x = 0, y = 0;
var xmin = 0, xmax = 0, ymin = 0, ymax = 0;

for(var line of lines) {
	var m = line.match(/([LRUD]) ([0-9]+)/);
	var d = m[1];
	var n = m[2]*1;
	switch(d) {
		case "R":
			if(!G[y]) G[y] = [];
			for(var i=1;i<=n;i++)
				G[y][x+i] = 1;
			x += n;
			if(x>xmax) xmax = x;
			break;
		
		case "L":
			if(!G[y]) G[y] = [];
			for(var i=1;i<=n;i++)
			G[y][x-i] = 1;
			x -=n;
			if(x<xmin) xmin = x;
			break;

		case "U":
			for(var i=1;i<=n;i++) {
				if(!G[y-i]) G[y-i] = [];
				G[y-i][x] = 1;
			}
			y -=n;
			if(y<ymin) ymin = y;
			break;

		case "D":
			for(var i=1;i<=n;i++) {
				if(!G[y+i]) G[y+i] = [];		
				G[y+i][x] = 1;
			}
			y += n;	
			if(y>ymax) ymax = y;
			break;
	}
}

for(y=ymin;y<=ymax;y++)
	for(x=xmin;x<=xmax;x++)
		if(!G[y][x])
			check_region(x,y);


var total = 0;
for(y=ymin;y<=ymax;y++)
	for(x=xmin;x<=xmax;x++)		
		if(G[y][x]==1)
			total++;

console.log(total);

function check_region(x,y) {
	var inside = true;
	
	var Q = [];
	Q.push([x,y]);

	while(Q.length>0) {
		[x,y] = Q.pop();
		run(x,y);
	}

	for(var xx=xmin;xx<=xmax;xx++)
		for(var yy=ymin;yy<=ymax;yy++)
			if(G[yy][xx]==2)
			G[yy][xx] = inside ? 1: -1;

	function run(x,y) {
		if(x<xmin) { inside = false; return; }
		if(x>xmax) { inside = false; return; }
		if(y<ymin) { inside = false; return; }
		if(y>ymax) { inside = false; return; }
		if(G[y][x]) return;
		G[y][x] = 2;  // being tested
		Q.push([x-1,y]);
		Q.push([x+1,y]);
		Q.push([x,y-1]);
		Q.push([x,y+1]);
	}
}


