/* Pratik Bam portfolio. Plain JavaScript, no libraries. */
(function(){
'use strict';
var $ = function(s,c){return (c||document).querySelector(s)};
var $$ = function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var html = document.documentElement;
var RMOTION = !!window.RM;
var CAN_HOVER = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
function safeHref(h){return typeof h==='string' && /^(https:\/\/|mailto:|tel:)/i.test(h)}
function onGo(fn){ if(html.classList.contains('go')) fn(); else document.addEventListener('pbgo',fn,{once:true}); }

/* ================= config ================= */
var CONTACT = (window.PORTFOLIO_CONTACT||[]).filter(function(x){return x && safeHref(x.href)});
var PROFILE = window.PORTFOLIO_PROFILE||{};
var BOOKCFG = window.PORTFOLIO_BOOKS||{};

/* ================= intro ================= */
(function(){
  var intro=$('#intro');
  function go(){ html.classList.add('go'); document.dispatchEvent(new Event('pbgo')); }
  if(RMOTION||!intro){ if(intro) intro.remove(); go(); return; }
  var seen=false; try{seen=sessionStorage.getItem('pb-seen')==='1'}catch(e){}
  try{sessionStorage.setItem('pb-seen','1')}catch(e){}
  var dur=seen?450:1500, t0=performance.now(), pct=$('#pct'), bar=$('#introBar');
  (function step(t){
    var k=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-k,3);
    pct.textContent=Math.round(e*100); bar.style.transform='scaleX('+e+')';
    if(k<1) requestAnimationFrame(step);
    else { intro.classList.add('open'); go(); setTimeout(function(){intro.remove()},1300); }
  })(t0);
})();

/* ================= name + typewriter ================= */
(function(){
  var el=$('#name'), txt='Pratik Bam', i=0; el.textContent='';
  txt.split(' ').forEach(function(word,wi){
    var w=document.createElement('span'); w.className=wi===1?'w it':'w'; w.setAttribute('aria-hidden','true');
    word.split('').forEach(function(ch){var s=document.createElement('span');s.className='l';s.textContent=ch;s.style.setProperty('--i',i++);w.appendChild(s)});
    el.appendChild(w);
    if(wi===0){var sp=document.createElement('span');sp.className='l';sp.style.setProperty('--i',i++);sp.innerHTML='&nbsp;';sp.setAttribute('aria-hidden','true');el.appendChild(sp)}
  });
  var roles=['BBS Management Student','Author','Self-published Writer','Aspiring Administration Professional'];
  var t=$('#typed');
  if(RMOTION){ t.textContent=roles.join(' | '); return; }
  var r=0,c=0,del=false; t.textContent='';
  function tick(){
    var full=roles[r];
    if(!del){ c++; t.textContent=full.slice(0,c); if(c===full.length){del=true;return setTimeout(tick,1800)} return setTimeout(tick,60) }
    c--; t.textContent=full.slice(0,c);
    if(c===0){del=false;r=(r+1)%roles.length;return setTimeout(tick,330)}
    setTimeout(tick,28);
  }
  onGo(function(){ setTimeout(tick,1300) });
})();

/* ================= social icons ================= */
var ICONS={
  email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  whatsapp:'<path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5.2A8.5 8.5 0 1 1 21 11.5z"/><path d="M9 9c.4 2.2 2.6 4.4 5.2 5.2l1.4-1.4-2-1-1 .8c-.9-.4-1.6-1.1-2-2l.8-1-1-2z"/>',
  instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r=".6"/>',
  facebook:'<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  linkedin:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5a3 3 0 0 1 6 0V17"/>',
  x:'<path d="M4 4l16 16M20 4 4 20"/>',
  youtube:'<rect x="3" y="6" width="18" height="12" rx="4"/><path d="m10 9.5 5 2.5-5 2.5z"/>',
  amazon:'<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
  link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'
};
function renderSocial(ul,withLabel){
  ul.innerHTML=CONTACT.map(function(x){
    var ic=ICONS[x.type]||ICONS.link, label=x.label||x.type||'Link';
    var ext=/^https:/i.test(x.href)?' target="_blank" rel="noopener noreferrer"':'';
    return '<li><a href="'+esc(x.href)+'"'+ext+' aria-label="'+esc(label)+'" title="'+esc(label)+'"><svg viewBox="0 0 24 24" aria-hidden="true">'+ic+'</svg>'+(withLabel?'<span>'+esc(label)+'</span>':'')+'</a></li>';
  }).join('');
  ul.hidden=false;
}
function hostOf(h){ if(/^mailto:/i.test(h)) return h.replace(/^mailto:/i,'').split('?')[0]; if(/^tel:/i.test(h)) return h.replace(/^tel:/i,''); try{ var u=new URL(h); return u.hostname.replace(/^www\./,'')+(u.pathname.length>1?u.pathname.replace(/\/$/,''):''); }catch(e){ return h } }
function renderRows(ul){
  ul.innerHTML=CONTACT.map(function(x){
    var ic=ICONS[x.type]||ICONS.link, label=x.label||x.type||'Link';
    var ext=/^https:/i.test(x.href)?' target="_blank" rel="noopener noreferrer"':'';
    return '<li><a class="row" href="'+esc(x.href)+'"'+ext+'><span class="ci"><svg viewBox="0 0 24 24" aria-hidden="true">'+ic+'</svg></span><span class="ct"><b>'+esc(label)+'</b><small>'+esc(x.note||hostOf(x.href))+'</small></span></a></li>';
  }).join('');
}
if(CONTACT.length){ renderSocial($('#heroSocial'),false); renderRows($('#clinks')); }

/* ================= portrait (only used if the file loads) ================= */
(function(){
  if(!PROFILE.portrait) return;
  var img=new Image(); img.alt='Portrait of Pratik Bam'; img.decoding='async';
  img.onload=function(){ var f=$('#frame'); f.appendChild(img); $('#ph').style.display='none'; };
  img.onerror=function(){};
  img.src=PROFILE.portrait;
})();

/* ================= books: 3D coverflow ================= */
var BOOKS=[
  {id:'loved',c:'#A8827C',t:'#2E1F1D',kind:'Book',title:'I Loved You Without Being Yours',sub:'',r:.627},
  {id:'perspective',c:'#A9C3D0',t:'#10181C',kind:'Book',title:'Perhaps It\u2019s Your Perspective',sub:'A different way of looking at life, struggles, and happiness',r:.627},
  {id:'struggle',c:'#4A1D5E',t:'#FFFFFF',kind:'Book',title:'From Struggle to Strength',sub:'My Journey of Life Lessons (Stillness & Strength)',r:.627},
  {id:'world',c:'#8C7AC8',t:'#1F1A44',kind:'Book',title:'In a World Where You\u2019re Mine',sub:'A Story of Love That Never Let Go',r:.627},
  {id:'mind',c:'#3F78A0',t:'#FFFFFF',kind:'Book',title:'You Simply Cross My Mind',sub:'The Memories I Never Invited Back',r:.627},
  {id:'bible',c:'#B9A58E',t:'#3A2A1E',kind:'Book',title:'The Bible Explained',sub:'From Genesis to Revelation: A Complete Guide to All 66 Books, Their Stories, People, History, Teachings, and Messages',r:.707},
  {id:'listen',c:'#2F7FD0',t:'#FFFFFF',kind:'Book',title:'Listen, I Have Fallen in Love With You',sub:'A Journey Through the Silence of the Heart',r:.627},
  {id:'care',c:'#1B2440',t:'#F6F1E4',kind:'Book',title:'Take Care of Yourself',sub:'For the Nights Your Mind Refuses to Rest',r:.627},
  {id:'between',c:'#E79A5A',t:'#1B2240',kind:'Book',title:'Somewhere Between Love and Letting Go',sub:'A Journey Through Love, Unforgettable Memories, and the Courage to Let Go',r:.627}
];
(function(){
  var stage=$('#fstage'), detail=$('#fdetail'), dots=$('#fdots'), flow=$('#flow'), note=$('#fnote'), cur=0, n=BOOKS.length;
  var placeholders=0;
  BOOKS.forEach(function(b,i){
    var cfg=BOOKCFG[b.id]||{}; b.cover=cfg.cover||''; b.amazon=safeHref(cfg.amazon)?cfg.amazon:'';
    if(!b.cover) placeholders++;
    var el=document.createElement('div'); el.className='b3d'; el.style.setProperty('--c',b.c); el.style.setProperty('--w',Math.round(255*b.r)+'px'); var kc='love';
    el.setAttribute('role','group'); el.setAttribute('aria-roledescription','slide'); el.setAttribute('aria-label',(i+1)+' of '+n+': '+b.title);
    var front=b.cover ? '<img src="'+esc(b.cover)+'" alt="Cover of '+esc(b.title)+'" loading="lazy" width="'+Math.round(255*b.r)+'" height="255">'
      : '<span class="k">'+esc(b.kind)+'</span><span class="t">'+esc(b.title)+'</span><span class="a">Pratik Bam</span>';
    el.innerHTML='<div class="bx" style="--c:'+b.c+';--t:'+b.t+'"><div class="f front '+(b.cover?'real':'k-'+kc)+'">'+front+'</div><div class="f back"><span>'+esc(b.title)+'</span></div><div class="f spine"><span>'+esc(b.title)+'</span></div><div class="f pages"></div><div class="f top"></div><div class="f bot"></div></div><div class="floor"></div>';
    el.addEventListener('click',function(){ if(moved) return; if(i!==cur){ go(i); } else if(b.amazon){ window.open(b.amazon,'_blank','noopener'); } });
    if(b.amazon) el.title=b.title;
    stage.appendChild(el);
    var d=document.createElement('button'); d.type='button'; d.setAttribute('aria-label','Show '+b.title); d.addEventListener('click',function(){go(i)}); dots.appendChild(d);
    if(b.cover){ var im=el.querySelector('img'); im.onerror=function(){ im.remove(); var f=el.querySelector('.front'); f.classList.remove('real'); f.classList.add('k-love'); f.innerHTML='<span class="k">'+esc(b.kind)+'</span><span class="t">'+esc(b.title)+'</span><span class="a">Pratik Bam</span>'; }; }
  });
  note.textContent = placeholders ? 'Some cover images could not be loaded, so a simple typographic cover is shown for those titles.' : '';
  /* clickable cards for all titles + author page button */
  var minis=$('#bks');
  if(minis){
    minis.innerHTML=BOOKS.map(function(b,i){
      var inner='<span class="im">'+(b.cover?'<img src="'+esc(b.cover)+'" alt="Cover of '+esc(b.title)+'" loading="lazy" width="'+Math.round(255*b.r)+'" height="255">':'')+'</span><span class="mt">'+esc(b.title)+'</span>';
      return b.amazon?'<a class="bk" href="'+esc(b.amazon)+'" target="_blank" rel="noopener noreferrer" aria-label="'+esc(b.title)+' on Amazon (opens in a new tab)">'+inner+'</a>':'<span class="bk">'+inner+'</span>';
    }).join('');
  }
  var ab=$('#authorBtn'), ac=CONTACT.filter(function(x){return x.type==='amazon'})[0];
  if(ab && ac){ ab.href=ac.href; ab.hidden=false; }
  function layout(){
    var narrow=window.innerWidth<700, gap=narrow?112:212, depth=narrow?110:150;
    $$('.b3d',stage).forEach(function(el,i){
      var o=i-cur, a=Math.abs(o);
      var x=o*gap+(o===0?0:(o>0?30:-30)), z=-a*depth+(o===0?60:0), ry=o===0?0:(o>0?-1:1)*Math.min(52,32+a*8);
      el.style.transform='translate3d('+x+'px,0,'+z+'px) rotateY('+ry+'deg)';
      el.style.opacity=a>2?0:1; el.style.pointerEvents=a>2?'none':'auto'; el.style.zIndex=10-a;
      el.classList.toggle('center',o===0); el.setAttribute('aria-hidden',a>2?'true':'false');
    });
    Array.prototype.forEach.call(dots.children,function(d,i){d.setAttribute('aria-current',i===cur?'true':'false')});
    var b=BOOKS[cur]; flow.style.setProperty('--bg-c',b.c);
    var num=('0'+(cur+1)).slice(-2);
    detail.innerHTML='<div><span class="tag2">Book '+num+' of 0'+n+'</span><h3>'+esc(b.title)+'</h3>'+(b.sub?'<span class="sub">'+esc(b.sub)+'</span>':'')+'<span class="by">By Pratik Bam</span>'
      +(b.amazon?'<div class="dact"><a class="btn" href="'+esc(b.amazon)+'" target="_blank" rel="noopener noreferrer">View on Amazon<span class="sr"> (opens in a new tab)</span></a></div>':'')+'</div>'
      +'<div class="dnum" aria-hidden="true"><b>'+num+'</b><span>of 0'+n+'</span></div>';
  }
  function go(i){cur=(i+n)%n;layout()}
  $('#fprev').addEventListener('click',function(){go(cur-1)});
  $('#fnext').addEventListener('click',function(){go(cur+1)});
  flow.addEventListener('keydown',function(e){ if(e.key==='ArrowLeft'){e.preventDefault();go(cur-1)} if(e.key==='ArrowRight'){e.preventDefault();go(cur+1)} });
  var sx=null, moved=false;
  stage.addEventListener('pointerdown',function(e){sx=e.clientX;moved=false});
  window.addEventListener('pointerup',function(e){ if(sx===null) return; var dx=e.clientX-sx; sx=null; if(Math.abs(dx)>45){moved=true;go(cur+(dx<0?1:-1));setTimeout(function(){moved=false},60)} });
  if(!RMOTION && CAN_HOVER){
    var ht=0;
    flow.addEventListener('pointermove',function(e){
      if(sx!==null) return;
      var r=flow.getBoundingClientRect();
      flow.style.setProperty('--tx',(((e.clientX-r.left)/r.width-.5)*2).toFixed(3));
      flow.style.setProperty('--ty',(((e.clientY-r.top)/r.height-.5)*2).toFixed(3));
      flow.classList.add('hov');
    });
    flow.addEventListener('pointerleave',function(){flow.classList.remove('hov')});
  }
  /* load every carousel cover as soon as the carousel is near the screen, so no book is ever blank */
  function eager(){ $$('.f.front img',stage).forEach(function(im){ im.loading='eager'; }); }
  if('IntersectionObserver' in window){ var eo=new IntersectionObserver(function(en){ if(en[0].isIntersecting){ eager(); eo.disconnect(); } },{rootMargin:'900px 0px'}); eo.observe(flow); } else { eager(); }
  var rt; window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(layout,150)});
  layout();
})();

