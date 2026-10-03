/* ===== PROJECT DATA — edit copy here. All are concepts (no real clients, results or testimonials). ===== */
const PROJECTS = {
 cafe:{title:'Slow Pour',type:'Concept / Brand film',concept:'A café is a feeling before it’s a menu.',desc:'A brand film built from three moments: the person, the machine, the detail. Each scene is paced to feel unhurried. Concept only.',caps:'Film, Design',next:'fitness'},
 fitness:{title:'Reps',type:'Concept / Digital campaign',concept:'Progress is a series of small, repeatable frames.',desc:'One piece of footage, cut into a full social system: story, feed and poster, all tied together by one cold-light palette. Concept only.',caps:'Film, Digital, Design, Strategy',next:'festival'},
 festival:{title:'Open Air',type:'Concept / Event experience',concept:'An event is over in a night. The film is not.',desc:'Event coverage treated as a feature film: scale first, detail second. Concept only.',caps:'Film, Events, Digital',next:'startup'},
 startup:{title:'Launchpad',type:'Concept / Brand + web',concept:'A first product deserves a first impression.',desc:'Identity and a website for an imagined student-founder workspace. The interface is real HTML; try the waitlist form. Concept only.',caps:'Design, Digital, Strategy',next:'retail'},
 retail:{title:'Threadline',type:'Concept / E-commerce',concept:'The shop window, rebuilt as a screen.',desc:'An imagined clothing store: product grid, product page, bag and checkout, plus the mobile view. Fully clickable. Nothing is charged or stored. Concept only.',caps:'Commerce, Digital, Design',next:'cafe'}
};
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGSAP = typeof gsap!=='undefined';

/* ===== VIDEO SYSTEM — assets/video/<name>.mp4 + .webm, assets/posters/<name>.jpg. Poster shows first; video fades in. ===== */
function loadVideo(f){
 const n=f.dataset.video;
 if(!f.dataset.p){f.dataset.p=1;const im=new Image();im.onload=()=>{f.classList.add('poster');f.style.backgroundImage=`url(${im.src})`};im.src=`assets/posters/${n}.jpg`}
 if(f.querySelector('video'))return;
 const v=document.createElement('video');v.muted=true;v.loop=true;v.playsInline=true;v.preload=f.closest('.hero-montage')?'auto':'metadata';v.setAttribute('aria-hidden','true');
 ['mp4','webm'].forEach(t=>{const s=document.createElement('source');s.src=`assets/video/${n}.${t}`;s.type='video/'+t;v.appendChild(s)});
 v.addEventListener('loadeddata',()=>{v.classList.add('ok');if((!f.closest('.hero-montage')||f.classList.contains('active')))v.play().catch(()=>{})});
 f.prepend(v);
}
const vio=new IntersectionObserver(es=>es.forEach(e=>{
  const f=e.target;

  if(e.isIntersecting){
    loadVideo(f);

    const x=f.querySelector('video');

    if(x){
      x.muted=true;
      x.loop=true;
      x.playsInline=true;

      const play=()=>{
          x.play().catch(()=>{});
      };

      if(x.readyState>=3){
        play();
      }else{
        x.addEventListener('loadeddata',play,{once:true});
      }
    }
  }else{
    const x=f.querySelector('video');
    if(x)x.pause();
  }
}),{rootMargin:'300px'});
function regVideos(root){
  root.querySelectorAll('[data-video]').forEach(f=>{
    if(f.closest('.hero-montage'))return;

    if(!f.querySelector('.fb')){
      f.insertAdjacentHTML(
        'beforeend',
        `<div class="fb"><span class="mono">${f.dataset.video}.mp4</span></div>`
      );
    }

    loadVideo(f);
    vio.observe(f);
  });
}
/* ===== INTERFACES — fictional Launchpad site + Threadline store (real HTML, no images/video needed) ===== */
const LP=st=>`<div class="lp"><div class="lp-nav"><b>Launchpad</b><span>Product</span><span>Programs</span><span>Journal</span><span class="lp-btn s">Sign in</span></div>
<div class="lp-hero"><div><p class="lp-k">For first-time founders</p><h4>From idea to first customer.</h4><p class="lp-p">One workspace to test the idea, build the page and find the first ten people who care.</p>
${st?'<div class="lp-form"><span class="lp-in">you@college.edu</span><span class="lp-btn">Join the waitlist</span></div>':'<form class="lp-form"><label class="sr" for="lpe">Email</label><input id="lpe" type="email" required placeholder="you@college.edu"><button class="lp-btn">Join the waitlist</button></form><p class="lp-msg" role="status"></p>'}</div>
<div class="lp-dash"><div class="lp-side"><span class="on">Validate</span><span>Build</span><span>Launch</span></div><div class="lp-main"><h5>Idea check</h5>${[['Who is it for?','Done',100],['What do they do today?','In progress',55],['Would they pay for it?','To do',8]].map(([a,b,c])=>`<div class="lp-row"><span>${a}</span><em>${b}</em><i style="--w:${c}%"></i></div>`).join('')}</div></div></div>
<div class="lp-cols"><div><b>Test it</b><p>Short interviews and a landing page, before any code.</p></div><div><b>Build it</b><p>A starter site and launch assets from one brief.</p></div><div><b>Launch it</b><p>A checklist for your first ten customers.</p></div></div></div>`;

