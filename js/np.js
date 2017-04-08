function fib (n) {
	if(n == 1){
		return 1;
	}
	if (n == 2){
		return 1;
	};
	return fib(n-2) + fib(n-1);
}
var f = [];
for (var i = 0; i<20; i++){
	//f.push(fib(i))
	f[i] = fib(i+1);
};

//console.log(f.join(','));


var a = function () {
	console.log('raz');
	a = function(){
		console.log('dwa');
	};
};
/*
a();
a();
*/

var b = function () {
	console.log('braz');
	return function(){
		console.log('bdwa');
	};
};
/*
b()();

b();
*/

var set_priv;

var c = function(){

	var priv;

	set_priv = function (x){
		priv = x;
	};

	get_priv = function(){
		return priv;
	};

	var init = function (){
		var y = get_priv();
		set_priv(y*3+2);
	};

	var praca = function (){
		console.log('this.priv = '+ get_priv());
	};

	init();
	return praca;
};

c();

set_priv(4);



var z = c();



function setup(x) {
	var i = 0;
	return function(){
		var a = x[i++];
		var b = x[i++];
		//a = parseInt(a, 16);
		//b = parseInt(b, 16);
		//console.log(a,b);
		return parseInt(a+b,16);
	};
}

var getRGB = function(x){
	var next = setup(x);
	var mRGB = [];
	for (var i = 0; i < 3; i++){
		mRGB[i] = next();
	}
	return mRGB;
}
var cl = '00FF00';
//console.log(getRGB(cl));


var ColorRGB = function(x){
	this.color = x,
	this.setup = function () {
						var i = 0;
						return function(){
							return parseInt(this.color[i++]+this.color[i++],16);
						};
			},

	this.getRGB = function(){
				var next = setup(this.color);
				var mRGB = [];
				for (var i = 0; i < 3; i++){
					mRGB[i] = next();
				}
				return mRGB;
			}	

}

var cz = new ColorRGB('00FF00');
var k = new ColorRGB('12FFAF');

console.log(cz.getRGB());
console.log(k.getRGB());

