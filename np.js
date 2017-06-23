var obj = {
    baseValue: 5,
    add1: function(x) {
        var fn = function(v) {return v + this.baseValue; };
        return fn(x);
    },
    add2: function(x) {
        var fn = (v) => v + this.baseValue;
        return fn(x);
    }
};
console.log(obj.add1(2)); 

console.log(obj.add2(2)); 
var baseValue = 20; 
console.log(obj.add1(2)); 
console.log(obj.add2(2)); 
