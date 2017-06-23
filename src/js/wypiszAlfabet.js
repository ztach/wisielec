var wypiszAlfabet = function(){


var alfabet = document.querySelector('.alfabet');
    alfabetTable = 'aąbcćdeęfghijklłmnńoópqrsśtuvwxyzżź ';

var wypiszAlfabet = function (){
    var s = '',
        t = [],
        k = 0,
        stopA = 6,
        stopB = 6;

    for(var j = 0; j<stopB;j++){
        for(var i = 0; i< stopA; i++){
            s += alfabetTable[i+k];
            if (i==stopA-1) { 
                t.push(s.toUpperCase()); 
                k += stopA;
                s='';
            }
        }
    }

    return {
        tab:t,
        len: t.length
    };
};

(function wypiszWszystkieLitery (){
    var alph = wypiszAlfabet(),
        licznikId = 1,
        s= '';

    for (var i=0; i<alph.len;i++){

        var alphl = alph.tab[i].split('');

        for (var j=0; j<alphl.length;j++){
            
            if (alphl[j] != ' ') {
                s += "<li id=\"pozycjaId" + (licznikId++) + "\" class=\"row-alpha\" >" + alphl[j] + "</li>";
            }

        }
    }
    alfabet.innerHTML = s;
})();

};

var o = new wypiszAlfabet();
//console.log(o);
//console.log('oni');