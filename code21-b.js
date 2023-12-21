var fs = require("fs");

var grid = fs.readFileSync("input21-a.txt","utf8").split("\n").filter(x=>x);
//var grid = fs.readFileSync("test.txt","utf8").split("\n").filter(x=>x);

var nr = grid.length;
var nc = grid[0].length;

var total = 0;

for(var row=0;row<nr;row++) {
	var col = grid[row].indexOf("S");
	if(col>=0) break;
}

var target = 26501365;
var rest = target % nr;

var M = [[],[],[]];  // matrix to be inverted
var V = [];

var rtile=0,ctile=0;
var list1={},list2={};

var key = row+"/"+col+"/"+rtile+"/"+ctile;
list1[key] = 1;

// function of step is quadratic. 
// Evaluate at three points, find the coefficients, then the value

for(var step=1;step<=rest+3*nr;step++) {
	for(var key in list1) {
		[row,col,rtile,ctile] = key.split("/").map(x=>parseInt(x));
		check(row-1,col,rtile,ctile);
		check(row+1,col,rtile,ctile);
		check(row,col-1,rtile,ctile);
		check(row,col+1,rtile,ctile);	
	}
	list1 = list2;
	list2 = {};
	if(step==rest+nr) {
		M[0][0] = (rest+nr)*(rest+nr);
		M[0][1] = rest+nr;
		M[0][2] = 1;
		V[0] = count();
	}
	else if(step==rest+2*nr) {
		M[1][0] = (rest+2*nr)*(rest+2*nr);
		M[1][1] = rest+2*nr;
		M[1][2] = 1;
		V[1] = count();
	}
	else if(step==rest+3*nr) {
		M[2][0] = (rest+3*nr)*(rest+3*nr);
		M[2][1] = rest+3*nr;
		M[2][2] = 1;
		V[2] = count();
	}
}


var I = invert(M);
var W = mult(I,V);
var X = [target*target,target,1];

var result = 0;
for(var i=0;i<X.length;i++)
	result += W[i]*X[i];

console.log(result);
	
function check(row,col,rtile,ctile) {
	if(row<0) { row = nr-1 ; rtile--; }
	if(row>=nr) { row = 0; ; rtile++; }
	if(col<0) { col = nc-1; ctile--; }
	if(col>=nc) { col = 0; ctile++; }
	if(grid[row][col]=="#") return;
	var key = row+"/"+col+"/"+rtile+"/"+ctile;
	if(key in list2) return;
	list2[key] = 1;
}

function count() {
	var n = 0;
	for(var key in list1)
		n++;
	return n;
}


function invert(M){
if(M.length !== M[0].length){return;}
    
    //create the identity matrix (I), and a copy (C) of the original
    var i=0, ii=0, j=0, dim=M.length, e=0, t=0;
    var I = [], C = [];
    for(i=0; i<dim; i+=1){
        // Create the row
        I[I.length]=[];
        C[C.length]=[];
        for(j=0; j<dim; j+=1){
            if(i==j){ I[i][j] = 1; }
            else{ I[i][j] = 0; }
            C[i][j] = M[i][j];
        }
    }
    
    for(i=0; i<dim; i+=1){
        e = C[i][i];
        
        if(e==0){
            for(ii=i+1; ii<dim; ii+=1){
                if(C[ii][i] != 0){
                    for(j=0; j<dim; j++){
                        e = C[i][j];       //temp store i'th row
                        C[i][j] = C[ii][j];//replace i'th row by ii'th
                        C[ii][j] = e;      //repace ii'th by temp
                        e = I[i][j];       //temp store i'th row
                        I[i][j] = I[ii][j];//replace i'th row by ii'th
                        I[ii][j] = e;      //repace ii'th by temp
                    }
                    //don't bother checking other rows since we've swapped
                    break;
                }
            }
            e = C[i][i];
            if(e==0){return}
        }
        
        for(j=0; j<dim; j++){
            C[i][j] = C[i][j]/e; //apply to original matrix
            I[i][j] = I[i][j]/e; //apply to identity
        }
        
        for(ii=0; ii<dim; ii++){
            if(ii==i){continue;}
            
            e = C[ii][i];
            
            for(j=0; j<dim; j++){
                C[ii][j] -= e*C[i][j]; //apply to original matrix
                I[ii][j] -= e*I[i][j]; //apply to identity
            }
        }
    }
    
    return I;
}

function mult(M,V) {
	var R = [];
	for(var i=0;i<M.length;i++) {
		R[i] = 0;
		for(var j=0;j<V.length;j++)
			R[i] += M[i][j]*V[j];
	}
	return R;
}

