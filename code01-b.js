var fs = require('fs');
var lines = fs.readFileSync("input01-a.txt","utf8").split("\n").filter(x=>x);

var total = 0;

var D = ["*","1","2","3","4","5","6","7","8","9","one","two","three","four","five","six","seven","eight","nine"];


for(var line of lines) {
	var min = 999999;
	var max = -1;
	for(var i=1;i<D.length;i++) {
		var k = line.indexOf(D[i]);
		if(k>=0) if(k<min) { min = k; ten=(i<=9?i:i-9); }	
		k = line.lastIndexOf(D[i]);
		if(k>=0) if(k>max) { max = k; one=(i<=9?i:i-9); }
	}
	//console.log(ten,one,line);
	x = 10*ten+one;
	total += x;
}

console.log(total);
