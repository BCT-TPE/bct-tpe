/* BCT design system — shared behaviour for the case pages.
   Adaptive header: samples the page background under the fixed #bctnav while
   scrolling and flips between the light theme (dark text + logo_black) and the
   .on-dark theme (white text + logo_white) so the bar stays readable on any
   section. The static class in the HTML is just the initial guess. */
(function(){
  var nav=document.getElementById('bctnav');
  if(!nav) return;
  var logo=nav.querySelector('.logo img');

  function effectiveBg(x,y){
    var els=document.elementsFromPoint(x,y);
    for(var i=0;i<els.length;i++){
      var el=els[i];
      if(nav.contains(el)||el===nav) continue;
      /* walk up from the hit element until something paints a colour */
      while(el&&el!==document.documentElement){
        var cs=getComputedStyle(el);
        var c=cs.backgroundColor;
        var m=c&&c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
        if(m&&(m[4]===undefined||parseFloat(m[4])>0.4)) return [+m[1],+m[2],+m[3]];
        el=el.parentElement;
      }
      break;
    }
    var b=getComputedStyle(document.body).backgroundColor;
    var mb=b&&b.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/);
    return mb?[+mb[1],+mb[2],+mb[3]]:[255,255,255];
  }
  function luminance(rgb){return (0.2126*rgb[0]+0.7152*rgb[1]+0.0722*rgb[2])/255;}

  var current=null;
  function apply(dark){
    if(dark===current) return;
    current=dark;
    nav.classList.toggle('on-dark',dark);
    if(logo) logo.src=logo.src.replace(/logo_(white|black)\.svg/, dark?'logo_white.svg':'logo_black.svg');
  }
  function update(){
    var y=Math.min(38,innerHeight/2);
    /* sample under the logo, the centre and the menu area; majority wins */
    var xs=[innerWidth*0.12,innerWidth*0.5,innerWidth*0.82],votes=0;
    for(var i=0;i<xs.length;i++){ if(luminance(effectiveBg(xs[i],y))<0.55) votes++; }
    apply(votes>=2);
  }
  var raf=null;
  function kick(){ if(raf) return; raf=requestAnimationFrame(function(){ raf=null; update(); }); }
  addEventListener('scroll',kick,{passive:true});
  addEventListener('resize',kick);
  addEventListener('load',update);
  update();
})();