/* ================= journey globe (Canvas 2D, no libraries) ================= */
var globeFocus='both';
(function(){
  var cv=$('#globe'); if(!cv) return; var ctx=cv.getContext('2d'); if(!ctx) return;
  var FOCUS={both:67,nepal:79,uae:55};
  var A={lat:24.45,lon:54.38,name:'Abu Dhabi',c:'217,190,140'}, N={lat:28.97,lon:80.18,name:'Kanchanpur',c:'77,141,255'};
  var S=0,dpr=1,yaw=67,drag=0,dragging=false,lx=0,tilt=.42,tt=.42,visible=true,running=false,t0=0,dots=[];
  function rad(d){return d*Math.PI/180}
  function vec(lat,lon){var la=rad(lat),lo=rad(lon);return [Math.cos(la)*Math.sin(lo),Math.sin(la),Math.cos(la)*Math.cos(lo)]}
  function proj(v,yw){
    var c=Math.cos(rad(-yw)),s=Math.sin(rad(-yw)),x=v[0]*c+v[2]*s,z=-v[0]*s+v[2]*c,y=v[1];
    var ct=Math.cos(tilt),st=Math.sin(tilt);return [x,y*ct-z*st,y*st+z*ct];
  }
  function size(){
    var r=cv.getBoundingClientRect(); S=Math.max(240,Math.round(r.width)); dpr=Math.min(window.devicePixelRatio||1,1.75);
    cv.width=S*dpr; cv.height=S*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    var cnt=S<400?650:1000; dots=[]; var ga=Math.PI*(3-Math.sqrt(5));
    for(var i=0;i<cnt;i++){var y=1-(i/(cnt-1))*2,r2=Math.sqrt(1-y*y),th=ga*i;dots.push([Math.cos(th)*r2,y,Math.sin(th)*r2])}
  }
  function slerp(a,b,t){
    var d=Math.max(-1,Math.min(1,a[0]*b[0]+a[1]*b[1]+a[2]*b[2])),om=Math.acos(d),so=Math.sin(om);
    if(so<1e-4)return a; var k1=Math.sin((1-t)*om)/so,k2=Math.sin(t*om)/so;
    return [a[0]*k1+b[0]*k2,a[1]*k1+b[1]*k2,a[2]*k1+b[2]*k2];
  }
  function draw(ts){
    var R=S*.39,cx=S/2,cy=S/2,time=ts/1000;
    ctx.clearRect(0,0,S,S);
    var g=ctx.createRadialGradient(cx,cy,R*.6,cx,cy,R*1.35);
    g.addColorStop(0,'rgba(77,141,255,.16)');g.addColorStop(.6,'rgba(122,60,255,.07)');g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,R*1.35,0,6.283);ctx.fill();
    ctx.fillStyle='rgba(9,12,25,.78)';ctx.beginPath();ctx.arc(cx,cy,R,0,6.283);ctx.fill();
    ctx.strokeStyle='rgba(160,185,255,.35)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,R,0,6.283);ctx.stroke();
    var yw=yaw+drag;
    /* graticule */
    ctx.lineWidth=.7;
    for(var la=-60;la<=60;la+=30){ line(function(k){return vec(la,k*360/72)},73,.16) }
    for(var lo=0;lo<360;lo+=30){ line(function(k){return vec(-90+k*180/36,lo)},37,.16) }
    function line(fn,m,al){
      ctx.beginPath();var pen=false;
      for(var k=0;k<m;k++){var p=proj(fn(k),yw);
        if(p[2]>0){var X=cx+p[0]*R,Y=cy-p[1]*R;if(pen)ctx.lineTo(X,Y);else{ctx.moveTo(X,Y);pen=true}}else pen=false}
      ctx.strokeStyle='rgba(160,185,255,'+al+')';ctx.stroke();
    }
    /* dots */
    for(var i=0;i<dots.length;i++){var p=proj(dots[i],yw);if(p[2]>0){var a=.12+.5*p[2];ctx.fillStyle='rgba(200,215,255,'+a.toFixed(3)+')';ctx.fillRect(cx+p[0]*R-.7,cy-p[1]*R-.7,1.4,1.4)}}
    /* arc */
    var va=vec(A.lat,A.lon),vn=vec(N.lat,N.lon),pts=[];
    for(var k=0;k<=70;k++){var t=k/70,v=slerp(vn,va,t),L=1+.2*Math.sin(Math.PI*t);pts.push(proj([v[0]*L,v[1]*L,v[2]*L],yw))}
    ctx.lineWidth=1.2;ctx.beginPath();var pen=false;
    pts.forEach(function(p){if(p[2]>-.05){var X=cx+p[0]*R,Y=cy-p[1]*R;if(pen)ctx.lineTo(X,Y);else{ctx.moveTo(X,Y);pen=true}}else pen=false});
    ctx.strokeStyle='rgba(217,190,140,.35)';ctx.stroke();
    var head=RMOTION?1:((time%3.4)/3.4);
    for(var j=Math.max(0,Math.floor(head*70)-16);j<=Math.floor(head*70)&&j<pts.length;j++){
      var p2=pts[j];if(p2[2]>-.05){var al=(1-(Math.floor(head*70)-j)/16);ctx.fillStyle='rgba(255,235,190,'+(al*.9).toFixed(3)+')';ctx.beginPath();ctx.arc(cx+p2[0]*R,cy-p2[1]*R,1+al*1.6,0,6.283);ctx.fill()}}
    /* cities */
    [N,A].forEach(function(c){
      var p=proj(vec(c.lat,c.lon),yw);if(p[2]<=0)return;
      var X=cx+p[0]*R,Y=cy-p[1]*R,pulse=RMOTION?0:((time*.9)%1);
      ctx.strokeStyle='rgba('+c.c+','+(.6*(1-pulse)).toFixed(3)+')';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(X,Y,5+pulse*16,0,6.283);ctx.stroke();
      ctx.fillStyle='rgb('+c.c+')';ctx.shadowColor='rgb('+c.c+')';ctx.shadowBlur=14;ctx.beginPath();ctx.arc(X,Y,4,0,6.283);ctx.fill();ctx.shadowBlur=0;
      ctx.font='600 '+(S<400?11:13)+'px "DM Sans",system-ui,sans-serif';ctx.fillStyle='#F4F6FB';ctx.textAlign=(c===N)?'left':'right';
      ctx.fillText(c.name,X+(c===N?12:-12),Y-9);
    });
  }
  var last=0;
  function frame(ts){
    if(!running) return;
    var target=FOCUS[globeFocus]; yaw+=(target-yaw)*.045;
    if(!dragging) drag*=.96;
    tilt+=(tt-tilt)*.06;
    draw(ts); requestAnimationFrame(frame);
  }
  function start(){ if(!running&&visible&&!document.hidden){running=true;requestAnimationFrame(frame)} }
  size(); yaw=FOCUS.both; draw(0);
  if(RMOTION) return;
  var rt; window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){size();draw(performance.now())},150)});
  if('IntersectionObserver' in window){ new IntersectionObserver(function(es){visible=es[0].isIntersecting;if(visible)start();else running=false},{threshold:.05}).observe(cv); } else start();
  document.addEventListener('visibilitychange',function(){if(document.hidden)running=false;else start()});
  cv.addEventListener('pointerdown',function(e){dragging=true;lx=e.clientX;cv.setPointerCapture&&cv.setPointerCapture(e.pointerId)});
  cv.addEventListener('pointermove',function(e){ if(dragging){drag+= (e.clientX-lx)*-.35;lx=e.clientX}else if(CAN_HOVER){var r=cv.getBoundingClientRect();tt=.42+((e.clientY-r.top)/r.height-.5)*.2} });
  window.addEventListener('pointerup',function(){dragging=false});
  start();
})();

