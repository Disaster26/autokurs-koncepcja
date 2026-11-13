(function(){
  var d=document;
  d.getElementById('rok').textContent=new Date().getFullYear();

  // menu mobilne
  var burger=d.querySelector('.burger'),menu=d.getElementById('menu');
  function zamknij(){menu.classList.remove('otwarte');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Otwórz menu');d.body.style.overflow=''}
  burger.addEventListener('click',function(){
    var o=menu.classList.toggle('otwarte');
    burger.setAttribute('aria-expanded',o?'true':'false');
    burger.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');
    d.body.style.overflow=o?'hidden':'';
  });
  menu.addEventListener('click',function(e){if(e.target.closest('a'))zamknij()});
  d.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij()});

  // aktywna pozycja menu
  var linki=[].slice.call(menu.querySelectorAll('a[href^="#"]:not(.menu-zapis)'));
  var sekcje=linki.map(function(a){return d.querySelector(a.getAttribute('href'))}).filter(Boolean);
  if('IntersectionObserver' in window){
    var aktTik=false;
    function aktualizuj(){
      aktTik=false;var granica=innerHeight*0.45,id='';
      sekcje.forEach(function(s){if(s.getBoundingClientRect().top<=granica)id=s.id});
      linki.forEach(function(a){a.classList.toggle('akt',id!==''&&a.getAttribute('href')==='#'+id)});
    }
    window.addEventListener('scroll',function(){if(!aktTik){aktTik=true;requestAnimationFrame(aktualizuj)}},{passive:true});
    aktualizuj();

    // dolny pasek na telefonie po przewinięciu za pierwszy ekran
    var mob=d.getElementById('mob'),hero=d.querySelector('.hero .btn');
    new IntersectionObserver(function(w){
      var widac=!w[0].isIntersecting&&w[0].boundingClientRect.top<0;
      mob.classList.toggle('widac',widac);
      mob.setAttribute('aria-hidden',widac?'false':'true');
      [].forEach.call(mob.querySelectorAll('a'),function(a){a.tabIndex=widac?0:-1});
    }).observe(hero);
  }

  // wybór kursu z karty
  var sel=d.getElementById('kurs');
  [].forEach.call(d.querySelectorAll('[data-kurs]'),function(a){
    a.addEventListener('click',function(){sel.value=a.getAttribute('data-kurs')});
  });

  // formularz pokazowy
  d.getElementById('zapis').addEventListener('submit',function(e){
    e.preventDefault();
    this.querySelector('.form-info').textContent='To wizualizacja: na gotowej stronie zgłoszenie trafi do biura Auto-Kurs.';
  });

  // przewijanie myszą (przeciąganie) i strzałki
  [].forEach.call(d.querySelectorAll('[data-przewijak]'),function(el){
    var x0=0,s0=0,ciag=false,ruch=0;
    el.addEventListener('pointerdown',function(e){
      if(e.pointerType!=='mouse')return;
      ciag=true;ruch=0;x0=e.clientX;s0=el.scrollLeft;el.classList.add('przeciaga');
    });
    window.addEventListener('pointermove',function(e){
      if(!ciag)return;ruch=Math.abs(e.clientX-x0);el.scrollLeft=s0-(e.clientX-x0);
    });
    window.addEventListener('pointerup',function(){
      if(!ciag)return;ciag=false;el.classList.remove('przeciaga');
    });
    el.addEventListener('click',function(e){if(ruch>6){e.preventDefault();e.stopPropagation();ruch=0}},true);
    el.addEventListener('dragstart',function(e){e.preventDefault()});
  });
  var gal=d.querySelector('.galeria');
  [].forEach.call(d.querySelectorAll('.strzalki button'),function(b){
    b.addEventListener('click',function(){gal.scrollBy({left:(+b.getAttribute('data-kier'))*gal.clientWidth*0.7,behavior:'smooth'})});
  });
})();
