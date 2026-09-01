/* teambeam.in generator — zero dependencies. Run: node build.js
 * Phase 1a: shell (header/footer/logo/schema) + home + utility files.
 * All JSON-LD is built from objects via JSON.stringify and re-validated at build end. */
const fs = require('fs');
const path = require('path');
const CFG = require('./theme.config.js');

const ROOT = __dirname, OUT = path.join(ROOT,'site'), ASSETS = path.join(ROOT,'assets');
const BUILD_ID = Date.now();
const YEAR = new Date().getFullYear();

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const attr = s => String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;');

/* ---- top-level navigation (Phase 1a: anchors to home sections; becomes a full mega-menu with inner pages in 1b) ---- */
/* Pages that exist in this build. Grows every batch, so nav links light up progressively. */
const BUILT = new Set(['/','/what-we-do','/why-teambeam','/who-we-serve',
  '/team-experiences','/impact-csr','/development-facilitation','/offsites-retreats','/beam-occasions','/beam-journeys','/beam-platform','/self-serve-kits','/destinations',
  '/resources','/resources-tools-offsite-roi-calculator','/resources-tools-team-health-snapshot','/resources-tools-idea-generator',
  '/about','/careers','/partnerships','/contact',
  '/why-teambeam-the-method','/why-teambeam-measurement-impact','/why-teambeam-results',
  '/occasions','/volunteer','/privacy','/terms','/accessibility']);
const NAVGROUPS = [
  {label:'What we do', slug:'/what-we-do', anchor:'#what', items:[
    ['Team Experiences','/team-experiences'],['Impact & CSR','/impact-csr'],['Development & Facilitation','/development-facilitation'],
    ['Offsites & Retreats','/offsites-retreats'],['Beam Occasions','/beam-occasions'],['Beam Journeys','/beam-journeys'],
    ['The Beam Platform','/beam-platform'],['Self-Serve & Kits','/self-serve-kits']]},
  {label:'How we work', slug:'/why-teambeam', anchor:'#how', items:[
    ['The method','/why-teambeam-the-method'],['Measurement & proof','/why-teambeam-measurement-impact'],['Results','/why-teambeam-results']]},
  {label:"Who it's for", slug:'/who-we-serve', anchor:'#who', items:[
    ['By role','/who-we-serve#roles'],['By industry','/who-we-serve#industries'],['By moment','/who-we-serve#moments']]},
  {label:'Where we go', slug:'/destinations', anchor:'#where', items:[
    ['India destinations','/destinations#india'],['Nearby Asia','/destinations#asia'],['Worldwide','/destinations#worldwide']]},
  {label:'Tools', slug:'/resources', anchor:'#tools', items:[
    ['ROI calculator','/resources-tools-offsite-roi-calculator'],['Team Health Snapshot','/resources-tools-team-health-snapshot'],['Idea Generator','/resources-tools-idea-generator']]},
  {label:'About', slug:'/about', anchor:'#principles', items:[['Our story','/about'],['Careers','/careers'],['Partners','/partnerships']]}
];
const resolve = (slug,anchor)=> BUILT.has(slug) ? slug : ('/'+(anchor||''));

/* ---- JSON-LD (always via stringify) ---- */
function orgNode(){
  return { '@type':'Organization', name:'TeamBeam Outings', url:CFG.origin, email:CFG.email,
    telephone:CFG.phone,
    address:{'@type':'PostalAddress',streetAddress:'Futura, Magarpatta Rd, Kirtane Baugh, Magarpatta, Hadapsar',addressLocality:'Pune',addressRegion:'Maharashtra',postalCode:'411013',addressCountry:'IN'},
    geo:{'@type':'GeoCoordinates',latitude:CFG.geo.lat,longitude:CFG.geo.lng},
    areaServed:['India','Worldwide'],
    description:'TeamBeam Outings designs, delivers and measures corporate team experiences. Diagnostic-first design and Day 14/30/60 measurement. One business, two homes — India and the USA.',
    sameAs:[CFG.homes.us, CFG.homes.blog, ...Object.values(CFG.social)] };
}
function ld(obj){const s=JSON.stringify(obj);JSON.parse(s);return `<script type="application/ld+json">${s}</script>`;}

