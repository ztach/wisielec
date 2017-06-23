var ktoraGra = 0;

var wisielec = function(){

    ktoraGra++;

var podsumowanie = document.querySelector('.podsumowanie'),
    powieszony = document.querySelector('.powieszony'),
    licznik = document.querySelector('.licznik'),
    tekstKomunikatu = document.querySelector('.tekstKomunikatu'),
    licznikKlikniec = 0,
    maxKlik = 10;
    

licznik.innerHTML = "";
podsumowanie.innerHTML = "";

    
function rysujWisielca(){

    if ( licznikKlikniec < maxKlik ) {
        licznik.innerHTML =  "<img src=\"img\/s"+ (licznikKlikniec) + ".jpg\" alt=\"rysunek wisielca\">";
        
        podsumowanie.innerHTML = "wykonałeś " +(licznikKlikniec + 1)+ " błędny ruch ";
    } 
    
    if (licznikKlikniec == maxKlik-1 ) {
        //powieszony.innerHTML = "powiesiłeś wisielca";
        document.body.classList.add("modal-opened-powieszony");
        tekstKomunikatu.innerHTML = "nie udało się odgadnąć!!!";

    } 
    
    if (licznikKlikniec > maxKlik ) {
//        powieszony.innerHTML = "<span style=\"font-size: 2em; color: green; \"> reset </br>graj od nowa </span>";
        licznikKlikniec = -1;
    }
    return licznikKlikniec++;
}

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

(function (){
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

 

var req = new XMLHttpRequest();
    req.open('GET', './slownik.json', false); 
    req.send(null);

    if(req.status == 200) {
        var slownik = JSON.parse(req.responseText);
}


var inputList = document.querySelector('input[list]'),
    input = document.querySelector('input'),
    gtTypGem = document.querySelector('.getTypeGame'),
    wybrano;

inputList.addEventListener('input', function(e) {
    var input = e.target,
        list = input.getAttribute('list'),
        options = document.querySelectorAll('#' + list + ' option'),
        hiddenInput = document.getElementById('answerInput-hidden'),
        inputValue = input.value;

    hiddenInput.value = inputValue;

    for(var i = 0; i < options.length; i++) {
        var option = options[i];

        if(option.innerText === inputValue) {
            hiddenInput.value = option.getAttribute('data-value');

            wybrano = { 
                    tekst:inputValue,
                    id:hiddenInput.value
                };
            break;
        }
    }
    
    var slownik = wybierzSlowa();

},false);


var wybierzSlowa = function(){
    var listaSlow=[];
    for (var i = 0; i < slownik.length; i++){
        if (slownik[i].typ == wybrano.id){
            listaSlow.push(slownik[i].sl);
        }
    }
    return listaSlow;
};



function wylosowaneSlowo(){

var losujId = Math.floor(Math.random()*slownik.length),
    wylosowaneSlowo = slownik[losujId].sl.toUpperCase(),
    wylosowanaPodpowiedz = slownik[losujId].gt,
    sciaga = document.querySelector('.sciaga');

    sciaga.innerHTML = wylosowanaPodpowiedz;
    
return {
    kreski: zamienSlowoNaKreski(wylosowaneSlowo),
    slowo: wylosowaneSlowo
    };

}


function zamienSlowoNaKreski(s){
    var a = '';
    for (var i=0;i<s.length;i++){
        a += (s[i] == ' ' ? '&emsp; ' : '_ ');
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
    //rowAlpha[i].onaup = nasluchKeypresa;
}



function nasluchKlikniecia(e){
    var w = {
      kliknietaLitera:e.target.firstChild.nodeValue,
      id:e.target.id
      },
    zaznaczKliknieta = document.querySelector('#'+w.id),
    wynik = document.querySelector('.head-powieszony');
    
    zaznaczKliknieta.setAttribute("class", "wybrana-litera");

    var slowo = document.querySelector('.slowo'),
        slowoZ = sprawdzSlowo(wylSlowo,w.kliknietaLitera);
    
    if(!slowoZ.isFind){
        var v = rysujWisielca();
        if (v == 11){
            wisielec();
        }
    }
    

    wylSlowo.kreski = slowoZ.slowo;
    slowo.innerHTML = wylSlowo.kreski ;

    wynik.innerHTML = wylSlowo.slowo;

    if (slowoZ.koniec){
        document.body.classList.add("modal-opened-powieszony");
        tekstKomunikatu.innerHTML =  "gratulacje<br/>";
        tekstKomunikatu.innerHTML += "dobry wybór";
    }
    
}



function sprawdzSlowo(sl,l){
    var a ='',
        s = sl.slowo,
        k = sl.kreski,
        isFind = false;
    
    var kk = k.split(' ');

    for (var i = 0; i < kk.length; i++){
        if (s[i] == l){
            kk[i] = l;
            isFind = true;
        }
    }
    
    k = kk.join(' ');
    var test = kk.join('');
    test = test.replace(/&emsp;/gi,' ');

    return {
            slowo: k,
            isFind: isFind,
            koniec: (s === test? true : false)
            };
    }
};

wisielec();

var closePowBtn = document.querySelector(".close-powieszony-btn");

closePowBtn.addEventListener("click",function () {
    document.body.classList.remove("modal-opened-powieszony");
    wisielec();
},false);


var btnResetBtn = document.querySelector('.btnReset');

btnResetBtn.addEventListener('click',wisielec,false);