/* ================= background canvas: particles + distant lightning ================= */
(function(){
  var cv=$('#fx'), ctx=cv.getContext('2d'); if(!ctx) return;
  var W=0,H=0,dpr=1,parts=[],bolt=null,nextBolt=0,running=true,last=0;
  var COLORS=['77,141,255','122,60,255','217,190,140','255,255,255'];
  function size(){
    dpr=Math.min(window.devicePixelRatio||1,1.5);W=window.innerWidth;H=window.innerHeight;
    cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    var n=W<700?20:40;parts=[];
    for(var i=0;i<n;i++)parts.push({x:Math.random()*W,y:Math.random()*H,r:.6+Math.random()*1.6,vx:(Math.random()-.5)*.14,vy:-.05-Math.random()*.2,a:.18+Math.random()*.45,ph:Math.random()*6.28,c:COLORS[(Math.random()*COLORS.length)|0]});
  }
  function makeBolt(){
    var left=Math.random()<.5,x=W*(left?.05+Math.random()*.18:.77+Math.random()*.18),y=-10,pts=[[x,y]],maxY=H*(.28+Math.random()*.3);
    while(y<maxY){y+=12+Math.random()*26;x+=(Math.random()-.5)*46;pts.push([x,y])}
    var br=[];for(var k=2;k<pts.length-2;k+=3){if(Math.random()<.55){var bx=pts[k][0],by=pts[k][1],b=[[bx,by]],d=Math.random()<.5?-1:1;for(var j=0;j<4;j++){bx+=d*(8+Math.random()*18);by+=6+Math.random()*16;b.push([bx,by])}br.push(b)}}
    return {pts:pts,br:br,t:0,dur:620};
  }
  function line(p){ctx.beginPath();ctx.moveTo(p[0][0],p[0][1]);for(var i=1;i<p.length;i++)ctx.lineTo(p[i][0],p[i][1]);ctx.stroke()}
  function frame(ts){
    if(!running)return;
    var dt=Math.min(40,ts-last||16);last=ts;ctx.clearRect(0,0,W,H);
    for(var i=0;i<parts.length;i++){var p=parts[i];p.x+=p.vx*dt*.06;p.y+=p.vy*dt*.06;p.ph+=dt*.0016;
      if(p.y<-8){p.y=H+8;p.x=Math.random()*W}if(p.x<-8)p.x=W+8;if(p.x>W+8)p.x=-8;
      var a=p.a*(.65+.35*Math.sin(p.ph));ctx.fillStyle='rgba('+p.c+','+a.toFixed(3)+')';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fill()}
    if(!bolt&&ts>nextBolt)bolt=makeBolt();
    if(bolt){bolt.t+=dt;var k=bolt.t/bolt.dur;
      if(k>=1){bolt=null;nextBolt=ts+8000+Math.random()*8000}
      else{var a2=(1-k)*(.3+.18*Math.sin(bolt.t*.09));ctx.save();ctx.lineJoin='round';ctx.strokeStyle='rgba(160,190,255,'+Math.max(a2,0).toFixed(3)+')';ctx.shadowColor='rgba(77,141,255,.9)';ctx.shadowBlur=14;ctx.lineWidth=1.2;line(bolt.pts);ctx.lineWidth=.8;bolt.br.forEach(line);ctx.restore()}}
    requestAnimationFrame(frame);
  }
  size();var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(size,200)});
  if(RMOTION){frame(0);running=false;return}
  nextBolt=3500;
  document.addEventListener('visibilitychange',function(){if(document.hidden)running=false;else if(!running){running=true;last=0;requestAnimationFrame(frame)}});
  requestAnimationFrame(frame);
})();