const PR=[{n:'Field Jacket',p:4800,c:'#7d8268',t:'j'},{n:'Heavy Tee',p:1400,c:'#968B78',t:'t'},{n:'Wide Trouser',p:3200,c:'#2b2b29',t:'p'},{n:'Rib Knit',p:2900,c:'#a85c44',t:'t'},{n:'Coach Jacket',p:3900,c:'#3f4a63',t:'j'},{n:'Pleat Trouser',p:3400,c:'#bfb297',t:'p'}];
const SH={t:'M30 10 20 14 6 30 18 42 28 36V108H72V36L82 42 94 30 80 14 70 10Q50 26 30 10Z',j:'M32 8 6 28 12 72 26 68V110H74V68L88 72 94 28 68 8 50 22Z',p:'M28 8H72L80 112H54L50 40 46 112H20Z'};
const DT={t:'M30 10Q50 26 70 10',j:'M50 22V110M30 80H44M56 80H70M30 62V76',p:'M28 16H72M50 40V60'};
const art=x=>`<svg viewBox="0 0 100 120" aria-hidden="true"><path d="${SH[x.t]}" fill="${x.c}"/><path d="${DT[x.t]}" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="1.2"/></svg>`;
const fmt=n=>'₹'+n.toLocaleString('en-IN');
function TL(el,st){
 const S={v:'grid',i:0,sz:null,bag:[],pay:'UPI'},T=st?'span':'button';
 const nav=()=>`<div class="tl-nav"><b>Threadline</b><span>New</span><span>Outer</span><span>Basics</span><${T} class="tl-bag" data-go="bag">Bag ${S.bag.length}</${T}></div>`;
 const tot=()=>S.bag.reduce((a,x)=>a+x.p,0);
 const V={
  grid:()=>`<div class="tl-grid">${PR.map((x,i)=>`<${T} class="tl-card" data-i="${i}"><div class="tl-img">${art(x)}</div><span>${x.n}</span><span>${fmt(x.p)}</span></${T}>`).join('')}</div>`,
  pdp:()=>{const x=PR[S.i];return `<div class="tl-pdp"><div class="tl-img big">${art(x)}</div><div class="tl-info"><button class="tl-link" data-go="grid">← All products</button><h4>${x.n}</h4><p>${fmt(x.p)}</p><span class="tl-l">Size</span><div class="tl-sizes">${['S','M','L','XL'].map(s=>`<button class="${S.sz===s?'on':''}" data-size="${s}" aria-pressed="${S.sz===s}">${s}</button>`).join('')}</div><button class="tl-cta" data-add ${S.sz?'':'aria-disabled="true"'}>${S.sz?'Add to bag':'Choose a size'}</button></div></div>`},
  bag:()=>S.bag.length?`<div class="tl-pane"><h4>Your bag</h4>${S.bag.map(x=>`<div class="tl-line"><span>${x.n} · ${x.sz}</span><span>${fmt(x.p)}</span></div>`).join('')}<div class="tl-line"><b>Total</b><b>${fmt(tot())}</b></div><button class="tl-cta" data-go="pay">Checkout</button><button class="tl-link" data-go="grid">Keep browsing</button></div>`:`<div class="tl-pane"><h4>Your bag is empty</h4><button class="tl-cta" data-go="grid">Shop the range</button></div>`,
  pay:()=>`<div class="tl-pane"><h4>Checkout</h4><span class="tl-l">Pay with</span><div class="tl-chips">${['UPI','Card','Cash on delivery'].map(m=>`<button class="${S.pay===m?'on':''}" data-pay="${m}" aria-pressed="${S.pay===m}">${m}</button>`).join('')}</div><div class="tl-line"><b>Total</b><b>${fmt(tot())}</b></div><button class="tl-cta" data-go="done">Place demo order</button></div>`,
  done:()=>`<div class="tl-pane"><h4>Order placed.</h4><p>This is a concept. Nothing was charged or saved.</p><button class="tl-cta" data-go="grid">Back to the shop</button></div>`
 };
 const draw=()=>{el.innerHTML=st?nav()+V.grid():nav()+V[S.v]()};
 if(!st)el.onclick=e=>{const t=e.target.closest('[data-go],[data-i],[data-size],[data-add],[data-pay]');if(!t)return;const d=t.dataset;
  if(d.i!==undefined){S.i=+d.i;S.sz=null;S.v='pdp'}else if(d.size)S.sz=d.size;else if('add' in d){if(!S.sz)return;S.bag.push({...PR[S.i],sz:S.sz});S.v='bag'}else if(d.pay)S.pay=d.pay;else{S.v=d.go;if(S.v==='done')S.bag=[]}
  draw();el.querySelector('.tl-cta,.tl-card')?.focus?.({preventScroll:true})};
 draw();
}
const PH=()=>`<div class="ph-in"><div class="tl-nav" style="padding:0 0 .8em"><b style="font-size:1em">Threadline</b><span>Bag 0</span></div><div class="tl-grid two">${PR.slice(0,4).map(x=>`<div class="tl-card"><div class="tl-img">${art(x)}</div><span>${x.n}</span><span>${fmt(x.p)}</span></div>`).join('')}</div><div class="ph-bar">Add to bag</div></div>`;

