/*
    var a ='',
        s = 'ala ma kota',
        k = "_ _ _ '&emsp;' _ _ '&emsp;'_ _  _ _",
        isFind = false;
    var l = 'a';
    var kk = k.split(' ');
console.log(kk);
    for (var i = 0; i < k.length-7; i++){
        console.log(k[i]);
        if (k[i].trim() != ' '){
            kk.push(k[i]);    
        }
        else if (k[i].trim() == '&emsp;'){
            kk.push(' ');
        }
    }

    console.log(s);
    console.log(kk);

    for (var i = 0; i < s.length; i++){
        if (s[i] == l){
            kk[i] = l;
            isFind = true;
        }
    }
    
    k = kk.join(' ');
    
    */

var test='ala ma kota';
test = test.replace(/a/gi, 'g');
console.log(test);