/* ================= pointer light + magnetic buttons ================= */
(function(){
  if(RMOTION||!CAN_HOVER) return;
  var g=$('#glow'),raf=0,mx=0,my=0;
  window.addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;g.classList.add('on');if(!raf)raf=requestAnimationFrame(function(){raf=0;g.style.transform='translate3d('+mx+'px,'+my+'px,0)'})},{passive:true});
  document.addEventListener('pointerleave',function(){g.classList.remove('on')});
  $$('.mag').forEach(function(el){
    el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();el.style.transform='translate('+((e.clientX-(r.left+r.width/2))*.2).toFixed(1)+'px,'+((e.clientY-(r.top+r.height/2))*.28).toFixed(1)+'px)'});
    el.addEventListener('pointerleave',function(){el.style.transform=''});
  });
})();

/* ================= section titles: word-mask reveal ================= */
$$('h2.title').forEach(function(h){
  var label=h.textContent.trim().replace(/\s+/g,' ');
  if(RMOTION){return}
  var out=[],idx=0;
  Array.prototype.forEach.call(h.childNodes,function(nd){
    var em=nd.nodeType===1&&nd.tagName==='EM', txt=nd.textContent;
    txt.split(/(\s+)/).forEach(function(w){
      if(!w) return; if(/^\s+$/.test(w)){out.push(' ');return}
      var inner='<span class="wi" style="--w:'+(idx++)+'">'+esc(w)+'</span>';
      out.push('<span class="wm">'+(em?'<em>'+inner+'</em>':inner)+'</span>');
    });
  });
  h.setAttribute('aria-label',label); h.innerHTML=out.join('');
  Array.prototype.forEach.call(h.children,function(c){c.setAttribute('aria-hidden','true')});
  h.classList.add('rvT');
});