function mountUI(root){root.querySelectorAll('[data-ui]').forEach(el=>{
 const st=!!el.closest('.open'),u=el.dataset.ui;
 if(u==='lp'){el.innerHTML=LP(st);const f=el.querySelector('form');if(f)f.onsubmit=e=>{e.preventDefault();el.querySelector('.lp-msg').textContent='You’re on the demo list. Nothing was saved.';f.reset()}}
 if(u==='tl'){const w=document.createElement('div');w.className='tl';el.appendChild(w);TL(w,st)} if(u==='phone')el.innerHTML=PH();
})}
const FB=(n,pos,cls='')=>`<div class="frame ${cls}" data-video="${n}"${pos?` data-pos="${pos}"`:''}></div>`;
const BF=(u,inner)=>`<div class="bf-scroll"><div class="bf"><div class="bf-bar"><i></i><i></i><i></i><span>${u}</span></div><div class="sc" data-ui="${inner}"></div></div></div>`;
/* ===== CASE STUDY STAGES — each project is built around its best medium ===== */
const STAGE={
 cafe:()=>`<div class="scenes">${[['cafe-barista','Scene 1 / The person'],['cafe-espresso','Scene 2 / The machine'],['cafe-detail','Scene 3 / The detail']].map(([n,l])=>`<div class="scene">${FB(n,'','pt')}<span class="mono">${l}</span></div>`).join('')}</div>`,
 fitness:()=>`${FB('fitness','62% 50%','wide')}<div class="pal mono"><span><i style="background:#0B0B0A"></i>Ink</span><span><i style="background:#5FD3E6"></i>Cold light</span><span><i style="background:#EFEBE4"></i>Paper</span></div>
  <div class="sys"><div class="ig story frame" data-video="fitness" data-pos="62% 50%"><div class="ov"><span class="mono">Story</span><b>Show up.</b></div></div>
  <div class="col"><div class="ig post frame" data-video="fitness" data-pos="30% 50%"><div class="ov"><span class="mono">Feed</span><b>Reps over rep counts.</b></div></div><div class="ig tcard"><span class="mono">Feed / Day 01</span><b>REPS</b></div></div>
  <div class="ig tposter"><span class="mono">Poster</span><b>Monday starts here.</b><span class="mono">Reps / Concept</span></div></div>`,
 festival:()=>`${FB('festival','','wide')}<div class="facts"><div><h3>Event film</h3><p>A feature-length feel for a single night.</p></div><div><h3>Promo cuts</h3><p>Short edits built from the same footage.</p></div><div><h3>Digital companion</h3><p>A live page for people on the ground and at home.</p></div></div>`,
 startup:()=>`<p class="mono try">Interactive: try the waitlist form</p>${BF('launchpad.example','lp')}`,
 retail:()=>`<p class="mono try">Interactive: open a product, pick a size, add to bag, check out</p><div class="tlwrap">${BF('threadline.example','tl')}<div class="phone" data-ui="phone"></div></div>`
};

