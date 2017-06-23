
var ktoraGra = 0;


var wisielec = {};

wisielec.zmienne = {

    kg:ktoraGra++,
    podsumowanie: document.querySelector('.podsumowanie'),
    powieszony: document.querySelector('.powieszony'),
    licznik: document.querySelector('.licznik'),
    tekstKomunikatu: document.querySelector('.tekstKomunikatu'),
    licznikKlikniec: 0,
    maxKlik: 10,

    resetLicznik: function(){
		this.licznik.innerHTML = "";
    },
    resetPodsumowanie: function(){
    	this.podsumowanie.innerHTML = "";
    }
};

wisielec.rys = {
	rysujWisielca: function (){

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
        powieszony.innerHTML = "<span style=\"font-size: 2em; color: green; \"> reset </br>graj od nowa </span>";
        licznikKlikniec = -1;
    }
    return licznikKlikniec++;
}


};



var req = new XMLHttpRequest();
    req.open('GET', './slownik.json', false); 
    req.send(null);

    if(req.status == 200) {
        var slownik = JSON.parse(req.responseText);
}

console.log(slownik);

/*

var sa = new Slownik(slownik);

for (var i=0,  l = sa.z.length; i < l; i++){
	console.log(sa.z[i].sl);
}

o = {

  foo: {
    writable: true,
    configurable: true,
    value: 'hello'
  },

  bar: {
    configurable: false,
    get: function() { return 10; },
    set: function(value) {
      console.log('Setting `o.bar` to', value);
    }
  }
};

var l = o.bar.get();
l += 6;
l = Math.sqrt(l);

console.log(l);
*/
//o.bar.set('acha');


