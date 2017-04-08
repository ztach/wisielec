var h = document.querySelector('.gametitle');

var podsumowanie = document.querySelector('.podsumowanie');

var powieszony = document.querySelector('.powieszony');

var licznik = document.querySelector('.licznik');

var licznikKlikniec = 0;
var maxKlik = 10;

h.addEventListener('click',rysujWisielca,false);

    
function rysujWisielca(){
	if ( licznikKlikniec < maxKlik ) {
    	licznik.innerHTML =  "<img src=\"img\/s"+ (licznikKlikniec) + ".jpg\" alt=\"rysunek wisielca\">";
        
    	podsumowanie.innerHTML = "wykonałeś " +(licznikKlikniec + 1)+ " ruch "
	} 
    
    if (licznikKlikniec == maxKlik-1 ) {
		//powieszony.innerHTML = "powiesiłeś wisielca";
        document.body.classList.add("modal-opened-powieszony");

	} 
    
    if (licznikKlikniec > maxKlik ) {
		powieszony.innerHTML = "<span style=\"font-size: 2em; color: green; \"> reset </br>graj od nowa </span>";
		licznikKlikniec = -1;
	}
	licznikKlikniec++;
};

var alfabet = document.querySelector('.alfabet');

//keyup

var alfabetTable = 'aąbcćdeęfghijklłmnńoópqrsśtuvwxyzżź ';


function wypiszAlfabet(){
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

function wypiszWszystkieLitery(){
var alph = wypiszAlfabet();
var licznikId = 1;
var s= '';
for (var i=0; i<alph.len;i++){

	var alphl = alph.tab[i].split('');

	for (var j=0; j<alphl.length;j++){
		
		if (alphl[j] != ' ') {
			s += "<li id=\"pozycjaId" + (licznikId++) + "\" class=\"row-alpha\" >" + alphl[j] + "</li>";
		}

	}
}
alfabet.innerHTML = s;
};

wypiszWszystkieLitery();




function wylosowaneSlowo(){
var slownik = [
    'jabłko',
    'gruszka',
    'wiśnia',
    'mama',
    'antoni',
    'jaki fajny dzień'
];

var losujSlowo = Math.floor(Math.random()*slownik.length);
var wylosowaneSlowo = slownik[losujSlowo].toUpperCase();
    
return {
    kreski: zamienSlowoNaKreski(wylosowaneSlowo),
    slowo: wylosowaneSlowo
    };

};


function zamienSlowoNaKreski(s){
    var a = '';
    for (var i=0;i<s.length;i++){
        a += (s[i] == ' ' ? '&emsp;' : '_ ');
    }
    return a.trim();
}

var wylSlowo = wylosowaneSlowo();

var slowoKr = document.querySelector('.slowo');
    slowoKr.innerHTML = wylSlowo.kreski; 
  

// nasłuch wciśniętego klawisza 
var rowAlpha = document.getElementsByTagName('li');
for (var i=0;i<rowAlpha.length;i++){
    rowAlpha[i].onmousedown = nasluchKlikniecia;
};

function nasluchKlikniecia(e){
var w = {
      kliknietaLitera:e.srcElement.innerHTML,
      id:e.target.id
      };
var slowo = document.querySelector('.slowo');
    var slowoZ = sprawdzSlowo(wylSlowo,w.kliknietaLitera);
    
    if(!slowoZ.isFind){
        rysujWisielca();
    }
    
    wylSlowo.kreski = slowoZ.slowo;
slowo.innerHTML = wylSlowo.kreski ;

    
};



function sprawdzSlowo(sl,l){
    var a ='',
        s = sl.slowo,
        k = sl.kreski,
        isFind = false;
    
        var kk = k.split(' ');
    
    for (var i = 0; i < s.length; i++){
        if (s[i] == l){
            kk[i] = l;
            isFind = true;
        }
    }
    
    k = kk.join(' ');
    
    
    return {
            slowo: k,
            isFind: isFind
            }
}


function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}




var closePromocjaBtn = document.querySelector(".modal-powieszony .close-powieszony-btn");

closePromocjaBtn.addEventListener("click",function () {
    document.body.classList.remove("modal-opened-powieszony");
},false);