/* ================= reveal on scroll, staggered ================= */
$$('[data-stagger]').forEach(function(g){Array.prototype.forEach.call(g.children,function(c,i){c.classList.add('rv');c.style.setProperty('--d',(i*90)+'ms')})});
(function(){
  var els=$$('.rv,h2.title.rvT');
  if(!RMOTION&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(el){io.observe(el)});
  } else els.forEach(function(el){el.classList.add('in')});
})();

/* ================= counters ================= */
(function(){
  var cs=$$('.count');if(RMOTION||!('IntersectionObserver' in window))return;
  cs.forEach(function(c){c.textContent=(c.dataset.prefix||'')+'0'});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;io.unobserve(e.target);
    var el=e.target,to=+el.dataset.to,pre=el.dataset.prefix||'',t0=performance.now(),dur=1500;
    (function step(t){var k=Math.min(1,(t-t0)/dur),v=Math.round(to*(1-Math.pow(1-k,3)));el.textContent=pre+v;if(k<1)requestAnimationFrame(step)})(t0);
  })},{threshold:.6});
  cs.forEach(function(c){io.observe(c)});
})();

/* ================= journey steps drive the globe ================= */
(function(){
  var steps=$$('.step'); if(!steps.length) return;
  if(RMOTION||!('IntersectionObserver' in window)){steps.forEach(function(s){s.classList.add('on')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){steps.forEach(function(s){s.classList.remove('on')});e.target.classList.add('on');globeFocus=e.target.dataset.focus||'both'}
  })},{rootMargin:'-42% 0px -48% 0px'});
  steps.forEach(function(s){io.observe(s)});
  steps[0].classList.add('on');
})();