/* ---- shell ---- */
function head(p){
  const url = CFG.origin + p.path;
  const usAlt = CFG.homes.us + p.path;
  const graph = {'@context':'https://schema.org','@graph':[orgNode(), ...(p.nodes||[])]};
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${attr(p.desc)}">
<meta name="ai-summary" content="${attr(p.ai||p.desc)}">
${p.keywords?`<meta name="keywords" content="${attr(p.keywords)}">`:''}
<link rel="canonical" href="${attr(url)}">
<link rel="alternate" hreflang="en-IN" href="${attr(url)}">
<link rel="alternate" hreflang="en-US" href="${attr(usAlt)}">
<link rel="alternate" hreflang="x-default" href="${attr(url)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#0D2137">
<meta name="geo.region" content="${CFG.geo.region}">
<meta name="geo.placename" content="${CFG.geo.place}">
<meta name="geo.position" content="${CFG.geo.lat};${CFG.geo.lng}">
<meta name="ICBM" content="${CFG.geo.lat}, ${CFG.geo.lng}">
<meta name="twitter:site" content="${CFG.twitter}">
<meta name="twitter:creator" content="${CFG.twitter}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="TeamBeam Outings">
<meta property="og:title" content="${attr(p.title)}">
<meta property="og:description" content="${attr(p.desc)}">
<meta property="og:url" content="${attr(url)}">
<meta property="og:image" content="${attr(CFG.origin)}/assets/img/og-default.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(p.title)}">
<meta name="twitter:description" content="${attr(p.desc)}">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/Fraunces.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/Mukta-R.woff2" crossorigin>
<link rel="stylesheet" href="/assets/styles.css?v=${BUILD_ID}">
${ld(graph)}
</head>
<body class="${p.body||''}">
<a class="skip" href="#main">Skip to content</a>
${header()}
<main id="main">`;
}

function wordmark(cls){
  return `<a class="brand ${cls||''}" href="/" aria-label="TeamBeam Outings home">
    <span class="brand__mark" aria-hidden="true">&#923;</span>
    <span class="brand__word">TEAM<b>BEAM</b></span>
    <span class="brand__sub">OUTINGS</span>
  </a>`;
}

function header(){
  const link = (l,s,hub)=>`<a href="${BUILT.has(s.split('#')[0])?s:hub}">${esc(l)}</a>`;
  const links = NAVGROUPS.map(g=>{
    const hub = resolve(g.slug,g.anchor);
    const kids = g.items.map(([l,s])=>link(l,s,hub)).join('');
    return `<div class="navitem has-mega">
      <button class="megabtn" aria-expanded="false">${esc(g.label)} <span aria-hidden="true">&#9662;</span></button>
      <div class="mega"><a class="mega__all" href="${hub}">${esc(g.label)} overview</a>${kids}</div>
    </div>`;
  }).join('');
  const drawer = NAVGROUPS.map(g=>{
    const hub = resolve(g.slug,g.anchor);
    const kids = g.items.map(([l,s])=>link(l,s,hub)).join('');
    return `<details><summary>${esc(g.label)}</summary><div class="draw-sub"><a href="${hub}">${esc(g.label)} overview</a>${kids}</div></details>`;
  }).join('');
  return `<header class="nav" id="nav">
  <div class="nav__in">
    ${wordmark()}
    <nav class="nav__links" aria-label="Primary">${links}</nav>
    <div class="nav__right">
      <div class="switch" role="group" aria-label="Choose region">
        <span class="switch__on" aria-current="true">IN</span>
        <a href="${CFG.homes.us}" aria-label="United States site">US</a>
      </div>
      <a class="nav__insights" href="${CFG.homes.blog}">Insights <span aria-hidden="true">&#8599;</span></a>
      <a class="cta cta--sm" href="#talk">Talk to us</a>
    </div>
    <button class="burger" aria-label="Open menu" aria-expanded="false" aria-controls="drawer"><span></span><span></span><span></span></button>
  </div>
  <div class="beam" aria-hidden="true"></div>
</header>
<div class="drawer" id="drawer">
  ${drawer}
  <div class="drawer__foot">
    <div class="switch"><span class="switch__on">India</span><a href="${CFG.homes.us}">United States</a></div>
    <a class="nav__insights" href="${CFG.homes.blog}">Insights <span aria-hidden="true">&#8599;</span></a>
    <a class="cta" href="#talk">Talk to us</a>
  </div>
</div>`;
}

function contactBits(){
  const mail = `<a href="mailto:${CFG.email}">${CFG.email}</a>`;
  const tel = CFG.phone ? ` · <a href="tel:${CFG.phone.replace(/[^+\d]/g,'')}">${esc(CFG.phone)}</a>` : '';
  return mail + tel;
}

function footer(){
  const soc = Object.entries(CFG.social).map(([n,u])=>`<a href="${attr(u)}" rel="noopener" aria-label="${esc(n)}">${esc(n)}</a>`).join('');
  return `</main>
<footer class="foot">
  <div class="foot__beam" aria-hidden="true"></div>
  <div class="foot__strip">
    <div class="switch"><span class="switch__on">India</span><a href="${CFG.homes.us}">United States</a></div>
    <a class="foot__insights" href="${CFG.homes.blog}">Insights — the thinking behind the method <span aria-hidden="true">&#8599;</span></a>
  </div>
  <div class="foot__grid">
    <div class="foot__brand">
      ${wordmark('brand--foot')}
      <p class="foot__line">Corporate team experiences — designed, delivered and measured. India &amp; worldwide.</p>
      <p class="foot__contact"><a href="mailto:${CFG.email}">${CFG.email}</a><br><a href="tel:${CFG.phone.replace(/[^+\d]/g,'')}">${esc(CFG.phone)}</a></p>
      <p class="foot__addr"><a href="${CFG.mapsUrl}" rel="noopener">${esc(CFG.address)}</a></p>
    </div>
    <nav class="foot__col" aria-label="Explore"><h3>Explore</h3>
      <a href="/what-we-do">What we do</a><a href="/why-teambeam">How we work</a><a href="/who-we-serve">Who it's for</a><a href="/destinations">Where we go</a><a href="/resources">Tools</a></nav>
    <nav class="foot__col" aria-label="What we do"><h3>What we do</h3>
      <a href="/team-experiences">Team Experiences</a><a href="/offsites-retreats">Offsites &amp; Retreats</a><a href="/development-facilitation">Development</a><a href="/impact-csr">Impact &amp; CSR</a><a href="/beam-occasions">Occasions</a><a href="/self-serve-kits">Self-Serve &amp; Kits</a></nav>
    <nav class="foot__col" aria-label="Tools & Company"><h3>Tools &amp; company</h3>
      <a href="/resources-tools-offsite-roi-calculator">ROI calculator</a><a href="/resources-tools-team-health-snapshot">Team Health Snapshot</a><a href="/about">About</a><a href="/careers">Careers</a><a href="/partnerships">Partners</a><a href="/contact">Contact</a></nav>
  </div>
  <div class="foot__bottom">
    <div class="foot__soc">${soc}</div>
    <div class="foot__law"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/accessibility">Accessibility</a></div>
    <span class="foot__cr">&copy; ${YEAR} TeamBeam Outings · one business, two homes</span>
    <a class="foot__top" href="#top">Back to top &#8593;</a>
  </div>
</footer>
<script>
(function(){
  var b=document.querySelector('.burger'),d=document.getElementById('drawer');
  function close(){d.classList.remove('open');b.classList.remove('open');b.setAttribute('aria-expanded','false');}
  if(b&&d){
    b.addEventListener('click',function(){var o=!d.classList.contains('open');d.classList.toggle('open',o);b.classList.toggle('open',o);b.setAttribute('aria-expanded',String(o));});
    d.querySelectorAll('a').forEach(function(l){l.addEventListener('click',close);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  }
  document.querySelectorAll('.megabtn').forEach(function(btn){
    var mega=btn.parentElement;
    btn.addEventListener('click',function(e){e.stopPropagation();var o=btn.getAttribute('aria-expanded')==='true';
      document.querySelectorAll('.megabtn[aria-expanded="true"]').forEach(function(x){if(x!==btn){x.setAttribute('aria-expanded','false');x.parentElement.classList.remove('open');}});
      btn.setAttribute('aria-expanded',String(!o));mega.classList.toggle('open',!o);});
  });
  document.addEventListener('click',function(e){if(!e.target.closest('.has-mega'))document.querySelectorAll('.megabtn[aria-expanded="true"]').forEach(function(x){x.setAttribute('aria-expanded','false');x.parentElement.classList.remove('open');});});
})();
</script>
</body></html>`;
}

/* ---- home ---- */
function homePage(){
  const nodes = [
    {'@type':'WebSite', name:'TeamBeam Outings', url:CFG.origin+'/'},
    {'@type':'FAQPage', mainEntity:[
      {'@type':'Question',name:'What does TeamBeam Outings do?',acceptedAnswer:{'@type':'Answer',text:'We design, deliver and measure corporate team experiences — team days, offsites and retreats, and occasions — built around a diagnosis of what a team needs, and measured at Day 14, 30 and 60 so the change can be shown.'}},
      {'@type':'Question',name:'How is TeamBeam different from a team-building vendor?',acceptedAnswer:{'@type':'Answer',text:'We read a team before we design for it, and we measure what changed afterwards. The result is a defensible change in how a team works, not just an enjoyable day.'}}
    ]}
  ];
  const off = [
    ['Team experiences','Focused experiences that build the specific thing a team is missing — from a few hours to a full day.'],
    ['Offsites &amp; retreats','Multi-day offsites and retreats, sourced, planned and run end to end, in India and worldwide.'],
    ['Occasions','Marking the moments that matter — inclusively, and with meaning.'],
    ['Delivery modes','In your office, away together, or online — designed for how your team actually works.']
  ];
  const who = [
    ['By role','CXOs and boards · HR and People leaders · team and business-unit leaders.'],
    ['By industry','Technology · financial services · healthcare · manufacturing · GCCs · and more.'],
    ['By moment','Onboarding · offsites · milestones · restructures and resets.']
  ];
  const principles = [
    ['We read before we design.','A day is only useful if it fits the team it is built for.'],
    ['We measure what we deliver.','The change should be something you can show, not something to take on faith.'],
    ['We keep it honest.','No forced fun. Calm, real, and built for grown-ups.'],
    ['One team, wherever you are.','India or the other side of the world — the same practice, the same people.']
  ];
  return head({
    body:'home', path:'/', title:'TeamBeam Outings — corporate team experiences, designed, delivered and measured',
    desc:'TeamBeam Outings designs, delivers and measures corporate team experiences across India and worldwide — team days, offsites and retreats, and occasions, built around what a team needs and measured at Day 14, 30 and 60.',
    ai:'TeamBeam Outings is a corporate team-experience company serving India and worldwide (with a US home at teambeam.us). It designs experiences around a diagnosis of a team\u2019s needs, delivers them, and measures the change at Day 14, 30 and 60.',
    keywords:'corporate team experiences, team offsite India, team building measurement, corporate retreat, team health',
    nodes
  }) + `
  <span id="top"></span>
  <section class="hero">
    <p class="eyebrow">Corporate team experiences · India &amp; worldwide</p>
    <h1 class="hero__h">We build teams.<br>And we <span class="grad">prove it.</span></h1>
    <p class="hero__sub">We design experiences around what a team actually needs, deliver them with care, and measure what changed. One practice, at home in India and across the world.</p>
    <div class="hero__cta"><a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/why-teambeam">How we work</a></div>
  </section>

  ${secNarrative({eyebrow:'The honest problem',h:'You spend the budget. Everyone has an okay time. Then nothing changes.',paras:[
    'It is a familiar story. A team books an outing, people show up, there is food and a few games, and by the next week it is a photo on a group chat. The teams that needed to talk still do not talk. The new joiners still feel like guests.',
    'The problem is not the activity. It is that the activity was never tied to anything, and nobody looked at whether it worked. So the next year you do it again, a little bigger, and hope. That is a great deal of money to spend on hope.'
  ]})}

  ${secNarrative({eyebrow:'A better order of operations',h:'Understand the team first. Then design the day. Then check it worked.',paras:[
    'Before we suggest a single activity, we look at how your team is really doing — where trust is thin, where communication breaks, what the team itself says it needs. That reading shapes everything after.',
    'Then we build a day around it, run it well, and come back at Day 14, 30 and 60 to see what shifted. You end up with proof, not just a good memory. That is the whole idea behind TeamBeam.'
  ]})}

  <section class="strip" id="what">
    <div class="sec-head"><span class="eyebrow">What we do</span><h2>Experiences built around a team, not a catalogue.</h2></div>
    <div class="cards">${off.map(([t,d])=>`<div class="card"><span class="card__edge"></span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  </section>

  <section class="strip strip--tint" id="how">
    <div class="sec-head"><span class="eyebrow">How we work</span><h2>A method, not a menu.</h2>
      <p class="lead">We read a team before we design for it, and we measure what moved afterwards — at Day 14, 30 and 60. That is the whole difference between a good day and a change that holds.</p></div>
    <div class="method">${['Scan','Design','Build','Deliver','Measure'].map(s=>`<span>${s}</span>`).join('')}</div>
  </section>

  ${secFeatureList({eyebrow:'What we read',h:'The eight dimensions of a healthy team.',lead:'Underneath every experience is a reading of the team across eight dimensions. It is the vocabulary that turns \u201cthe team feels off\u201d into something you can design for — and measure.',items:[
    {h:'Trust',p:'Whether people can admit a mistake, ask for help, and disagree without it costing them.'},
    {h:'Communication',p:'Whether the important things get said — including the hard ones — and whether they land.'},
    {h:'Alignment',p:'Whether everyone is genuinely pointed at the same thing, not just busy.'},
    {h:'Collaboration',p:'Whether people build on each other\u2019s work or run in parallel lanes.'},
    {h:'Decision-making',p:'Whether the team can decide and stay decided, rather than reopening everything.'},
    {h:'Energy',p:'Whether the team has the capacity to engage, or is running on empty.'},
    {h:'Belonging',p:'Whether people feel part of the team or adjacent to it.'},
    {h:'Leadership',p:'Whether the people leading create the conditions the other seven need.'}
  ]})}

  <section class="strip" id="who">
    <div class="sec-head"><span class="eyebrow">Who it's for</span><h2>For the people who carry the team.</h2></div>
    <div class="cards cards--3">${who.map(([t,d])=>`<div class="card"><span class="card__edge"></span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  </section>

  <section class="proof" id="proof">
    <div class="proof__in">
      <h2>You will know it worked.</h2>
      <p>We read team health before and after an experience, and again weeks later, so the change is something you can put in front of a board — not something you have to argue for. Proof is the point, not the postscript.</p>
    </div>
  </section>

  <section class="strip" id="where">
    <div class="sec-head"><span class="eyebrow">Where we go</span><h2>From your office to the other side of the world.</h2>
      <p class="lead">We run experiences in your workplace, at destinations across India, and anywhere your team can gather.</p></div>
    <div class="chips">${CFG.destinations.slice(0,10).map(d=>`<span>${esc(d)}</span>`).join('')}<span class="chips__more">and worldwide</span></div>
  </section>

  <section class="strip strip--tint" id="tools">
    <div class="sec-head"><span class="eyebrow">Tools</span><h2>Think it through before you talk to us.</h2>
      <p class="lead">A set of free tools to size the opportunity and shape the brief — an ROI view, a team-health self-check, and an idea generator. No sign-up.</p></div>
    <div class="cards cards--3">
      <a class="card" href="/resources-tools-offsite-roi-calculator"><span class="card__edge"></span><h3>ROI calculator</h3><p>Size the cost of a disengaged team, and what a measured change is worth.</p><span class="card__link">Open &rarr;</span></a>
      <a class="card" href="/resources-tools-team-health-snapshot"><span class="card__edge"></span><h3>Team Health Snapshot</h3><p>A short self-check across the eight dimensions of a healthy team.</p><span class="card__link">Take it &rarr;</span></a>
      <a class="card" href="/resources-tools-idea-generator"><span class="card__edge"></span><h3>Idea Generator</h3><p>A starting point for the kind of experience your team needs.</p><span class="card__link">Try it &rarr;</span></a>
    </div>
  </section>

  <section class="principles" id="principles">
    <div class="sec-head"><span class="eyebrow">About us</span><h2>The principles we hold to.</h2></div>
    <div class="principles__grid">${principles.map(([t,d])=>`<div class="pr"><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  </section>

  ${secBlog({h:'The thinking behind the method.',links:[{t:'The eight dimensions of a healthy team',href:'/the-eight-dimensions-of-a-healthy-team/'},{t:'Why measurement changes the conversation',href:'/why-measurement-changes-the-conversation/'}]})}

  ${secUS({})}

  ${secRelated({eyebrow:'Explore',h:'Where to go next.',links:[
    {h:'How we work',p:'The method, the measurement, and the proof you can put in front of a board.',href:'/why-teambeam',linkText:'The method'},
    {h:'What we do',p:'Eight ways to bring a team together, held up by one method.',href:'/what-we-do',linkText:'All offerings'},
    {h:"Who it's for",p:'By role, by industry, and by the moment your team is in.',href:'/who-we-serve',linkText:'See who'}
  ]})}

  <section class="talk" id="talk">
    <div class="talk__in">
      <span class="eyebrow">Talk to us</span>
      <h2>Tell us what you're trying to change.</h2>
      <p>Not what activity you want — what you want to be different afterwards. We will take it from there.</p>
      <p class="talk__contact">${contactBits()}</p>
      <p class="talk__addr">Visit us at <a href="${CFG.mapsUrl}" rel="noopener">${esc(CFG.address)}</a></p>
      <a class="cta" href="mailto:${CFG.email}">Write to us</a>
    </div>
  </section>` + footer();
}

/* ---- 404 ---- */
function notFound(){
  return head({path:'/404', title:'Page not found — TeamBeam Outings', desc:'That page could not be found.'}) + `
  <section class="hero"><p class="eyebrow">404</p><h1 class="hero__h">That page has wandered off.</h1>
  <p class="hero__sub">Let us point you back.</p>
  <div class="hero__cta"><a class="cta" href="/">Home</a><a class="cta cta--ghost" href="${CFG.homes.blog}">Insights &#8599;</a></div></section>` + footer();
}

/* ---- section renderers (shared page system) ---- */
const stripTags = s => String(s).replace(/<[^>]+>/g,'');
function secHero(h){return `<span id="top"></span><section class="subhero"><p class="eyebrow">${esc(h.eyebrow)}</p><h1>${h.h}</h1>${h.sub?`<p class="subhero__sub">${h.sub}</p>`:''}${h.cta?`<div class="hero__cta">${h.cta}</div>`:''}</section>`;}
function secLead(o){return `<section class="strip narrow"><p class="biglead">${o.t}</p></section>`;}
function secCards(o){const cards=o.cards.map(c=>`<div class="card"><span class="card__edge"></span><h3>${c.h}</h3><p>${c.p}</p>${c.link?`<a class="card__link" href="${c.link}">${c.linkText||'Explore'} <span aria-hidden="true">&rarr;</span></a>`:''}</div>`).join('');return `<section class="strip${o.tint?' strip--tint':''}"${o.id?` id="${o.id}"`:''}>${(o.eyebrow||o.h)?`<div class="sec-head">${o.eyebrow?`<span class="eyebrow">${esc(o.eyebrow)}</span>`:''}${o.h?`<h2>${o.h}</h2>`:''}${o.lead?`<p class="lead">${o.lead}</p>`:''}</div>`:''}<div class="cards${o.cols===3?' cards--3':''}">${cards}</div></section>`;}
function secSteps(o){const steps=o.steps.map((s,i)=>`<div class="step"><span class="step__n">0${i+1}</span><h3>${s.h}</h3><p>${s.p}</p></div>`).join('');return `<section class="strip strip--tint"${o.id?` id="${o.id}"`:''}><div class="sec-head"><span class="eyebrow">${esc(o.eyebrow)}</span><h2>${o.h}</h2>${o.lead?`<p class="lead">${o.lead}</p>`:''}</div><div class="steps">${steps}</div></section>`;}
function secSchedule(o){const c=o.items.map(x=>`<div class="card sched"><span class="card__edge"></span><span class="sched__day">${esc(x.day)}</span><h3>${x.h}</h3><p>${x.p}</p></div>`).join('');return `<section class="strip"${o.id?` id="${o.id}"`:''}><div class="sec-head"><span class="eyebrow">${esc(o.eyebrow)}</span><h2>${o.h}</h2>${o.lead?`<p class="lead">${o.lead}</p>`:''}</div><div class="cards cards--3">${c}</div></section>`;}
function secProof(o){return `<section class="proof"><div class="proof__in"><h2>${o.h}</h2><p>${o.p}</p></div></section>`;}
function secFaq(o){const items=o.items.map(f=>`<details><summary>${esc(f.q)}</summary><p>${f.a}</p></details>`).join('');return `<section class="strip faqsec"><div class="sec-head"><span class="eyebrow">${esc(o.eyebrow||'Common questions')}</span><h2>${o.h||'Things people ask'}</h2></div><div class="faqs">${items}</div></section>`;}
function secCTA(o){return `<section class="talk" id="talk"><div class="talk__in"><span class="eyebrow">${esc(o.eyebrow||'Talk to us')}</span><h2>${o.h}</h2>${o.p?`<p>${o.p}</p>`:''}<p class="talk__contact">${contactBits()}</p><div class="hero__cta" style="justify-content:center">${o.cta}</div></div></section>`;}
function secRaw(o){return o.html;}
function secProse(o){return `<section class="strip narrow prose-sec">${(o.eyebrow||o.h)?`<div class="sec-head">${o.eyebrow?`<span class="eyebrow">${esc(o.eyebrow)}</span>`:''}${o.h?`<h2>${o.h}</h2>`:''}</div>`:''}${o.blocks.map(b=>`${b.h?`<h3>${esc(b.h)}</h3>`:''}${b.p?`<p>${b.p}</p>`:''}`).join('')}</section>`;}
function secNarrative(o){return `<section class="strip narrow"${o.id?` id="${o.id}"`:''}><div class="sec-head">${o.eyebrow?`<span class="eyebrow">${esc(o.eyebrow)}</span>`:''}${o.h?`<h2>${o.h}</h2>`:''}</div><div class="narr">${o.paras.map(p=>`<p>${p}</p>`).join('')}</div></section>`;}
function secFeatureList(o){return `<section class="strip${o.tint?' strip--tint':''}"${o.id?` id="${o.id}"`:''}><div class="sec-head">${o.eyebrow?`<span class="eyebrow">${esc(o.eyebrow)}</span>`:''}${o.h?`<h2>${o.h}</h2>`:''}${o.lead?`<p class="lead">${o.lead}</p>`:''}</div><div class="flist">${o.items.map(it=>`<div class="fitem"><h3>${it.h}</h3><p>${it.p}</p></div>`).join('')}</div></section>`;}
function secRelated(o){return `<section class="strip related"><div class="sec-head"><span class="eyebrow">${esc(o.eyebrow||'Keep reading')}</span>${o.h?`<h2>${o.h}</h2>`:''}</div><div class="cards cards--3">${o.links.map(l=>`<a class="card" href="${l.href}"><span class="card__edge"></span><h3>${l.h}</h3><p>${l.p}</p><span class="card__link">${l.linkText||'Explore'} &rarr;</span></a>`).join('')}</div></section>`;}
function secPull(o){return `<section class="strip"><blockquote class="pull">${o.quote}${o.cite?`<cite>${esc(o.cite)}</cite>`:''}</blockquote></section>`;}
function secUS(o){return `<section class="strip"><a class="xmodule xmodule--us" href="${CFG.homes.us}"><span class="xmodule__eyebrow">Planning in the United States?</span><span class="xmodule__h">${o.h||'teambeam.us is our home there — the same method, a team on the ground.'}</span><span class="xmodule__go">Visit the US site <span aria-hidden="true">&rarr;</span></span></a></section>`;}
function secBlog(o){const links=(o.links||[]).map(l=>`<a class="xmodule__link" href="${CFG.homes.blog}${l.href}">${esc(l.t)} <span aria-hidden="true">&#8599;</span></a>`).join('');return `<section class="strip"><div class="xmodule xmodule--blog"><div><span class="xmodule__eyebrow">Insights</span><span class="xmodule__h">${o.h||'The thinking behind the method.'}</span>${links?`<div class="xmodule__links">${links}</div>`:''}</div><a class="cta cta--ghost" href="${CFG.homes.blog}">Read the insights &#8599;</a></div></section>`;}
const R={hero:secHero,lead:secLead,cards:secCards,steps:secSteps,schedule:secSchedule,proof:secProof,faq:secFaq,cta:secCTA,raw:secRaw,prose:secProse,narrative:secNarrative,featurelist:secFeatureList,related:secRelated,pull:secPull,usmodule:secUS,blogmodule:secBlog};
function renderPage(p){
  const nodes=[...(p.nodes||[])];
  const faq=p.sections.find(s=>s.type==='faq');
  if(faq) nodes.push({'@type':'FAQPage',mainEntity:faq.items.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:stripTags(f.a)}}))});
  nodes.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:CFG.origin+'/'},{'@type':'ListItem',position:2,name:p.crumb||p.title,item:CFG.origin+p.path}]});
  return head({...p,nodes})+p.sections.map(s=>R[s.type](s)).join('\n')+footer();
}
const talkCTA = `<a class="cta" href="mailto:${CFG.email}">Write to us</a><a class="cta cta--ghost" href="/why-teambeam">How we work</a>`;

