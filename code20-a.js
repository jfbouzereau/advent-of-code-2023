var fs = require("fs");

var lines = fs.readFileSync("input20-a.txt","utf8").split("\n").filter(x=>x);
//var lines = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

const OFF=false, ON=true;
const LO=0, HI=1;

var modules = [];
var ibroad = -1;

var pulses = [];
var count = [0,0];

for(var line of lines) {
	var m = line.match(/([%&]?)([a-z]+) -> (.*)/);
	var typ = m[1];
	var nam = m[2]
	var dst = m[3].split(", ");	
	modules.push({typ,nam,dst});
}

for(var i=0;i<modules.length;i++) {
	var m = modules[i];
	m.ind = i;
	if((m.typ=='')&&(m.nam=='broadcaster')) {
		ibroad = i;
		m.rcv = broadcast_receive;
		}
	else if(m.typ=='%')  {
		m.rcv = flipflop_receive;
		m.sts = OFF;
		}
	else if(m.typ=='&') {
		m.rcv = conjunction_receive;
		m.mem = {};
		}
	m.send = module_send;
}

for(var i=0;i<modules.length;i++) {
	var m = modules[i];
	for(var j=0;j<m.dst.length;j++)  {
		m.dst[j] = mindex(m.dst[j]);
		if(m.dst[j]>=0) {
			var mo = modules[m.dst[j]];
			if(mo.typ=="&") mo.mem[i] = LO;
		}
	}
}


//console.log(modules);

for(var i=0;i<1000;i++)
	run();

console.log(count[0]*count[1]);

function mindex(name) {
	for(var i=0;i<modules.length;i++)
		if(modules[i].nam==name)
			return i;
	return -1;
}

function broadcast_receive(p) {
	for(var ind of this.dst) 
		this.send(ind,p[2]);
}

function flipflop_receive(p) {
	if(p[2]==HI) return;
	this.sts = !this.sts;
	for(var ind of this.dst) 
		this.send(ind,this.sts ? HI:LO);
}

function conjunction_receive(p) {
	this.mem[p[0]] = p[2];
	var allhi = true;
	for(var ind in this.mem)
		if(this.mem[ind]==LO)
			allhi = false;	
	for(var ind of this.dst) 
		this.send(ind,allhi ? LO:HI);
}

function module_send(dest,pul) {
	var p = [this.ind,dest,pul];
	pulses.push(p);
}

function run() {

	pulses = [];
		
	modules[ibroad].rcv([-1,ibroad,LO]);
	count[LO]++;

	while(pulses.length>0) {
		var p = pulses.shift();
		count[p[2]]++;
		if(p[1]>=0)
			modules[p[1]].rcv(p);
	}

	
}