/* ================= header, progress, parallax, timeline line, active nav ================= */
(function(){
  var hdr=$('#hdr'),root=html,tl=$('#steps'),tick=false;
  function upd(){
    tick=false;var y=window.scrollY||0,max=root.scrollHeight-window.innerHeight;
    hdr.classList.toggle('scrolled',y>20);
    root.style.setProperty('--prog',max>0?(y/max).toFixed(4):0);
    if(!RMOTION){
      root.style.setProperty('--sy',y);
      if(tl){var r=tl.getBoundingClientRect(),p=(window.innerHeight*.55-r.top)/r.height;tl.style.setProperty('--p',Math.max(.02,Math.min(1,p)).toFixed(3))}
    }
  }
  window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});
  window.addEventListener('resize',upd);upd();
  var TONES={home:'blue',about:'blue',journey:'blue',education:'blue',experience:'violet',skills:'violet',books:'gold',projects:'blue',interests:'blue',contact:'gold'};
  var links=$$('#nav a'),map={};links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a});
  if('IntersectionObserver' in window){
    var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.remove('on')});var a=map[e.target.id];if(a)a.classList.add('on');root.dataset.tone=TONES[e.target.id]||'blue'}})},{rootMargin:'-45% 0px -50% 0px'});
    $$('main section').forEach(function(s){so.observe(s)});
  }
  var btn=$('#menuBtn'),nav=$('#nav');
  btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
  links.forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');btn.setAttribute('aria-expanded','false')})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.focus()}});
})();