/* ---- pages ---- */
const PAGES = [
{
  path:'/what-we-do', crumb:'What we do',
  title:'What we do — team experiences, offsites & development · TeamBeam Outings',
  desc:'From team experiences and offsites to CSR, development and self-serve kits — every format TeamBeam runs, held together by one measured method.',
  ai:'TeamBeam Outings offers team experiences, impact & CSR, development & facilitation, offsites & retreats, occasions, and self-serve kits — all designed around a diagnosis and measured at Day 14/30/60.',
  keywords:'corporate team experiences, offsites, CSR, facilitation, team building India',
  sections:[
    {type:'hero', eyebrow:'What we do', h:'Eight ways to bring a team together. <span class="grad">One method holding them up.</span>',
      sub:'From a two-hour game show to a three-day leadership retreat to a give-back project for your CSR mandate — every format is built around a real goal and checked afterwards.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/why-teambeam">How we work</a>`},
    {type:'cards', eyebrow:'Everything we do', h:'Pick a format — or tell us the goal and we will point you to it.',
      cards:[
        {h:'Team Experiences',p:'Hunts, game shows, mysteries and makers — genuinely fun, quietly designed.',link:'/team-experiences'},
        {h:'Impact &amp; CSR',p:'Give back together, meet your CSR mandate, and get a report you can file.',link:'/impact-csr'},
        {h:'Development &amp; Facilitation',p:'Turn a good day into a better team, led by facilitators who read the room.',link:'/development-facilitation'},
        {h:'Offsites &amp; Retreats',p:'The whole offsite handled — venue, travel, experiences, debrief.',link:'/offsites-retreats'},
        {h:'Beam Occasions',p:'Mark the moments that matter, in a way people actually enjoy.',link:'/beam-occasions'},
        {h:'Beam Journeys',p:'Explore India together, with the experience built into the trip.',link:'/beam-journeys'},
        {h:'The Beam Platform',p:'The tech that runs the day — and the proof that it worked.',link:'/beam-platform'},
        {h:'Self-Serve &amp; Kits',p:'Our design, your hands — kits, playbooks and facilitator certification.',link:'/self-serve-kits'}
      ]},
    {type:'cards', tint:true, eyebrow:'One method under all of it', h:'The format changes. The care behind it does not.',
      lead:'Whatever you choose, it runs on the same five steps — read the team, design for the real gap, build it, deliver it well, and measure what changed. That is what makes a day a change.',
      cards:[{h:'See how we work',p:'The method, the measurement, and the proof you can take to leadership.',link:'/why-teambeam',linkText:'How we work'}]},
    {type:'faq', h:'Things people ask', items:[
      {q:'How big can a TeamBeam experience be?',a:'Anything from a single team to a full-company event of a couple of thousand people. The run-of-show changes with the size; the planning and the follow-up stay the same.'},
      {q:'How soon can you run something?',a:'A standard in-office experience is usually two to three weeks out. Offsites and residential retreats need more lead time — tell us your date and we will be straight with you.'},
      {q:'Can you help with our CSR requirement?',a:'Yes. Our Impact &amp; CSR work is built to do real good and produce a report your CSR and ESG teams can file.'}
    ]},
    {type:'cta', h:'Tell us what you\u2019re trying to do.', p:'Tell us the goal, and we will design the experience around it.',
      cta:talkCTA}
  ]
},
{
  path:'/why-teambeam', crumb:'How we work',
  title:'How we work — the method, the measurement, the proof · TeamBeam Outings',
  desc:'We understand the team first, design the day around a real goal, run it well, and re-check at Day 14, 30 and 60 — so you get proof, not just a good memory.',
  ai:'TeamBeam works in five steps — Scan, Design, Build, Deliver, Measure — reading a team across eight dimensions before designing, then re-measuring at Day 14, 30 and 60 to prove the change held.',
  keywords:'team building method, measure team building, day 14 30 60, team health, corporate offsite ROI',
  sections:[
    {type:'hero', eyebrow:'How we work', h:'Understand the team first. Then design the day. <span class="grad">Then check it worked.</span>',
      sub:'Before we suggest a single activity, we look at how your team is really doing. That reading shapes everything after — and weeks later, we come back and measure what changed.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/what-we-do">What we do</a>`},
    {type:'steps', eyebrow:'One method under everything', h:'Scan, design, build, deliver, measure.',
      lead:'Five steps run behind every experience, whether it is a small workshop or a thousand-person event.',
      steps:[
        {h:'Scan',p:'We read the team across eight dimensions — trust, communication, alignment and more — before we plan a thing.'},
        {h:'Design',p:'A plan built for your real gap, not a stock package pulled off a shelf.'},
        {h:'Build',p:'We produce every detail end to end, in-house, so nothing is left to chance.'},
        {h:'Deliver',p:'Hosted and run so it actually lands on the day, and people can be present.'},
        {h:'Measure',p:'We re-check at Day 14, 30 and 60 and hand you the proof.'}
      ]},
    {type:'schedule', eyebrow:'The part most skip', h:'We come back and check — on a fixed schedule.',
      lead:'Most companies run a day and hope it worked. We set a baseline before the event, then measure again at three points, so the change is something you can show.',
      items:[
        {day:'Day 14',h:'First signal',p:'A quick check on what actually shifted right after the experience, while it is still fresh.'},
        {day:'Day 30',h:'Is it sticking?',p:'Whether the new habits are holding up once people are back in real work and under pressure.'},
        {day:'Day 60',h:'The proof',p:'The movement, written up in a clear report you can take to leadership.'}
      ]},
    {type:'proof', h:'You get numbers you can show your boss — not just nice photos.',
      p:'A change still visible two months later, after the team has hit normal pressure, is not enthusiasm. It is a different team. That is what we hand you: a measured shift you can defend, not a feeling you have to argue for.'},
    {type:'faq', h:'Things people ask', items:[
      {q:'What does the measurement involve for our people?',a:'Short, light check-ins — a few minutes each at Day 14, 30 and 60. We keep it simple so people actually respond, and you get a clear report at the end.'},
      {q:'Is this just a survey?',a:'No. The reading before the event shapes the design, and the follow-up tracks whether specific things changed. The point is a decision you can act on, not a satisfaction score.'},
      {q:'Do you work outside Pune?',a:'Yes. We are based in Pune and run across the major hubs — Bengaluru, Hyderabad, Mumbai, Chennai, Delhi NCR and more — plus offsites anywhere in India and abroad.'}
    ]},
    {type:'cta', h:'Tell us what you\u2019re trying to change.', p:'Not the activity — what you want to be different afterwards.',
      cta:talkCTA}
  ]
},
{
  path:'/who-we-serve', crumb:"Who it's for",
  title:"Who it's for — roles, industries & moments · TeamBeam Outings",
  desc:'From GCCs and IT to banks and factories, from CHROs to people managers, from onboarding to reorgs — TeamBeam maps to your team, your role and your moment.',
  ai:'TeamBeam serves teams by role (CXO, HR/People, L&D, managers, chiefs of staff, BU leaders), by industry (technology & GCCs, financial services, healthcare, manufacturing, retail, professional services), and by moment (onboarding, burnout recovery, restructure, kickoff, milestones, post-merger).',
  keywords:'team building for GCCs, HR team building India, industry team experiences, onboarding, offsite India',
  sections:[
    {type:'hero', eyebrow:"Who it's for", h:"Built for India's teams — <span class=\"grad\">whatever shape you're in.</span>",
      sub:'Large in-office teams, hybrid setups, fast-growing startups, teams that just merged or just lost half their people to attrition. Whatever your situation, there is a starting point that fits.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/what-we-do">What we do</a>`},
    {type:'cards', id:'roles', eyebrow:'By role', h:'A plan that fits the goal you own.', cols:3,
      lead:'Whatever seat you sit in, you get a plan shaped around what you are accountable for.',
      cards:[
        {h:'CXOs &amp; boards',p:'Retention, culture, and the health of the teams that carry the business.'},
        {h:'HR &amp; People leaders',p:'A programme you can defend — with a measured change to show for it.'},
        {h:'L&amp;D leads',p:'Development that connects to a real gap, not a generic workshop.'},
        {h:'People managers',p:'The team you can actually influence, and a way to shift it.'},
        {h:'Chiefs of staff &amp; EAs',p:'The whole thing handled end to end, so you can hand it off with confidence.'},
        {h:'Business-unit leaders',p:'A fractured or newly-merged team, brought back into one.'}
      ]},
    {type:'cards', id:'industries', tint:true, eyebrow:'By industry', h:'Every sector has its own pressures.', cols:3,
      lead:'We have built for teams across the sectors that define India\u2019s workforce — each with its own shape and its own stakes.',
      cards:[
        {h:'Technology &amp; GCCs',p:'High-talent, high-mobility teams, and centres that must feel like one company across two continents.'},
        {h:'Financial services',p:'High-stakes, high-pressure teams where trust and clear decisions matter most.'},
        {h:'Healthcare &amp; life sciences',p:'Teams carrying real weight, who need genuine recovery — not just a day off.'},
        {h:'Manufacturing',p:'Large, layered teams across shifts and sites, brought together with purpose.'},
        {h:'Retail &amp; e-commerce',p:'Fast-moving, seasonal teams that scale up and need to cohere quickly.'},
        {h:'Professional services',p:'Billable, deadline-driven teams that rarely get the time to become a team.'}
      ]},
    {type:'cards', id:'moments', eyebrow:'By moment', h:'We map to the moment you\u2019re in.', cols:3,
      lead:'Some experiences are for a specific turning point. We meet the team where it is.',
      cards:[
        {h:'Onboarding a cohort',p:'Make new joiners belong faster, so they contribute sooner and stay longer.'},
        {h:'Burnout recovery',p:'Real recovery for a team running on empty — rest that actually restores.'},
        {h:'Restructure or reset',p:'Rebuild trust and direction after a change has unsettled everyone.'},
        {h:'Sales kickoff',p:'Energy that survives past week one, built on a team worth staying on.'},
        {h:'Milestones &amp; anniversaries',p:'Mark the moment so it means something, not just another party.'},
        {h:'Post-merger',p:'Two cultures becoming one team, on purpose rather than by hope.'}
      ]},
    {type:'cta', h:'Tell us where your team is.', p:'Your role, your industry, your moment — and what you want to be different afterwards.',
      cta:talkCTA}
  ]
}
];

/* ---- offering pages (batch 1d) ---- */
function offering(o){return {path:o.path, crumb:o.crumb, title:o.title, desc:o.desc, ai:o.ai, keywords:o.keywords, sections:[
  {type:'hero', eyebrow:o.eyebrow, h:o.h, sub:o.sub, cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/what-we-do">All offerings</a>`},
  {type:'cards', eyebrow:o.cardsEyebrow||"What\u2019s inside", h:o.cardsH, lead:o.lead, cols:3, cards:o.cards},
  {type:'cta', h:o.ctaH||"Tell us what you\u2019re trying to do.", p:o.ctaP||'Tell us the goal, and we will shape it around your team.', cta:talkCTA}
]};}

PAGES.push(
offering({path:'/team-experiences', crumb:'Team Experiences',
  title:'Team Experiences — hunts, game shows, makers & more · TeamBeam Outings',
  desc:'Genuinely fun team experiences — hunts, game shows, mysteries, makers, music and more — each built around a real goal underneath the fun.',
  ai:'TeamBeam team experiences include hunts, game shows, mysteries, maker sessions, high-action and tech, music, and culinary formats, all designed around a team goal and measured afterwards.',
  keywords:'team building activities India, corporate game show, treasure hunt, team experiences',
  eyebrow:'Team Experiences', h:'Genuinely fun. <span class="grad">Quietly designed.</span>',
  sub:'The kind of day people actually talk about — with a real goal working underneath the fun.',
  cardsH:'Ways to bring a team together',
  cards:[
    {h:'Beam Hunts',p:'City and venue hunts that get a team moving, thinking and laughing together.'},
    {h:'Beam Arena',p:'High-energy game shows that light up a full room, from one team to a thousand.'},
    {h:'Beam Mysteries',p:'Solve-it-together mysteries that reward listening and shared decisions.'},
    {h:'Beam Makers',p:'Build and create something real, together — with something to keep at the end.'},
    {h:'High-action &amp; tech',p:'Adrenaline and gadgets, for teams that come alive when the stakes feel real.'},
    {h:'Rhythm &amp; music',p:'Drumming and music that get a whole group in sync within minutes.'}
  ]}),
offering({path:'/impact-csr', crumb:'Impact & CSR',
  title:'Impact & CSR — give back together, file the report · TeamBeam Outings',
  desc:'Do real good as a team, meet your CSR mandate, and get an Impact Report your CSR and ESG teams can file.',
  ai:'TeamBeam Impact & CSR experiences let teams give back through environmental, build and community projects, and produce a filable CSR/ESG impact report.',
  keywords:'corporate CSR activities India, team volunteering, CSR mandate, ESG report',
  eyebrow:'Impact & CSR', h:'Give back together. <span class="grad">And file the report.</span>',
  sub:'Do real good as a team, meet your CSR mandate, and walk away with a report your CSR and ESG teams can file.',
  cardsH:'Ways to give back',
  cards:[
    {h:'Beam Green',p:'Environmental projects a team can see the result of — planting, cleaning, restoring.'},
    {h:'Beam Builds',p:'Build something a community needs, together, in a single focused day.'},
    {h:'Beam Community',p:'Hands-on community projects matched to your people and your cause.'},
    {h:'DIY Impact Kits',p:'Self-run give-back kits for teams who want to do it in their own time.'}
  ]}),
offering({path:'/development-facilitation', crumb:'Development & Facilitation',
  title:'Development & Facilitation — turn a good day into a better team · TeamBeam Outings',
  desc:'Facilitator-led development that connects to a real gap — leadership team training, strategic workshops and more.',
  ai:'TeamBeam development and facilitation includes assessment-led development, expert facilitation, leadership team training, strategic workshops and guest experts, tied to a diagnosed gap.',
  keywords:'team facilitation India, leadership team training, strategic offsite, development workshop',
  eyebrow:'Development & Facilitation', h:'Turn a good day <span class="grad">into a better team.</span>',
  sub:'Led by facilitators who read the room — development that connects to a real gap, not a generic workshop.',
  cardsH:'Ways to develop a team',
  cards:[
    {h:'Assessment-led development',p:'Start from a reading of the team, then build the session around what it shows.'},
    {h:'Expert facilitation',p:'A skilled facilitator to hold a hard conversation and land it well.'},
    {h:'Leadership team training',p:'Work on the team that sets every other team\u2019s weather.'},
    {h:'Strategic workshops',p:'Align a group around a direction, and leave with decisions that hold.'},
    {h:'Professional excellence',p:'Focused skill-building that a team applies the next week, not someday.'},
    {h:'Guest expert in residence',p:'Bring in a specialist voice for a session that needs real depth.'}
  ]}),
offering({path:'/offsites-retreats', crumb:'Offsites & Retreats',
  title:'Offsites & Retreats — the whole offsite, handled · TeamBeam Outings',
  desc:'Multi-day offsites and retreats — venue, travel, experiences and debrief, planned and run end to end across India and worldwide.',
  ai:'TeamBeam plans and runs offsites and retreats end to end — venue, travel, experiences and debrief — for team programs, executive groups, and large-scale events.',
  keywords:'corporate offsite India, team retreat, offsite planning, executive retreat',
  eyebrow:'Offsites & Retreats', h:'The whole offsite, <span class="grad">handled.</span>',
  sub:'Venue, travel, experiences and debrief — planned and run end to end, so you can be present with your team instead of managing logistics.',
  cardsH:'Ways we run an offsite',
  cards:[
    {h:'Team programs',p:'A focused multi-day program built around what your team needs to shift.'},
    {h:'Executive experiences',p:'A considered retreat for a leadership team, run with discretion.'},
    {h:'High-energy &amp; scale',p:'Large offsites, town-halls and celebrations that hold a big group together.'},
    {h:'Sourcing &amp; planning',p:'The venue found, the travel arranged, the run-of-show built — all handled.'}
  ]}),
offering({path:'/beam-occasions', crumb:'Beam Occasions',
  title:'Beam Occasions — mark the moments that matter · TeamBeam Outings',
  desc:'A year-round calendar of reasons to bring people together — from new-year resets to year-end celebrations — framed so everyone feels included.',
  ai:'TeamBeam Occasions mark the moments that matter across the year — festivals, appreciation, milestones, new year and year-end — inclusively and secularly, tuned by audience and delivery mode.',
  keywords:'corporate celebrations India, employee appreciation, festival celebration at work, occasions',
  eyebrow:'Beam Occasions', h:'Mark the moments <span class="grad">that matter.</span>',
  sub:'A year-round calendar of reasons to bring people together — framed so everyone feels included, and run so it means something.',
  cardsH:'Occasions across the year',
  cards:[
    {h:'Festivals &amp; celebrations',p:'Mark the season inclusively — the shared value under the festival, for everyone.'},
    {h:'Employee appreciation',p:'Recognition that lands because it is specific and genuine, not generic.'},
    {h:'New year &amp; year-end',p:'A reset to open the year, and a gathering that closes it well.'},
    {h:'By audience &amp; mode',p:'Shaped for who it is for and how you gather — in-office, away, or online.'}
  ]}),
offering({path:'/beam-journeys', crumb:'Beam Journeys',
  title:'Beam Journeys — explore India together · TeamBeam Outings',
  desc:'Team travel where the journey itself does the work — designed trips across India that bring a team closer.',
  ai:'TeamBeam Journeys are designed team trips across India where travel and shared experience build the team, from signature routes to wilderness and heritage.',
  keywords:'team trip India, corporate travel, team journey, India offsite destinations',
  eyebrow:'Beam Journeys', h:'Explore India together — <span class="grad">with the experience built in.</span>',
  sub:'Team travel where the journey itself does the work — designed trips that bring a team closer while they see somewhere new.',
  cardsH:'Ways to journey together',
  cards:[
    {h:'Signature routes',p:'Our best-loved trails across India, built for a team rather than tourists.'},
    {h:'City escapes',p:'A short, sharp change of scene that resets a team in a couple of days.'},
    {h:'Wilderness &amp; hills',p:'Forests, hills and open air, where a team slows down and reconnects.'},
    {h:'Culture &amp; heritage',p:'Places with a story, shared as a team rather than through a screen.'}
  ]}),
offering({path:'/beam-platform', crumb:'The Beam Platform',
  title:'The Beam Platform — the tech that runs the day and proves it worked · TeamBeam Outings',
  desc:'The system behind every experience — planning, live delivery, and the measurement that turns a day into a report.',
  ai:'The Beam Platform is TeamBeam\u2019s technology for planning, live event delivery, a client dashboard, and the Day 14/30/60 measurement that produces the proof.',
  keywords:'team building platform, event technology, measurement dashboard, team health tracking',
  eyebrow:'The Beam Platform', h:'The tech that runs the day — <span class="grad">and proves it worked.</span>',
  sub:'The system behind every experience: planning, live delivery, and the measurement that turns a good day into a report you can show.',
  cardsH:'What the platform does',
  cards:[
    {h:'Planning assistant',p:'Shapes the brief and the run-of-show, so nothing is left to the day.'},
    {h:'Live event app',p:'Runs the experience on the day — scores, prompts and flow, in one place.'},
    {h:'Client dashboard',p:'Your view of the plan, the day and the results, in one clear place.'},
    {h:'Measurement &amp; proof',p:'The Day 14, 30 and 60 reading, written up as a report for leadership.'}
  ]}),
offering({path:'/self-serve-kits', crumb:'Self-Serve & Kits',
  title:'Self-Serve & Kits — our design, your hands · TeamBeam Outings',
  desc:'Kits, playbooks and facilitator certification, so your own people can run a great session with the structure and debrief built in.',
  ai:'TeamBeam self-serve options include ready-to-run kits, facilitator playbooks, certification, and offsite-in-a-box, so internal teams can deliver a designed experience themselves.',
  keywords:'team building kit, facilitator playbook, run your own offsite, self-serve team building',
  eyebrow:'Self-Serve & Kits', h:'Our design. <span class="grad">Your hands.</span>',
  sub:'Not everything needs us in the room. Kits, playbooks and certification give your own people what they need to run a great session — structure and debrief built in.',
  cardsH:'Ways to run it yourself',
  cards:[
    {h:'Beam Kits',p:'Everything for a specific experience, boxed and ready to run.'},
    {h:'Beam Playbook',p:'The facilitator\u2019s guide — what to say, when, and why it works.'},
    {h:'Beam Certify',p:'Train your own facilitators to deliver to our standard.'},
    {h:'Offsite in a box',p:'A full day\u2019s structure your team can pick up and run on their own.'}
  ]})
);

PAGES.push({
  path:'/destinations', crumb:'Where we go',
  title:'Destinations — where we run team experiences · TeamBeam Outings',
  desc:'Signature destinations across India, easy options nearby in Asia, and worldwide planning for distributed teams. The right place does half the work.',
  ai:'TeamBeam runs team experiences and offsites at destinations across India (Lonavala, Goa, Coorg, Udaipur, Rishikesh, Kabini and more), nearby Asia (Bali, Dubai, Singapore, Sri Lanka, Thailand, Vietnam), and worldwide for distributed teams.',
  keywords:'team offsite destinations India, corporate retreat locations, offsite near Pune Mumbai Bangalore, Asia offsite',
  sections:[
    {type:'hero', eyebrow:'Where we go', h:'The right place <span class="grad">does half the work.</span>',
      sub:'Signature spots across India, easy options nearby in Asia, and worldwide planning for teams spread across cities. We match the place to the goal, then handle the rest.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/offsites-retreats">Offsites &amp; retreats</a>`},
    {type:'cards', id:'india', eyebrow:'India', h:'Signature destinations across India.', cols:3,
      lead:'From an easy drive out of the city to a full residential offsite, these are the places we return to.',
      cards:[
        {h:'Lonavala',p:'Misty hills an easy drive from Mumbai and Pune.'},
        {h:'Goa',p:'Beaches, energy and space to unwind together.'},
        {h:'Coorg',p:'Coffee country — cool air and quiet green.'},
        {h:'Udaipur',p:'Lakes and palaces for a team that wants a lift.'},
        {h:'Rishikesh',p:'River, adventure and calm in equal measure.'},
        {h:'Kabini',p:'Wilderness and wildlife on the water\u2019s edge.'},
        {h:'Jaipur',p:'Colour, heritage and grand rooms for scale.'},
        {h:'Munnar',p:'Tea hills and cool weather in Kerala\u2019s high country.'},
        {h:'Alibaug',p:'A quick coastal escape close to Mumbai.'},
        {h:'Mahabaleshwar',p:'Strawberry hills and viewpoints near Pune.'},
        {h:'Shimla &amp; Manali',p:'Mountains and pine for a proper change of scene.'},
        {h:'Jim Corbett',p:'Forest, safari and a real reset in the foothills.'}
      ]},
    {type:'cards', id:'asia', tint:true, eyebrow:'Nearby Asia', h:'A short hop for a bigger reset.', cols:3,
      lead:'When the moment calls for somewhere further, these are close, easy and memorable.',
      cards:[
        {h:'Bali',p:'Island calm and culture for a memorable offsite.'},
        {h:'Dubai',p:'Fast, glossy and easy to reach for a big statement.'},
        {h:'Singapore',p:'Efficient, walkable and world-class for teams.'},
        {h:'Sri Lanka',p:'Beaches, hills and heritage — close and affordable.'},
        {h:'Thailand',p:'Beaches and buzz, from Bangkok to the islands.'},
        {h:'Vietnam',p:'Coast, food and character for the adventurous.'}
      ]},
    {type:'cards', id:'worldwide', eyebrow:'Worldwide', h:'Wherever your team can gather.', cols:3,
      lead:'For distributed teams, the destination is often the point of the trip. We find the right place to meet and run the days on the ground.',
      cards:[
        {h:'One place to meet',p:'A central gather-point chosen for your team\u2019s map, not ours.'},
        {h:'Planned end to end',p:'Venue, travel and run-of-show handled, so the reunion is all people feel.'},
        {h:'Run on the ground',p:'Hosted and delivered wherever you land, to the same standard.'}
      ]},
    {type:'cta', h:'Tell us where your team is — and where it could go.', p:'We will suggest the place that fits the goal, and handle everything after.',
      cta:talkCTA}
  ]
});

const ROITOOL = `
<section class="strip"><div class="tool" id="roi">
  <div class="tool__form">
    <div class="field"><label for="roi-size">Team size</label><input id="roi-size" type="number" min="1" value="50" inputmode="numeric"></div>
    <div class="field"><label for="roi-sal">Average annual salary — CTC per person (\u20B9)</label><input id="roi-sal" type="number" min="0" step="50000" value="1200000" inputmode="numeric"></div>
    <div class="field"><label for="roi-attr">Current annual attrition (%)</label><input id="roi-attr" type="number" min="0" max="100" step="1" value="18" inputmode="numeric"></div>
    <div class="field"><label for="roi-dis">How disengaged does the team feel?</label><select id="roi-dis"><option value="low">A little</option><option value="some" selected>Somewhat</option><option value="high">Quite a lot</option></select></div>
    <div class="field"><label for="roi-budget">Planned investment per year (\u20B9, optional)</label><input id="roi-budget" type="number" min="0" step="50000" value="500000" inputmode="numeric"></div>
  </div>
  <div class="tool__out" id="roi-out" aria-live="polite"></div>
  <details class="tool__assume"><summary>The assumptions behind this</summary><div id="roi-assume"></div></details>
  <p class="tool__note">This is a model to size the opportunity — not a quote, and not a claim about your business. The figures are conservative, adjustable assumptions, not published statistics. Your real numbers will differ, which is exactly why we measure the actual change at Day 14, 30 and 60.</p>
  <div class="hero__cta"><a class="cta" href="/why-teambeam">See how we measure</a><a class="cta cta--ghost" href="mailto:${CFG.email}">Talk to us</a></div>
</div></section>
<script>
(function(){
  var ids=['roi-size','roi-sal','roi-attr','roi-dis','roi-budget'];
  var el={}; ids.forEach(function(i){el[i]=document.getElementById(i);});
  var out=document.getElementById('roi-out'), asm=document.getElementById('roi-assume');
  var inr=new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0});
  var DIS={low:[0.03,0.08],some:[0.08,0.16],high:[0.15,0.25]};
  var LAB={low:'a little',some:'a somewhat',high:'a quite'};
  var REPL=[0.5,1.5];
  function calc(){
    var n=+el['roi-size'].value||0, sal=+el['roi-sal'].value||0, attr=(+el['roi-attr'].value||0)/100, dis=el['roi-dis'].value, budget=+el['roi-budget'].value||0;
    var dep=n*attr;
    var aLow=dep*sal*REPL[0], aHigh=dep*sal*REPL[1];
    var d=DIS[dis]||DIS.some;
    var dLow=n*sal*d[0], dHigh=n*sal*d[1];
    var tLow=aLow+dLow, tHigh=aHigh+dHigh;
    var rLow=tLow*0.05, rHigh=tHigh*0.15;
    var html='<div class="stat"><span class="stat__k">Estimated annual cost of a disengaged, higher-attrition team</span><span class="stat__v">'+inr.format(tLow)+' &ndash; '+inr.format(tHigh)+'</span></div>';
    html+='<div class="stat"><span class="stat__k">What a measured improvement could be worth each year</span><span class="stat__v grad">'+inr.format(rLow)+' &ndash; '+inr.format(rHigh)+'</span></div>';
    if(budget>0){
      var mid=(tLow+tHigh)/2; var pct=mid>0?Math.max(0,Math.min(100,budget/mid*100)):0;
      html+='<p class="tool__read">Your investment of '+inr.format(budget)+' pays for itself if it recovers about <b>'+pct.toFixed(1)+'%</b> of that estimated cost. Even the low end of a measured improvement ('+inr.format(rLow)+') '+(rLow>=budget?'clears that on its own.':'moves you a long way toward it.')+'</p>';
    }
    out.innerHTML=html;
    asm.innerHTML='<ul><li>Replacing someone who leaves costs '+(REPL[0]*100)+'&ndash;'+(REPL[1]*100)+'% of their annual salary (recruiting, ramp-up, lost momentum).</li><li>'+(LAB[dis]||LAB.some)+'-disengaged team loses '+(d[0]*100)+'&ndash;'+(d[1]*100)+'% of salary in productivity per person, per year.</li><li>A measured team programme recovers 5&ndash;15% of the total. These are conservative model figures you can weigh for yourself, not published statistics.</li></ul>';
  }
  ids.forEach(function(i){el[i].addEventListener('input',calc);el[i].addEventListener('change',calc);});
  calc();
})();
</script>`;

PAGES.push(
{
  path:'/resources', crumb:'Tools',
  title:'Tools — size the opportunity before you talk to us · TeamBeam Outings',
  desc:'Free tools to size the opportunity and shape the brief — an ROI calculator, a team-health self-check, and an idea generator.',
  ai:'TeamBeam offers free planning tools: an ROI calculator that sizes the cost of disengagement and attrition, a Team Health Snapshot self-check across eight dimensions, and an Idea Generator.',
  keywords:'team building ROI calculator, team health check, offsite idea generator, HR tools India',
  sections:[
    {type:'hero', eyebrow:'Tools', h:'Think it through <span class="grad">before you talk to us.</span>',
      sub:'A few tools to size the opportunity and shape the brief. Free, and no sign-up.',
      cta:`<a class="cta" href="/resources-tools-offsite-roi-calculator">Open the ROI calculator</a><a class="cta cta--ghost" href="/why-teambeam">How we work</a>`},
    {type:'cards', eyebrow:'The tools', h:'Start with a question.', cols:3,
      cards:[
        {h:'ROI calculator',p:'Size what a disengaged, higher-attrition team costs — and what a measured change is worth.',link:'/resources-tools-offsite-roi-calculator',linkText:'Open the calculator'},
        {h:'Team Health Snapshot',p:'A short self-check across the eight dimensions of a healthy team, with the one to focus on.',link:'/resources-tools-team-health-snapshot',linkText:'Take the snapshot'},
        {h:'Idea Generator',p:'A starting point for the kind of experience your team needs, matched to your goal.',link:'/resources-tools-idea-generator',linkText:'Get an idea'}
      ]},
    {type:'cta', h:'Rather just talk it through?', p:'Tell us what you\u2019re trying to change, and we will take it from there.',
      cta:talkCTA}
  ]
},
{
  path:'/resources-tools-offsite-roi-calculator', crumb:'ROI calculator',
  title:'Team ROI calculator — the cost of a disengaged team · TeamBeam Outings',
  desc:'A free calculator that sizes the annual cost of disengagement and attrition on your team, and what a measured improvement could be worth.',
  ai:'The TeamBeam ROI calculator estimates the annual cost of disengagement and regretted attrition for a team, using transparent adjustable assumptions, and shows the potential value of a measured improvement and the break-even on an investment.',
  keywords:'team building ROI calculator India, cost of employee disengagement, attrition cost calculator, offsite ROI',
  sections:[
    {type:'hero', eyebrow:'Tools · ROI calculator', h:'What is a disengaged team <span class="grad">actually costing you?</span>',
      sub:'Put in a few numbers and see the annual cost of disengagement and attrition — and what recovering even part of it is worth. Everything updates as you type.'},
    {type:'raw', html:ROITOOL},
    {type:'faq', h:'About this calculator', items:[
      {q:'Where do the numbers come from?',a:'From transparent, conservative assumptions you can see and weigh — not published statistics. The tool is a way to size the opportunity, not a promise. The real figure is the one we measure at Day 14, 30 and 60.'},
      {q:'Is my data stored?',a:'No. The calculator runs entirely in your browser. Nothing you type is sent or saved.'}
    ]},
    {type:'cta', h:'Now let\u2019s make the number real.', p:'Tell us what you\u2019re trying to change, and we will design for it — and measure it.',
      cta:talkCTA}
  ]
});

const DIMS=[
  ['Trust','People admit mistakes and ask for help without worrying it will be used against them.'],
  ['Communication','The important things get said — including the hard ones — and they land.'],
  ['Alignment','Everyone could tell you the same top priority right now.'],
  ['Collaboration','People build on each other\u2019s work rather than running in parallel.'],
  ['Decision-making','We make decisions, and they stay made.'],
  ['Energy','The team has the capacity to take on what is in front of it.'],
  ['Belonging','Everyone feels part of the team, not adjacent to it.'],
  ['Leadership','The people leading create the conditions for the rest to do their best work.']
];
const DIMLINK={Trust:'/trust-inside-a-team/',Belonging:'/onboarding-at-scale-belong-faster/',Leadership:'/the-leadership-team-sets-the-weather/'};
const SNAPSHOT = `
<section class="strip"><div class="tool" id="ths">
  <div class="ths__qs">${DIMS.map(([d,q],i)=>`<div class="ths__q"><div class="ths__q-t"><span>${d}</span><label for="ths-${i}">${q}</label></div><input id="ths-${i}" class="ths__range" type="range" min="1" max="5" value="3" data-dim="${d}"><div class="ths__scale"><span>Rarely true</span><span>Always true</span></div></div>`).join('')}</div>
  <button class="cta" id="ths-go" type="button">See the snapshot</button>
  <div class="tool__out" id="ths-out" aria-live="polite"></div>
  <p class="tool__note">A quick self-check to get you thinking — not a diagnosis. We read team health properly across these eight dimensions before we design anything. It runs in your browser; nothing is saved.</p>
</div></section>
<script>
(function(){
  var LINK=${JSON.stringify(DIMLINK)}, BLOG='${CFG.homes.blog}', DEF='/the-eight-dimensions-of-a-healthy-team/';
  var rs=[].slice.call(document.querySelectorAll('.ths__range'));
  var out=document.getElementById('ths-out');
  document.getElementById('ths-go').addEventListener('click',function(){
    var vals=rs.map(function(r){return {d:r.getAttribute('data-dim'),v:+r.value};});
    var sorted=vals.slice().sort(function(a,b){return a.v-b.v;});
    var low=sorted.slice(0,2), high=sorted[sorted.length-1];
    var bars=vals.map(function(x){return '<div class="bar"><span class="bar__k">'+x.d+'</span><div class="bar__track"><div class="bar__fill" style="width:'+(x.v/5*100)+'%"></div></div></div>';}).join('');
    var focus=low[0], link=BLOG+(LINK[focus.d]||DEF);
    out.innerHTML='<div class="bars">'+bars+'</div>'+
      '<p class="tool__read">Your team looks strongest on <b>'+high.d+'</b>. The dimension worth attention first is <b>'+focus.d.toLowerCase()+'</b>'+((low[1]&&low[1].v===focus.v)?' (with '+low[1].d.toLowerCase()+' close behind)':'')+'. That is where a well-designed experience would earn the most.</p>'+
      '<div class="hero__cta"><a class="cta" href="'+link+'">Read about '+focus.d.toLowerCase()+' &#8599;</a><a class="cta cta--ghost" href="mailto:${CFG.email}">Talk to us</a></div>';
    out.scrollIntoView({behavior:'smooth',block:'nearest'});
  });
})();
</script>`;

const IDEA = `
<section class="strip"><div class="tool" id="idea">
  <div class="tool__form">
    <div class="field"><label for="idea-size">Team size</label><input id="idea-size" type="number" min="1" value="30" inputmode="numeric"></div>
    <div class="field"><label for="idea-mode">Where</label><select id="idea-mode"><option value="office">In our office / a venue nearby</option><option value="away">Away together</option><option value="online">Online, across cities</option></select></div>
    <div class="field"><label for="idea-goal">What are you trying to do?</label><select id="idea-goal"><option value="trust">Build trust</option><option value="communication">Improve communication</option><option value="reenergise">Re-energise a tired team</option><option value="celebrate">Celebrate a milestone</option><option value="onboard">Onboard new joiners</option><option value="giveback">Give back / CSR</option></select></div>
    <div class="field"><label for="idea-energy">Energy</label><select id="idea-energy"><option value="calm">Calm and reflective</option><option value="balanced" selected>Balanced</option><option value="high">High and lively</option></select></div>
  </div>
  <button class="cta" id="idea-go" type="button">Suggest something</button>
  <div class="tool__out" id="idea-out" aria-live="polite"></div>
  <p class="tool__note">A starting point, not a fixed menu. Tell us the goal and we design around your actual team.</p>
</div></section>
<script>
(function(){
  var OFF={
    trust:['Development & Facilitation','/development-facilitation','A facilitated session that builds the safety to be honest, cemented by a shared experience.'],
    communication:['Development & Facilitation','/development-facilitation','A workshop that surfaces where communication breaks, with practice that carries back to work.'],
    reenergise:['Team Experiences','/team-experiences','A high-spirit experience designed to restore a tired team, not drain it further.'],
    celebrate:['Beam Occasions','/beam-occasions','An occasion built around the milestone, framed so everyone feels part of it.'],
    onboard:['Team Experiences','/team-experiences','An experience that helps new joiners belong faster, so they contribute sooner.'],
    giveback:['Impact & CSR','/impact-csr','A give-back project that does real good and produces a report you can file.']
  };
  var MODE={office:'run in your workplace or a venue in your city — half a day, no travel.',away:'taken off-site — a day trip nearby or a full residential offsite.',online:'live-hosted online with kits posted to every home, for a team across cities.'};
  var out=document.getElementById('idea-out');
  document.getElementById('idea-go').addEventListener('click',function(){
    var mode=document.getElementById('idea-mode').value, goal=document.getElementById('idea-goal').value, n=+document.getElementById('idea-size').value||0;
    var o=OFF[goal]||OFF.reenergise;
    var second = mode==='away' ? ['Offsites & Retreats','/offsites-retreats','Since you are going away, we can handle the whole offsite — venue, travel and run-of-show.'] : ['How we measure','/why-teambeam','Whatever we run, we read the team first and measure the change at Day 14, 30 and 60.'];
    function card(t,l,p){return '<a class="card" href="'+l+'"><span class="card__edge"></span><h3>'+t+'</h3><p>'+p+'</p><span class="card__link">Explore &rarr;</span></a>';}
    out.innerHTML='<p class="tool__read">For a team of about '+n+', we\\u2019d '+MODE[mode]+'</p>'+
      '<div class="cards cards--3">'+card(o[0],o[1],o[2])+card(second[0],second[1],second[2])+'</div>'+
      '<div class="hero__cta"><a class="cta" href="mailto:${CFG.email}">Talk to us about this</a></div>';
    out.scrollIntoView({behavior:'smooth',block:'nearest'});
  });
})();
</script>`;

PAGES.push(
{
  path:'/resources-tools-team-health-snapshot', crumb:'Team Health Snapshot',
  title:'Team Health Snapshot — a quick eight-dimension self-check · TeamBeam Outings',
  desc:'A short, free self-check across the eight dimensions of a healthy team — trust, communication, alignment and more — that shows the one to focus on first.',
  ai:'The TeamBeam Team Health Snapshot is a quick self-assessment across eight dimensions (trust, communication, alignment, collaboration, decision-making, energy, belonging, leadership) that highlights a team\u2019s strongest dimension and the one to focus on.',
  keywords:'team health check, team assessment, eight dimensions of a team, team self-assessment India',
  sections:[
    {type:'hero', eyebrow:'Tools · Team Health Snapshot', h:'Where is your team <span class="grad">actually strong?</span>',
      sub:'Rate your team on eight quick statements and see where it stands — and the one dimension worth attention first.'},
    {type:'raw', html:SNAPSHOT},
    {type:'cta', h:'Want the real reading?', p:'This is a self-check. Before we design anything, we read your team properly across these eight dimensions.',
      cta:talkCTA}
  ]
},
{
  path:'/resources-tools-idea-generator', crumb:'Idea Generator',
  title:'Idea Generator — the right experience for your team · TeamBeam Outings',
  desc:'Tell us your team size, where you want to gather, and what you are trying to do — and get a starting point matched to the goal.',
  ai:'The TeamBeam Idea Generator suggests experience directions based on team size, delivery mode (in-office, away, online) and goal (build trust, improve communication, re-energise, celebrate, onboard, give back).',
  keywords:'team building ideas India, offsite ideas, team activity suggestions, corporate event ideas',
  sections:[
    {type:'hero', eyebrow:'Tools · Idea Generator', h:'Not sure where to start? <span class="grad">Start here.</span>',
      sub:'Tell us the shape of your team and what you are trying to do, and we will point you to the right kind of experience.'},
    {type:'raw', html:IDEA},
    {type:'cta', h:'Like where this is going?', p:'Tell us the goal and we will design the real thing around your team.',
      cta:talkCTA}
  ]
});

const CONTACTCARD = `
<section class="strip"><div class="contactcard">
  <div class="contactcard__row"><span class="eyebrow">Email</span><a class="contactcard__big" href="mailto:${CFG.email}">${CFG.email}</a></div>
  <div class="contactcard__row"><span class="eyebrow">Call</span><a class="contactcard__big" href="tel:${CFG.phone.replace(/[^+\d]/g,'')}">${esc(CFG.phone)}</a></div>
  <div class="contactcard__row"><span class="eyebrow">Visit</span><a class="contactcard__addr" href="${CFG.mapsUrl}" rel="noopener">${esc(CFG.address)}</a></div>
  <div class="contactcard__row"><span class="eyebrow">In the United States</span><a class="contactcard__addr" href="${CFG.homes.us}">teambeam.us — our home there</a></div>
</div></section>`;

PAGES.push(
{
  path:'/about', crumb:'About',
  title:'About — one business, two homes, one idea · TeamBeam Outings',
  desc:'TeamBeam Outings designs, delivers and measures corporate team experiences across India and worldwide, with a home in the USA. Understand the team first; measure what changed.',
  ai:'TeamBeam Outings is a corporate team-experience company operating as one business with two homes — teambeam.in (India and worldwide) and teambeam.us (USA). It works diagnostic-first and measures outcomes at Day 14, 30 and 60.',
  keywords:'about TeamBeam, corporate team building company India, team experience company Pune',
  sections:[
    {type:'hero', eyebrow:'About', h:'One business. Two homes. <span class="grad">One idea.</span>',
      sub:'We design, deliver and measure corporate team experiences — in India and worldwide, with a home in the USA at teambeam.us.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/why-teambeam">How we work</a>`},
    {type:'lead', t:'We built TeamBeam because most team events are forgotten by Friday, and nobody can say if they helped. We wanted to do it the other way around — understand the team first, build the day around a real goal, and come back afterwards to see what changed.'},
    {type:'cards', eyebrow:'What makes us us', h:'A few things we do differently.', cols:3,
      cards:[
        {h:'Diagnostic-first',p:'We read the team before we design anything, so the day fits the real gap.'},
        {h:'Measured',p:'We check at Day 14, 30 and 60, so you get proof rather than a memory.'},
        {h:'No forced fun',p:'Calm, real and built for grown-ups. Every minute has a point.'},
        {h:'One team worldwide',p:'India or the USA, the same practice and the same people, wherever you gather.'}
      ]},
    {type:'cta', h:'Want to work with us?', p:'Tell us what you\u2019re trying to change, and we will take it from there.',
      cta:talkCTA}
  ]
},
{
  path:'/careers', crumb:'Careers',
  title:'Careers — do work that leaves a team different · TeamBeam Outings',
  desc:'We hire for craft over credentials — facilitators, experience designers and operators who can read a room and pull off a flawless day. See what we look for and how to apply.',
  ai:'TeamBeam hires facilitators, experience designers, and operations & logistics people, valuing craft over credentials. Candidates apply by email to start@teambeam.in.',
  keywords:'TeamBeam careers, facilitator jobs India, experience designer, event operations jobs Pune',
  sections:[
    {type:'hero', eyebrow:'Careers', h:'Do work that leaves a team <span class="grad">different from how it arrived.</span>',
      sub:'We hire for craft over credentials — people who can read a room, hold a group, and pull off a flawless day.',
      cta:`<a class="cta" href="mailto:${CFG.email}?subject=Working%20with%20TeamBeam">Send us a note</a><a class="cta cta--ghost" href="/about">About us</a>`},
    {type:'lead', t:'We care less about your titles than what you can do in a room. If you love designing a moment, reading the energy, and getting out of the way at the right time, we should talk — whatever your background.'},
    {type:'cards', eyebrow:'Where we hire', h:'The people who make the day work.', cols:3,
      cards:[
        {h:'Facilitators',p:'Read a room in real time, hold a group so people feel safe, and know when to say less.'},
        {h:'Experience designers',p:'Turn a real goal into a run-of-show that lands, down to the last detail.'},
        {h:'Operations &amp; logistics',p:'Make the impossible day happen quietly — venues, travel, kit, timing.'},
        {h:'Guest experts',p:'Specialist voices for sessions that need genuine depth.'}
      ]},
    {type:'cta', eyebrow:'How to apply', h:'Tell us what you\u2019re great at.',
      p:'A short note about what you do and a moment you are proud of goes a long way. No forms, no fuss.',
      cta:`<a class="cta" href="mailto:${CFG.email}?subject=Careers%20%E2%80%94%20I%27d%20like%20to%20work%20with%20TeamBeam">Write to ${CFG.email}</a>`}
  ]
},
{
  path:'/partnerships', crumb:'Partnerships',
  title:'Partnerships — venues, experiences & specialists · TeamBeam Outings',
  desc:'We work with venues, experience providers and specialists who share our standard. See what we look for in a partner and how to work with us.',
  ai:'TeamBeam partners with venues, experience providers, specialist facilitators and suppliers who meet its standard of reliability and quality. Partners apply by email to start@teambeam.in.',
  keywords:'TeamBeam partnerships, venue partner, experience provider, corporate event vendors India',
  sections:[
    {type:'hero', eyebrow:'Partners', h:'Great days need <span class="grad">great partners.</span>',
      sub:'Venues, experience providers and specialists who share our standard — measured, reliable, and genuinely good at what they do.',
      cta:`<a class="cta" href="mailto:${CFG.email}?subject=Partnership%20with%20TeamBeam">Partner with us</a><a class="cta cta--ghost" href="/what-we-do">What we do</a>`},
    {type:'lead', t:'We are selective, because our name is on the day. What we look for is simple: you are excellent at one thing, you are dependable when it matters, and you care about the people in the room as much as we do.'},
    {type:'cards', eyebrow:'Who we work with', h:'Ways to partner.', cols:3,
      cards:[
        {h:'Venue partners',p:'Spaces and properties across India and worldwide that make an offsite effortless.'},
        {h:'Experience partners',p:'Providers with a genuinely good activity we can design a real goal into.'},
        {h:'Specialist facilitators',p:'Independent facilitators who deliver to a high, consistent standard.'},
        {h:'Suppliers',p:'Production, travel and logistics partners who make the complex look calm.'}
      ]},
    {type:'cta', eyebrow:'Work with us', h:'Tell us what you do best.',
      p:'Send a short note about your space, service or specialism, and where you operate.',
      cta:`<a class="cta" href="mailto:${CFG.email}?subject=Partnership%20%E2%80%94%20let%27s%20work%20together">Write to ${CFG.email}</a>`}
  ]
},
{
  path:'/contact', crumb:'Contact',
  title:'Contact — tell us what you\u2019re trying to change · TeamBeam Outings',
  desc:'Talk to TeamBeam Outings. Email, call, or visit us in Pune — and find our US home at teambeam.us. Tell us the goal, and we will design around it.',
  ai:'Contact TeamBeam Outings by email (start@teambeam.in), phone (+91 75175 00777), or at Futura, Magarpatta, Hadapsar, Pune 411013. US enquiries: teambeam.us.',
  keywords:'contact TeamBeam, team building enquiry Pune, corporate offsite contact India',
  sections:[
    {type:'hero', eyebrow:'Contact', h:'Tell us what you\u2019re <span class="grad">trying to change.</span>',
      sub:'Not the activity you want — what you want to be different afterwards. We will take it from there. No hard sell, just a real conversation about your team.'},
    {type:'raw', html:CONTACTCARD},
    {type:'cta', h:'Start the conversation.', p:'A line about your team and your goal is all we need to begin.',
      cta:`<a class="cta" href="mailto:${CFG.email}?subject=Let%27s%20talk%20about%20our%20team">Write to us</a>`}
  ]
});

const LEGAL_UPDATED = 'This statement was last reviewed in ' + new Date().toLocaleDateString('en-IN',{month:'long',year:'numeric'}) + '.';
PAGES.push(
{
  path:'/why-teambeam-the-method', crumb:'The method',
  title:'The method — scan, design, build, deliver, measure · TeamBeam Outings',
  desc:'The five steps behind every TeamBeam experience — read the team, design for the real gap, build it, deliver it well, and measure what changed.',
  ai:'TeamBeam\u2019s method has five steps: Scan (read the team across eight dimensions), Design (build for the real gap), Build (produce end to end), Deliver (host and run it), Measure (re-check at Day 14, 30 and 60).',
  keywords:'team building method, diagnostic team building, scan design build deliver measure',
  sections:[
    {type:'hero', eyebrow:'How we work · The method', h:'Five steps behind <span class="grad">every experience.</span>',
      sub:'The same method runs behind a small workshop and a thousand-person event. It is what turns a good day into a change that holds.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/why-teambeam-measurement-impact">Measurement &amp; proof</a>`},
    {type:'lead', t:'Most team events are chosen backwards — an activity is booked, then everyone hopes it fits. We reverse the order. We read the team first, and every step after follows from what we find.'},
    {type:'steps', eyebrow:'The five steps', h:'In order, and for a reason.',
      steps:[
        {h:'Scan',p:'We read the team across eight dimensions — trust, communication, alignment and more — before we plan a thing.'},
        {h:'Design',p:'We design for the specific gap the reading reveals, not a package pulled off a shelf.'},
        {h:'Build',p:'We produce every detail end to end, in-house, so nothing is left to chance on the day.'},
        {h:'Deliver',p:'We host and run it so it lands, and so your people can simply be present.'},
        {h:'Measure',p:'We re-check at Day 14, 30 and 60, and hand you the proof of what changed.'}
      ]},
    {type:'faq', h:'About the method', items:[
      {q:'Why read the team before designing?',a:'Because the activity a team enjoys and the thing a team needs are often different. Reading first is what makes the design fit — and what makes the result measurable.'},
      {q:'Does this work at scale?',a:'Yes. The run-of-show changes with the size, but the five steps are the same for a single team and a full-company event.'}
    ]},
    {type:'cta', h:'Tell us what you\u2019re trying to change.', p:'We will read the team, then design for it.', cta:talkCTA}
  ]
},
{
  path:'/why-teambeam-measurement-impact', crumb:'Measurement & proof',
  title:'Measurement & proof — Day 14, 30 and 60 · TeamBeam Outings',
  desc:'We set a baseline before an experience, then measure again at Day 14, 30 and 60 — so the change is something you can show, not something to take on faith.',
  ai:'TeamBeam measures team health before an experience and again at Day 14, 30 and 60, producing a report that shows what changed and whether it held.',
  keywords:'measure team building, team building ROI, day 14 30 60, team health measurement India',
  sections:[
    {type:'hero', eyebrow:'How we work · Measurement & proof', h:'The part most skip: <span class="grad">we come back.</span>',
      sub:'Most companies run a day and hope it worked. We set a baseline before, then measure again on a fixed schedule — so you get proof rather than a memory.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/why-teambeam-the-method">The method</a>`},
    {type:'schedule', eyebrow:'The schedule, every time', h:'Three readings after the day.',
      lead:'The day is the intervention. What is still true weeks later is the result. So we read at three points, and the shape of the curve tells us what happened.',
      items:[
        {day:'Day 14',h:'First signal',p:'What actually shifted right after the experience, once the glow has settled.'},
        {day:'Day 30',h:'Is it sticking?',p:'Whether the change holds once the team is back under real pressure.'},
        {day:'Day 60',h:'The proof',p:'Whether it has become the new normal — written up as a report for leadership.'}
      ]},
    {type:'cards', eyebrow:'What we read', h:'Eight dimensions of a healthy team.', cols:3,
      lead:'We read the same eight dimensions before and after. We keep how the reading is taken to ourselves; what matters is that the change is real, and visible over time.',
      cards:[
        {h:'Trust · Communication',p:'Whether people can be honest, and whether the important things travel.'},
        {h:'Alignment · Collaboration',p:'Whether the team is pointed the same way and building on each other.'},
        {h:'Decision-making · Energy',p:'Whether decisions stick, and whether the team has the capacity to act.'},
        {h:'Belonging · Leadership',p:'Whether people feel part of it, and whether leaders set the right conditions.'}
      ]},
    {type:'proof', h:'Numbers you can show your boss — not just nice photos.',
      p:'A change still visible two months later, after normal pressure, is not enthusiasm. It is a different team. That is what we hand you: a measured shift you can defend.'},
    {type:'cta', h:'Make the change measurable.', p:'Tell us the goal, and we will show you what moved.', cta:talkCTA}
  ]
},
{
  path:'/why-teambeam-results', crumb:'Results',
  title:'Results — a change you can put in front of a board · TeamBeam Outings',
  desc:'Not photos — a measured shift in how a team works, and a clear report that explains it. Here is what results with TeamBeam look like.',
  ai:'TeamBeam results are presented as a measured movement in team health across eight dimensions, written up in a report leadership can act on — not just event photos.',
  keywords:'team building results, prove an offsite worked, team health report',
  sections:[
    {type:'hero', eyebrow:'How we work · Results', h:'A change you can <span class="grad">put in front of a board.</span>',
      sub:'Not photos, and not a feeling you have to argue for — a measured shift in how a team works, and a report that explains it.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/why-teambeam-measurement-impact">How we measure</a>`},
    {type:'cards', eyebrow:'What you get', h:'Proof, in a form you can use.', cols:3,
      cards:[
        {h:'A movement',p:'A before-and-after across the dimensions that mattered for your goal.'},
        {h:'A report',p:'Written up clearly, so it belongs on the same slide as the numbers.'},
        {h:'A next step',p:'A read on what to reinforce next — so each experience makes the next one sharper.'}
      ]},
    {type:'proof', h:'The result is what is still true in two months.',
      p:'We would rather show you a smaller change that held than a big day that faded. That is the whole point of measuring: to know the difference.'},
    {type:'cta', h:'Let\u2019s make it real.', p:'Tell us what you want to be different, and we will design and measure for it.', cta:talkCTA}
  ]
},
{
  path:'/occasions', crumb:'Occasions',
  title:'Occasions — a year-round calendar of reasons to gather · TeamBeam Outings',
  desc:'From new-year resets to year-end celebrations, festivals to appreciation days — a year-round calendar of reasons to bring your team together, framed so everyone feels included.',
  ai:'TeamBeam Occasions cover the year — festivals of light and colour, appreciation days, women\u2019s day, national and heritage days, new year and year-end — marked inclusively and secularly.',
  keywords:'corporate occasions calendar India, festival celebration at work, employee appreciation day, year-end party',
  sections:[
    {type:'hero', eyebrow:'Occasions', h:'Mark the moments <span class="grad">that matter.</span>',
      sub:'A year-round calendar of reasons to bring people together — framed so everyone feels included, and run so it means something.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/beam-occasions">Beam Occasions</a>`},
    {type:'cards', eyebrow:'Across the year', h:'Reasons to gather, all year long.', cols:3,
      cards:[
        {h:'Festivals of light &amp; colour',p:'Mark the season inclusively — the shared value under the festival, for everyone.'},
        {h:'Employee appreciation',p:'Recognition that lands because it is specific and genuine.'},
        {h:'Women\u2019s day &amp; inclusion',p:'Belonging marked with meaning, not a token gesture.'},
        {h:'National &amp; heritage days',p:'Shared pride and story, celebrated as a team.'},
        {h:'New year resets',p:'Open the year pointed the same way, with energy that lasts.'},
        {h:'Year-end celebrations',p:'Close the year with a gathering that actually feels earned.'}
      ]},
    {type:'cta', h:'Which moment is coming up?', p:'Tell us the occasion, and we will make it one people remember.', cta:talkCTA}
  ]
},
{
  path:'/volunteer', crumb:'Volunteer',
  title:'Volunteer — give back with your team · TeamBeam Outings',
  desc:'Ways for your team to give back — employee volunteering and CSR projects that do real good and produce a report you can file.',
  ai:'TeamBeam runs employee volunteering and give-back projects as part of its Impact & CSR work, producing a filable report.',
  keywords:'employee volunteering India, corporate volunteering, CSR team activity',
  sections:[
    {type:'hero', eyebrow:'Volunteer', h:'Give back — <span class="grad">together.</span>',
      sub:'Bring your team to a project that does real good, and walk away with a report your CSR and ESG teams can file.',
      cta:`<a class="cta" href="#talk">Talk to us</a><a class="cta cta--ghost" href="/impact-csr">Impact &amp; CSR</a>`},
    {type:'lead', t:'The best give-back days are the ones a team can see the result of. We match your people to a cause and a project that fits, run it well, and document the impact.'},
    {type:'cta', h:'Want to give back with your team?', p:'Tell us your cause and your numbers, and we will build the day.', cta:talkCTA}
  ]
},
{
  path:'/privacy', crumb:'Privacy',
  title:'Privacy · TeamBeam Outings',
  desc:'How TeamBeam Outings handles the limited personal information you share with us.',
  ai:'TeamBeam Outings privacy statement: the site collects minimal information; personal data shared by email is used only to respond to enquiries.',
  sections:[
    {type:'hero', eyebrow:'Privacy', h:'Your information, handled simply.',
      sub:'We keep this short because we keep it minimal.'},
    {type:'prose', blocks:[
      {h:'What we collect',p:'This website does not use sign-up forms. If you email or call us, we receive what you choose to share — your name, contact details, and what you tell us about your team. The site may use privacy-respecting analytics to understand traffic; it is not used to track you across the web.'},
      {h:'How we use it',p:'Only to respond to your enquiry and, if you become a client, to plan and run your experience. We do not sell your information, and we do not share it except with the partners needed to deliver what you have asked for.'},
      {h:'Your rights',p:'You can ask us what we hold about you, to correct it, or to delete it. Write to <a href="mailto:'+CFG.email+'">'+CFG.email+'</a> and we will act on it.'},
      {h:'Retention',p:'We keep enquiry information only as long as needed to help you, then remove it.'},
      {p:LEGAL_UPDATED+' This is a plain-language summary; if you need a formal policy for procurement, write to us and we will provide one.'}
    ]}
  ]
},
{
  path:'/terms', crumb:'Terms',
  title:'Terms · TeamBeam Outings',
  desc:'The terms for using the TeamBeam Outings website.',
  ai:'TeamBeam Outings website terms of use.',
  sections:[
    {type:'hero', eyebrow:'Terms', h:'Using this website.'},
    {type:'prose', blocks:[
      {h:'This site',p:'This website is provided for information about TeamBeam Outings and our services. We work to keep it accurate, but we do not warrant that everything is complete or current at all times.'},
      {h:'Our content',p:'The text, design and marks on this site — including the TeamBeam name and logo — belong to us. Please do not reproduce them without permission.'},
      {h:'Engaging us',p:'Nothing on this site is a binding offer. Any work we do together is governed by the specific proposal and agreement we share with you.'},
      {p:LEGAL_UPDATED+' Questions? Write to <a href="mailto:'+CFG.email+'">'+CFG.email+'</a>.'}
    ]}
  ]
},
{
  path:'/accessibility', crumb:'Accessibility',
  title:'Accessibility · TeamBeam Outings',
  desc:'Our commitment to keeping the TeamBeam Outings website usable for everyone.',
  ai:'TeamBeam Outings accessibility statement: the site targets WCAG 2.2 AA, with keyboard navigation, sufficient contrast and semantic structure.',
  sections:[
    {type:'hero', eyebrow:'Accessibility', h:'Built to be usable by everyone.',
      sub:'We want this site to work well for every visitor, however they browse.'},
    {type:'prose', blocks:[
      {h:'What we aim for',p:'We build to the WCAG 2.2 AA standard — sufficient colour contrast, full keyboard navigation, visible focus, meaningful structure for screen readers, and text that scales and reflows on any device.'},
      {h:'If something is not working',p:'Accessibility is never finished. If you hit a barrier on this site, please tell us at <a href="mailto:'+CFG.email+'">'+CFG.email+'</a> and we will fix it.'},
      {p:LEGAL_UPDATED}
    ]}
  ]
});

/* ---- build ---- */
function cp(src,dst){fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(src,dst);}
function write(rel,html){const f=path.join(OUT,rel,'index.html');fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,html);}
function writeFile(rel,txt){const f=path.join(OUT,rel);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,txt);}

function run(){
  fs.rmSync(OUT,{recursive:true,force:true}); fs.mkdirSync(OUT,{recursive:true});
  write('', homePage());
  PAGES.forEach(p=>write(p.path.replace(/^\//,''), renderPage(p)));
  writeFile('404.html', notFound());
  // assets
  cp(path.join(ASSETS,'styles.css'), path.join(OUT,'assets','styles.css'));
  ['fonts','img'].forEach(d=>{const dir=path.join(ASSETS,d); if(fs.existsSync(dir)) fs.readdirSync(dir).forEach(f=>cp(path.join(dir,f),path.join(OUT,'assets',d,f)));});
  if(fs.existsSync(path.join(ROOT,'site.webmanifest.src'))) {}
  // manifest (from assets/img if placed) — write directly
  writeFile('site.webmanifest', fs.readFileSync(path.join(ASSETS,'img','site.webmanifest'),'utf8'));
  // sitemap / robots / feeds
  const urls = ['/'].concat(PAGES.map(p=>p.path));
  writeFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`+
    urls.map(u=>`  <url><loc>${CFG.origin}${u}</loc>\n    <xhtml:link rel="alternate" hreflang="en-IN" href="${CFG.origin}${u}"/>\n    <xhtml:link rel="alternate" hreflang="en-US" href="${CFG.homes.us}${u}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${CFG.origin}${u}"/>\n  </url>`).join('\n')+`\n</urlset>\n`);
  writeFile('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${CFG.origin}/sitemap.xml\n`);
  writeFile('_headers', `/*\n  X-Content-Type-Options: nosniff\n  X-Frame-Options: SAMEORIGIN\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: geolocation=(), microphone=(), camera=()\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n`);
  writeFile('_redirects', `# URL-preservation redirects go here as pages are added. One hop, 301.\n`);

  // validation gate
  let checked=0, errors=[];
  (function scan(dir){fs.readdirSync(dir,{withFileTypes:true}).forEach(e=>{const fp=path.join(dir,e.name);
    if(e.isDirectory())return scan(fp); if(!e.name.endsWith('.html'))return;
    const html=fs.readFileSync(fp,'utf8');
    [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].forEach((m,i)=>{checked++;try{JSON.parse(m[1]);}catch(err){errors.push(fp+' #'+i+': '+err.message);}});
  });})(OUT);
  console.log('Pages: '+ (urls.length+1) + ' (home, 404)');
  console.log('Fonts: '+ (fs.existsSync(path.join(OUT,'assets','fonts'))?fs.readdirSync(path.join(OUT,'assets','fonts')).length:0));
  console.log('JSON-LD blocks: '+checked+ (errors.length?' — ERRORS':' — ALL VALID'));
  if(errors.length){console.error(errors.join('\n'));process.exit(1);}
  console.log('Build OK -> /site');
}
run();
