var fs = require("fs");

var grid = fs.readFileSync("input16-a.txt","utf8").split("\n").filter(x=>x);
//var grid = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

grid = grid.map(x=>x.split(""));

var nr = grid.length;
var nc = grid[0].length;

var max = 0;
var e;

for(var r=0;r<nr;r++) { 
	e = run(r,-1,"E");
	if(e>max) max = e;
	e = run(r,nc,"W");
	if(e>max) max = e;	
}

for(var c=0;c<nc;c++) {
	e = run(-1,c,"S");
	if(e>max) max = e;
	e = run(nr,c,"N");
	if(e>max) max = e;
}

console.log(max);

function run(r0,c0,d0) {

	var beams = [{r:r0,c:c0,d:d0}];
	var path = {};
	var time = 0;

	while(beams.length>0) {
		
		time++;	

		var newbeams = [];

		for(var i=beams.length-1;i>=0;i--) {

			var b = beams[i];

			switch(b.d) {
				case "N": b.r--; break;
				case "S": b.r++; break;
				case "W": b.c--; break;
				case "E": b.c++; break;
			}

			if((b.r<0)||(b.r>=nr)||(b.c<0)||(b.c>=nc)) {
				beams.splice(i,1);
				continue;
			}

			var key = b.r+"/"+b.c+"/"+b.d;
			if((key in path)&&(path[key]<time)) {
				beams.splice(i,1);
				continue;
			}
			path[key] = time;

			var g = grid[b.r][b.c];
		
			switch(b.d) {	
				case "N":
					if(g=="/") { b.d="E"; break; }
					if(g=="\\") { b.d="W"; break; }
					if(g=="-") {
						b.d="W";
						newbeams.push({r:b.r,c:b.c,d:"E"});
						break;
					}
				break;

				case "S":
					if(g=="/") { b.d="W"; break; }
					if(g=="\\") { b.d="E"; break; }
					if(g=="-") {
						b.d="W";
						newbeams.push({r:b.r,c:b.c,d:"E"});
						break;
					}
					break;

				case "W":
					if(g=="/") { b.d="S"; break;}
					if(g=="\\") { b.d="N"; break; }
					if(g=="|") { 
						b.d="S";
						newbeams.push({r:b.r,c:b.c,d:"N"});
							break;
						}
					break;

				case "E":
					if(g=="/") { b.d="N"; break;}
					if(g=="\\") { b.d="S"; break; }
					if(g=="|") { 
						b.d="S";
						newbeams.push({r:b.r,c:b.c,d:"N"});
							break;
						}
					break;
			}
		
		}

		beams.push(...newbeams);
	}

	var energy = 0;
	for(var r=0;r<nr;r++)
		for(var c=0;c<nc;c++) {
			if(r+"/"+c+"/N" in path) energy++;
			else if(r+"/"+c+"/S" in path) energy++;
			else if(r+"/"+c+"/W" in path) energy++;
			else if(r+"/"+c+"/E" in path) energy++;
		}

	return energy;
}