/* ===== NAV ===== */
const mb=document.querySelector('.menu-btn'),nl=document.getElementById('links');
mb.onclick=()=>{const o=nl.classList.toggle('open');mb.setAttribute('aria-expanded',o);mb.textContent=o?'Close':'Menu'};
nl.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nl.classList.remove('open');mb.textContent='Menu'}));

/* ===== CASE STUDY — the tile expands to full screen from its own position ===== */
const cs=document.getElementById('cs'),stage=document.getElementById('cs-stage');let opener=null;
function openCS(key,rect){
 const p=PROJECTS[key];
 cs.querySelector('#cs-title').textContent=p.title;cs.querySelector('#cs-type').textContent=p.type;
 cs.querySelector('#cs-concept').textContent=p.concept;cs.querySelector('#cs-desc').textContent=p.desc;cs.querySelector('#cs-caps').textContent='Capabilities: '+p.caps;
 const nx=cs.querySelector('#cs-next');nx.textContent='Next project: '+PROJECTS[p.next].title;nx.dataset.k=p.next;
 stage.querySelectorAll('video').forEach(v=>v.pause());stage.innerHTML=STAGE[key]();regVideos(stage);mountUI(stage);
 cs.hidden=false;cs.scrollTop=0;document.body.style.overflow='hidden';
 if(hasGSAP&&!RM&&rect){const t=rect.top,l=rect.left,r=innerWidth-rect.right,b=innerHeight-rect.bottom;
  gsap.fromTo(cs,{clipPath:`inset(${t}px ${r}px ${b}px ${l}px)`},{clipPath:'inset(0px 0px 0px 0px)',duration:.9,ease:'power3.inOut'});
  gsap.from('.cs-head > *',{y:30,opacity:0,stagger:.08,delay:.45,duration:.6,ease:'power2.out'});
 }
 cs.querySelector('.cs-back').focus();history.pushState({cs:key},'');
}
function closeCS(fromPop){
 const done=()=>{cs.hidden=true;stage.innerHTML='';document.body.style.overflow='';if(hasGSAP)gsap.set(cs,{clearProps:'clipPath'});opener?.focus()};
 if(hasGSAP&&!RM)gsap.to(cs,{clipPath:'inset(50% 0% 50% 0%)',duration:.6,ease:'power3.inOut',onComplete:done});else done();
 if(!fromPop&&history.state?.cs)history.back();
}
document.querySelectorAll('.p').forEach(p=>p.querySelector('.open').addEventListener('click',e=>{opener=e.currentTarget;openCS(p.dataset.project,opener.getBoundingClientRect())}));
cs.querySelector('.cs-back').onclick=()=>closeCS();
document.getElementById('cs-next').onclick=e=>openCS(e.currentTarget.dataset.k,null);
addEventListener('keydown',e=>{if(e.key==='Escape'&&!cs.hidden)closeCS()});
addEventListener('popstate',()=>{if(!cs.hidden)closeCS(true)});
regVideos(document);mountUI(document);

/* ===== HERO MONTAGE — five stacked frames, one video each. JS toggles .active / .incoming.
   Order: barista > espresso > fitness > festival > detail > repeat. ~2.2s per shot, 0.8s crossfade. ===== */