/* ================= projects accordion, copy link, year ================= */
$$('.pj button').forEach(function(b){
  b.addEventListener('click',function(){
    var open=b.getAttribute('aria-expanded')==='true';
    $$('.pj button').forEach(function(x){x.setAttribute('aria-expanded','false')});
    b.setAttribute('aria-expanded',open?'false':'true');
  });
});
(function(){
  var cb=$('#copyLink');
  function done(t){cb.textContent=t;setTimeout(function(){cb.textContent='Copy link to this page'},2200)}
  cb.addEventListener('click',function(){
    var url=location.href.split('#')[0];
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(url).then(function(){done('Link copied')},function(){done('Copy it from the address bar')})}
    else done('Copy it from the address bar');
  });
  var y=$('#yr');if(y)y.textContent=new Date().getFullYear();
})();

/* ================= v4: hero pointer parallax + glass highlight ================= */
(function(){
  var lits=$$('.lit');
  lits.forEach(function(el){
    el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left).toFixed(0)+'px');el.style.setProperty('--my',(e.clientY-r.top).toFixed(0)+'px')},{passive:true});
  });
  var hero=$('#home'), pf=$('#pf');
  if(RMOTION||!CAN_HOVER||!hero||!pf) return;
  var raf=0,px=0,py=0;
  hero.addEventListener('pointermove',function(e){
    var r=hero.getBoundingClientRect();
    px=((e.clientX-r.left)/r.width-.5)*2; py=((e.clientY-r.top)/Math.min(r.height,window.innerHeight)-.5)*2;
    if(!raf)raf=requestAnimationFrame(function(){raf=0;pf.style.setProperty('--px',px.toFixed(3));pf.style.setProperty('--py',py.toFixed(3))});
  },{passive:true});
  hero.addEventListener('pointerleave',function(){pf.style.setProperty('--px',0);pf.style.setProperty('--py',0)});
})();
})();
