// THEME
const themeBtn=document.getElementById('themeBtn'),html=document.documentElement;
const stored=localStorage.getItem('theme')||'dark';
html.setAttribute('data-theme',stored);
updateIcon(stored);
function updateIcon(t){themeBtn.innerHTML=t==='dark'?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>';}
themeBtn.addEventListener('click',()=>{
  const c=html.getAttribute('data-theme'),n=c==='dark'?'light':'dark';
  html.setAttribute('data-theme',n);localStorage.setItem('theme',n);updateIcon(n);
});

// NAVBAR SHRINK
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>navbar.classList.toggle('scrolled',window.scrollY>60));

// HAMBURGER
const hamburger=document.getElementById('hamburger'),mobileMenu=document.getElementById('mobileMenu');
hamburger.addEventListener('click',()=>{
  hamburger.classList.toggle('active');mobileMenu.classList.toggle('open');
  document.body.style.overflow=mobileMenu.classList.contains('open')?'hidden':'';
});
document.querySelectorAll('.mob-link').forEach(l=>l.addEventListener('click',()=>{
  hamburger.classList.remove('active');mobileMenu.classList.remove('open');document.body.style.overflow='';
}));

// TYPING
const phrases=['UI/UX Enthusiast','Open Source Contributor','Problem Solver'];
let pi=0,ci=0,del=false;
const tyEl=document.getElementById('typing-text');
function typeLoop(){
  const cur=phrases[pi];
  if(!del){tyEl.textContent=cur.slice(0,++ci);if(ci===cur.length){del=true;setTimeout(typeLoop,1800);return;}}
  else{tyEl.textContent=cur.slice(0,--ci);if(ci===0){del=false;pi=(pi+1)%phrases.length;}}
  setTimeout(typeLoop,del?50:85);
}
typeLoop();

// SCROLL REVEAL
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});
},{threshold:0.12});
document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.stagger,.t-item,.proj-card').forEach(el=>obs.observe(el));

// SKILL BARS
const barObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.querySelectorAll('.skill-bar-fill').forEach(b=>b.style.width=b.dataset.width+'%');});
},{threshold:0.3});
document.querySelectorAll('.skill-bars').forEach(el=>barObs.observe(el));

// TABS
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.skill-group').forEach(g=>g.classList.remove('active'));
    btn.classList.add('active');
    const g=document.getElementById('tab-'+btn.dataset.tab);
    g.classList.add('active');
    g.querySelectorAll('.skill-bar-fill').forEach(b=>{b.style.width='0';setTimeout(()=>b.style.width=b.dataset.width+'%',60);});
    const st=g.querySelector('.stagger');if(st){st.classList.remove('visible');setTimeout(()=>st.classList.add('visible'),60);}
  });
});

// COUNTER
const cntObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('[data-count]').forEach(el=>{
        const t=+el.dataset.count;let c=0;
        const s=Math.ceil(t/30);
        const ti=setInterval(()=>{c=Math.min(c+s,t);el.textContent=c+'+';if(c>=t)clearInterval(ti);},40);
      });
      cntObs.unobserve(e.target);
    }
  });
},{threshold:0.4});
const sr=document.querySelector('.stats-row');if(sr)cntObs.observe(sr);

// PARALLAX
window.addEventListener('scroll',()=>{
  const sc=window.scrollY;
  document.querySelectorAll('.p-blob').forEach((b,i)=>b.style.transform=`translateY(${sc*(0.05+i*0.02)}px)`);
  const g=document.getElementById('heroGrid');if(g)g.style.transform=`translateY(${sc*0.25}px)`;
});

// RIPPLE
document.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('click',function(e){
    const r=this.getBoundingClientRect();
    this.style.setProperty('--rx',(e.clientX-r.left)+'px');
    this.style.setProperty('--ry',(e.clientY-r.top)+'px');
    this.classList.remove('ripple');void this.offsetWidth;this.classList.add('ripple');
    setTimeout(()=>this.classList.remove('ripple'),700);
  });
});

// FORM VALIDATION
document.getElementById('contactForm').addEventListener('submit',function(e){
  e.preventDefault();let valid=true;
  const fields=[
    {id:'fname',err:'err-fname',msg:'Nama tidak boleh kosong.'},
    {id:'femail',err:'err-femail',msg:'Email tidak valid.',type:'email'},
    {id:'fsubject',err:'err-fsubject',msg:'Subjek tidak boleh kosong.'},
    {id:'fmsg',err:'err-fmsg',msg:'Pesan tidak boleh kosong.'},
  ];
  fields.forEach(f=>{
    const inp=document.getElementById(f.id),errEl=document.getElementById(f.err);
    inp.classList.remove('error');errEl.textContent='';
    const v=inp.value.trim();
    let ok=v.length>0;
    if(f.type==='email')ok=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if(!ok){inp.classList.add('error');errEl.textContent=f.msg;valid=false;}
  });
  if(valid){
    const btn=document.getElementById('submitBtn');
    btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Mengirim...';btn.disabled=true;
    setTimeout(()=>{
      btn.innerHTML='<i class="fas fa-check"></i> Terkirim!';
      document.getElementById('formSuccess').style.display='block';
      document.getElementById('contactForm').reset();
      setTimeout(()=>{
        btn.innerHTML='<i class="fas fa-paper-plane"></i> Kirim Pesan';btn.disabled=false;
        document.getElementById('formSuccess').style.display='none';
      },3500);
    },1200);
  }
});

// Initial bars for visible tab
setTimeout(()=>document.querySelectorAll('#tab-frontend .skill-bar-fill').forEach(b=>b.style.width=b.dataset.width+'%'),600);

// Image lazy fade simulation
document.querySelectorAll('img[loading="lazy"]').forEach(img=>{
  img.style.opacity='0';img.style.transition='opacity 0.5s';
  img.addEventListener('load',()=>img.style.opacity='1');
  if(img.complete)img.style.opacity='1';
});