var fs = require("fs");

var input = fs.readFileSync("input15-a.txt","utf8").replace(/\n/g,"");
//var input = fs.readFileSync("test.txt","utf8").replace(/\n/g,"");

input = input.split(",");

var boxes = [];
for(var i=0;i<256;i++)
	boxes[i] = {label:[],focal:[]};

for(var item of input) {
	var m = item.match(/([a-z]+)([=-])([1-9]?)/)
	if(!m) continue
		
	var label = m[1];
	var box = boxes[hash(label)];

	var op= m[2];

	if(op=="=") {
		var focal = m[3];
		if(box.label.length==0)  {
			box.label.push(label);
			box.focal.push(focal);
			}
		else {	
			var k = box.label.indexOf(label);
			if(k<0) {
				box.label.push(label);
				box.focal.push(focal);
			}
			else {
				box.focal[k] = focal;
			}
		}	
	}
	else if(op=="-") {
		var k = box.label.indexOf(label);
		if(k>=0) {
			box.label.splice(k,1);
			box.focal.splice(k,1);
		}
	}
}

var power = 0;
for(var ib=0;ib<boxes.length;ib++) {		
	var box = boxes[ib];
	for(var il=0;il<box.label.length;il++) 
		power += (ib+1)*(il+1)*box.focal[il];
}

console.log(power);

function hash(s) {
	var r = 0;
	for(var i=0;i<s.length;i++) {
		r = r+s.charCodeAt(i);
		r *= 17;
		r = r%256;
	}
	return r;
}

