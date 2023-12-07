var fs = require("fs");

var lines = fs.readFileSync("input07-a.txt","utf8").split("\n").filter(x=>x);
//var lines = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

const KINDS = "AKQT98765432J";
const STR = ["11111","1112","122","113","23","14","5"];

var games = [];
for(var line of lines) {
	var game = {hand:line.split(" ")[0],bid:parseInt(line.split(" ")[1])};
	game.strength = strength(game);
	games.push(game);
}

games.sort(compare);

var result = 0;
for(var i=0;i<games.length;i++)
	result += (i+1)*games[i].bid;

console.log(result);

function strength(game) {
	var s = "";
	// count of each kind
	for(var kind of KINDS)
		s += 5-game.hand.replaceAll(kind,"").length;
	s = s.replace(/0/g,"").split("").sort().join("");
	var v = STR.indexOf(s);
	
	// if no joker in hand
	if(game.hand.indexOf("J")<0) return v;

	var savedhand = game.hand;

	// try to substitute J
	for(var c of savedhand) if(c!="J") {		
		game.hand = savedhand.replaceAll("J",c);	
		var newv = strength(game);
		if(newv>v) v = newv;
	}
	game.hand = savedhand;
	return v;
}

function compare(a,b) {
	if(a.strength!=b.strength)
		return a.strength-b.strength;
	else if(a.hand[0]!=b.hand[0])
		return KINDS.indexOf(b.hand[0])-KINDS.indexOf(a.hand[0]);
	else if(a.hand[1]!=b.hand[1])
		return KINDS.indexOf(b.hand[1])-KINDS.indexOf(a.hand[1]);
	else if(a.hand[2]!=b.hand[2])
		return KINDS.indexOf(b.hand[2])-KINDS.indexOf(a.hand[2]);
	else if(a.hand[3]!=b.hand[3])
		return KINDS.indexOf(b.hand[3])-KINDS.indexOf(a.hand[3]);
	else
		return KINDS.indexOf(b.hand[4])-KINDS.indexOf(a.hand[4]);
	
}