(function initHero(){
 const m=document.querySelector('.hero-montage');if(!m)return;
 const heroFrames=[...m.querySelectorAll('.hero-media')];

const firstHeroFrame=heroFrames[0];
loadVideo(firstHeroFrame);

const firstHeroVideo=firstHeroFrame?.querySelector('video');

if(firstHeroVideo){
  firstHeroVideo.muted=true;
  firstHeroVideo.playsInline=true;

  const startHero=()=>{
    firstHeroVideo.play().catch(err=>{
      console.warn('NOMORA hero autoplay:',err);
    });
  };

  if(firstHeroVideo.readyState>=3){
    startHero();
  }else{
    firstHeroVideo.addEventListener('loadeddata',startHero,{once:true});
  }
}
 const fr=[...m.querySelectorAll('.hero-media')];
const N=fr.length;
const HOLD=2200;
const FADE=800;

let cur=0;
let t=null;
let tok=0;
let inView=true;

const V=f=>f?.querySelector('video');

function waitReady(f){
  return new Promise(resolve=>{
    loadVideo(f);

    const v=V(f);

    if(!v){
      resolve(null);
      return;
    }

    if(v.readyState>=3){
      resolve(v);
      return;
    }

    let done=false;

    const finish=()=>{
      if(done)return;
      done=true;
      v.removeEventListener('canplay',finish);
      v.removeEventListener('loadeddata',finish);
      clearTimeout(timeout);
      resolve(v);
    };

    const timeout=setTimeout(finish,5000);

    v.addEventListener('canplay',finish);
    v.addEventListener('loadeddata',finish);
  });
}

function schedule(ms){
  clearTimeout(t);
  t=setTimeout(step,ms);
}

async function step(){
  if(!inView)return;

  const my=++tok;
  const nextIndex=(cur+1)%N;
  const current=fr[cur];
  const next=fr[nextIndex];

  const nextVideo=await waitReady(next);

  if(my!==tok || !inView || !nextVideo)return;

  nextVideo.muted=true;
  nextVideo.playsInline=true;

  nextVideo.play().catch(err=>{
    console.warn('NOMORA next hero video:',err);
  });

  next.classList.add('incoming');

  t=setTimeout(()=>{
    if(my!==tok)return;

    next.classList.remove('incoming');
    current.classList.remove('active');
    V(current)?.pause();

    next.classList.add('active');
    cur=nextIndex;

    schedule(HOLD);
  },FADE);
}

function stop(){
  tok++;
  clearTimeout(t);

  fr.forEach(f=>{
    f.classList.remove('incoming');
  });

  V(fr[cur])?.pause();
}

function resume(){
  if(!inView)return;

  const v=V(fr[cur]);

  if(v){
    v.muted=true;
    v.playsInline=true;
    v.play().catch(()=>{});
  }

  schedule(HOLD);
}

{
  schedule(HOLD);

  new IntersectionObserver(entries=>{
    const visible=entries[0]?.isIntersecting;

    if(visible===inView)return;

    inView=visible;

    if(inView){
      resume();
    }else{
      stop();
    }
  },{threshold:.1}).observe(m);

  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){
      stop();
    }else if(inView){
      resume();
    }
  });
}
})();
/* ===== MOTION — hero entrance, text rises, frame reveals, cursor on wordmark, magnetic CTA ===== */
if(hasGSAP&&!RM){
 gsap.registerPlugin(ScrollTrigger);
 gsap.from('.hero .wordmark',{yPercent:30,opacity:0,duration:.9,ease:'power3.out'});
 gsap.from('.hero-foot > *',{opacity:0,y:12,duration:.7,delay:.3,stagger:.1});
 gsap.to('.hero-montage',{yPercent:8,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
 const wm=document.querySelector('.hero .wordmark');
 addEventListener('pointermove',e=>{const x=e.clientX/innerWidth,y=e.clientY/innerHeight;
  wm.style.fontVariationSettings=`'wdth' ${75+x*25}`;wm.style.fontWeight=500+Math.round(y*250);
  gsap.to('.hero-montage',{x:(x-.5)*-24,duration:1,ease:'power2.out',overwrite:'auto'})});
 gsap.utils.toArray('.rise').forEach(el=>gsap.from(el,{y:40,opacity:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%'}}));
 gsap.utils.toArray('.p .frame,.p .bf').forEach(f=>gsap.from(f,{clipPath:'inset(0 0 100% 0)',duration:1.1,ease:'power3.inOut',scrollTrigger:{trigger:f,start:'top 88%'}}));
 gsap.to('.trip .pt:nth-child(2)',{yPercent:-6,ease:'none',scrollTrigger:{trigger:'.p1',scrub:true}});
 gsap.to('.trip .pt:nth-child(3)',{yPercent:-12,ease:'none',scrollTrigger:{trigger:'.p1',scrub:true}});
 document.querySelectorAll('#links a').forEach(a=>{const t=document.querySelector(a.getAttribute('href'));
  ScrollTrigger.create({trigger:t,start:'top 50%',end:'bottom 50%',onToggle:s=>a.classList.toggle('on',s.isActive)})});
 document.querySelectorAll('.mag').forEach(b=>{
  b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.2,y:(e.clientY-r.top-r.height/2)*.3,duration:.3})});
  b.addEventListener('pointerleave',()=>gsap.to(b,{x:0,y:0,duration:.5,ease:'elastic.out(1,.5)'}))});
}
