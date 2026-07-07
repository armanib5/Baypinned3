var C={
  market:{l:"Markets",i:"&#127805;",c:"#3d6b42"},
  foodhall:{l:"Food Hall",i:"&#127869;",c:"#b8860b"},
  bars:{l:"Bars & Restaurants",i:"&#127864;",c:"#6b1e3c"},
  artwalk:{l:"Art Walk",i:"&#127912;",c:"#2c5f8a"},
  cityart:{l:"City Art",i:"&#127917;",c:"#6a4e7a"},
  venue:{l:"Theaters",i:"&#127963;",c:"#7a5230"},
  holiday:{l:"Holiday",i:"&#9917;",c:"#8B0000"},
  shop:{l:"Shops",i:"&#128717;",c:"#c0392b"}
};
var ORD=["market","foodhall","bars","artwalk","cityart","venue","holiday","shop"];
var CN={sj:"San Jose, CA",sc:"Santa Clara, CA",sv:"Sunnyvale, CA",mv:"Mountain View, CA",camp:"Campbell, CA"};
var DEF=[
{id:"fm",cat:"market",lbl:"Weekly Market",exp:false,
 t:"Downtown SJ Farmers Market",w:"Wednesdays 9:00am - 1:30pm",d:"wed",
 a:"101 Paseo de San Antonio, San Jose, CA 95113",ph:"(408) 555-0100",wb:"https://downtownsanjosefarmersmarket.com",
 ds:"One of downtown San Jose's most beloved weekly traditions. Over 20 local farms and vendors every Wednesday on Paseo de San Antonio.",
 tags:["Produce","Weekly","Free Entry","Dog Friendly"],photo:"",g:[],mx:420,my:434,ed:"",ms:"",
 pk:"ParkSJ garage 90 min free. Entrances on 2nd and 3rd Street.",
 tr:"VTA Light Rail Convention Center stop 5 min walk. Routes 68 522.",
 ac:"Fully accessible. Wide pathways accessible parking.",
 fam:"Family friendly stroller-friendly.",
 fp:"2 min walk",fd:"18 min walk or 5 min ride",
 vg:[
  {g:"Farmers",items:["Xiong Farms - Asian veggies","Lopez Family Farm - conventional fruits","Bay Fresh - strawberries","Green Mix Ranch - organic veggies"]},
  {g:"Packaged Food",items:["California Bakeshop - artisanal bakery cookies empanadas","Brothers Products SF - hummus yogurt","Hurno - pastries","Mango Blossom Apiary - honey","Baby Tiger Bakery - conchas baked goods","Valley Toffee LLC - multi-variety toffee"]},
  {g:"Hot Food",items:["Dumpling King - dumplings","Chikens Tamales - tamales vegan empanadas","Thai Street Food - satay papaya salad thai tea","Jadens Kettle Corn","Cuisina Express - Filipino food"]},
  {g:"Arts and Crafts",items:["Sea Moss Healing - sea moss soaps","Plant Code - essential oils 2nd 4th Wed","Starme - handmade clothes"]}
 ]},
{id:"sm",cat:"foodhall",lbl:"Food Hall Daily",exp:false,
 t:"SoFA Market",w:"Open Daily 11am - 9pm",d:"daily",
 a:"387 S 1st St, San Jose, CA 95113",ph:"(408) 642-5270",wb:"https://sofamarketsj.com",
 ds:"A permanent downtown food hall with multiple restaurants and a craft cocktail bar in the SoFA District.",
 tags:["Food Hall","Daily","Permanent","Bar","Outdoor Seating"],photo:"",g:[],mx:480,my:572,ed:"",ms:"",
 pk:"Street parking on 1st and 2nd. ParkSJ on 2nd Street.",
 tr:"VTA Route 65 68 on 1st Street. 10 min walk from Convention Center.",
 ac:"Accessible entrance on S 1st Street.",fam:"Family friendly.",
 fp:"6 min walk south",fd:"22 min walk or 6 min ride",
 vg:[
  {g:"Restaurants",items:["Vietnoms - pho banh mi Vietnamese Ste 121","3 Hermanos Mexican - tacos burritos cocktail bar 105","Pizzeria Rosa Maria - wood-fired pizza 104","Umi Hand Roll Bar - sushi outdoor seating","Habana Cuba Restaurant - Cuban classics closed Mondays","Iscu Tea - temporarily closed"]},
  {g:"Bar",items:["Fountainhead Bar - craft cocktails back of SoFA Noon-9pm"]}
 ]},
{id:"wc",cat:"holiday",lbl:"World Cup Free",exp:false,
 t:"Soccer Celebration - World Cup Watch Party",w:"June 11 - July 19 All 104 matches live",d:"today",
 a:"San Pedro Square Market, 87 N San Pedro St, San Jose, CA 95110",ph:"(408) 792-3033",wb:"https://sanpedrosquaremarket.com",
 ds:"Bay Areas largest free World Cup watch party. All 104 FIFA World Cup 2026 matches live on multiple jumbo screens. Official San Jose USA Soccer watch party location.",
 tags:["Free","World Cup","Watch Party","All Matches"],photo:"",g:[],mx:200,my:248,ed:"2026-07-19",ms:"",
 pk:"San Pedro Street garage nearby.",tr:"VTA Route 522 on Santa Clara.",
 ac:"Accessible open air market.",fam:"Very family friendly all ages welcome.",
 fp:"12 min walk north",fd:"22 min walk or 6 min ride",vg:[]},
{id:"aw",cat:"artwalk",lbl:"Monthly Art Walk",exp:false,
 t:"South First Fridays ArtWalk",w:"First Friday Monthly 5pm - 9pm",d:"monthly",
 a:"South 1st Street, SoFA District, San Jose, CA",ph:"",wb:"https://southfirstfridays.com",
 ds:"Free self-guided evening art walk through downtown galleries museums live music and pop-up art installations.",
 tags:["Art","Music","Free","Monthly","All Ages"],photo:"",g:[],mx:480,my:568,ed:"",
 ms:"Confirming gallery list vendor lineup beer garden vintage market this month.",
 pk:"Street parking on S 1st 2nd 3rd. Free after 6pm in many garages.",
 tr:"VTA Route 65 68. Walk south from Convention Center light rail.",
 ac:"Most galleries fully accessible.",fam:"100 percent family friendly.",
 fp:"8 min walk south",fd:"24 min walk or 7 min ride",vg:[]},
{id:"gs",cat:"cityart",lbl:"City Art On View",exp:false,
 t:"Gaiascope at Circle of Palms",w:"May 22 - Aug 18 2026 Always open",d:"",
 a:"Circle of Palms Plaza, 127 S Market St, San Jose, CA 95113",ph:"",wb:"https://www.sanjoseca.gov",
 ds:"Three suspended kaleidoscope sculptures by artist Brooke Einbender at Circle of Palms Plaza next to Plaza de Cesar Chavez.",
 tags:["Public Art","Free","Always Open","Outdoor"],photo:"",g:[],mx:342,my:498,ed:"2026-08-18",ms:"",
 pk:"Market Street garage one block north.",tr:"VTA Convention Center stop 2 min walk.",
 ac:"Fully accessible outdoor plaza.",fam:"Very family friendly.",
 fp:"1 min walk adjacent",fd:"20 min walk or 5 min ride",vg:[]},
{id:"j4",cat:"holiday",lbl:"4th of July",exp:false,
 t:"4th of July Downtown Events",w:"Friday July 4 2026 Various times",d:"2026-07-04",
 a:"Downtown San Jose, CA Multiple Locations",ph:"",wb:"https://www.sanjoseca.gov",
 ds:"Independence Day celebrations across downtown San Jose. Fireworks live music food vendors and family activities.",
 tags:["Holiday","Fireworks","Free","Annual","Family"],photo:"",g:[],mx:420,my:468,ed:"2026-07-04",
 ms:"Full schedule not confirmed. Check sanjoseca.gov.",
 pk:"Arrive early. Many garages free on holiday.",tr:"Take VTA extra service on holiday.",
 ac:"Most venues accessible.",fam:"Perfect for families.",
 fp:"At or near Plaza de Cesar Chavez",fd:"20 min walk or 5 min ride",vg:[]},
{id:"ht",cat:"venue",lbl:"Theater Downtown",exp:false,
 t:"Hammer Theatre Center",w:"Box Office Hours Vary",d:"daily",
 a:"101 Paseo de San Antonio, San Jose, CA 95113",ph:"(408) 924-8501",wb:"https://www.hammertheatre.com",
 ds:"Premier performing arts venue on Paseo de San Antonio. Part of San Jose State University. Hosts theater dance opera and community performances year-round.",
 tags:["Theater","Performing Arts","SJSU","Downtown"],photo:"",g:[],mx:440,my:416,ed:"",ms:"",
 pk:"ParkSJ garages on 2nd and 3rd Street.",tr:"VTA light rail Convention Center stop 5 min walk.",
 ac:"Fully accessible.",fam:"Family friendly events check listings.",
 fp:"3 min walk",fd:"19 min walk",vg:[]},
{id:"ct",cat:"venue",lbl:"Historic Theater",exp:false,
 t:"California Theatre",w:"Box Office Hours Vary",d:"daily",
 a:"345 S 1st St, San Jose, CA 95113",ph:"(408) 792-4111",wb:"https://www.sanjosetheaters.org",
 ds:"Magnificently restored 1927 Spanish Colonial Revival theater. Home to Opera San Jose and Symphony Silicon Valley.",
 tags:["Theater","Opera","Symphony","Historic","1927"],photo:"",g:[],mx:480,my:553,ed:"",ms:"",
 pk:"Street parking on 1st and 2nd.",tr:"VTA Route 65 68 on 1st Street.",
 ac:"Accessible entrance and seating.",fam:"Family appropriate shows available.",
 fp:"5 min walk south",fd:"20 min walk",vg:[]},
{id:"cp",cat:"venue",lbl:"Performing Arts",exp:false,
 t:"Center for the Performing Arts",w:"Box Office Hours Vary",d:"daily",
 a:"255 Almaden Blvd, San Jose, CA 95113",ph:"(408) 792-4111",wb:"https://www.sanjosetheaters.org",
 ds:"Major performing arts center hosting Broadway shows concerts dance and cultural performances adjacent to the Convention Center.",
 tags:["Theater","Broadway","Concerts","Dance"],photo:"",g:[],mx:200,my:565,ed:"",ms:"",
 pk:"Adjacent garages. Convention Center garage nearby.",tr:"VTA Convention Center light rail stop 5 min walk.",
 ac:"Fully accessible large venue.",fam:"Many family-friendly shows.",
 fp:"8 min walk",fd:"15 min walk",vg:[]}
];

var KEY="pinnedsj-v9",evts=[],mS=1,mX=0,mY=0,pan=false,ps={x:0,y:0};

document.getElementById("zOv").onclick=function(){this.classList.remove("on");};
document.getElementById("postBtn").onclick=function(){openForm("");};
document.getElementById("postBtn2").onclick=function(){openForm("");};

function init(){
  load();
  renderToday();
  renderBoards();
  renderPins();
  setupPan();
  setupBgParallax();
  setupBackToTop();
  setupNavOffset();
}

/* The top nav wraps to 2-3 rows on narrow screens (logo/buttons/city
   picker/post button don't all fit on one line), so its real height isn't
   the fixed 52px the sticky category bar below it assumed - that caused
   the category bar to sit on top of the wrapped nav instead of under it
   on mobile. Measuring the actual rendered height keeps them stacked
   correctly at any width or font-load state. */
function setupNavOffset(){
  var nav=document.querySelector(".nav");
  if(!nav)return;
  var raf=null;
  function sync(){document.documentElement.style.setProperty("--nav-h",nav.offsetHeight+"px");}
  sync();
  window.addEventListener("resize",function(){
    if(raf)cancelAnimationFrame(raf);
    raf=requestAnimationFrame(sync);
  });
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(sync);
}

/* Background photo drifts and zooms slightly in the direction of whatever
   the visitor is swiping/scrolling through (page scroll = vertical,
   ticker/flyer strips = horizontal), so it feels like the scene is moving
   with them rather than sitting static behind the corkboard. The .bg
   layer is scaled up a bit as a buffer so panning never reveals its edges. */
var bgX=0,bgY=0,bgScale=1.06;
function applyBgTransform(){
  var bg=document.querySelector(".bg");
  if(bg)bg.style.transform="translate3d("+bgX+"px,"+bgY+"px,0) scale("+bgScale+")";
}
function bindStripParallax(el){
  if(!el)return;
  el.addEventListener("scroll",function(){
    bgX=Math.max(-40,Math.min(40,el.scrollLeft*0.05));
    bgScale=1.06+Math.min(Math.abs(el.scrollLeft)/2500,0.05);
    applyBgTransform();
  },{passive:true});
}
function setupBgParallax(){
  window.addEventListener("scroll",function(){
    bgY=Math.max(-40,Math.min(40,window.scrollY*0.04));
    bgScale=1.06+Math.min(window.scrollY/3000,0.05);
    applyBgTransform();
  },{passive:true});
  bindStripParallax(document.getElementById("tdCrds"));
  bindStripParallax(document.getElementById("wkCrds"));
}

function load(){
  try{var r=localStorage.getItem(KEY);evts=r?JSON.parse(r):JSON.parse(JSON.stringify(DEF));}
  catch(e){evts=JSON.parse(JSON.stringify(DEF));}
  expire();
}
function save(){
  try{localStorage.setItem(KEY,JSON.stringify(evts));}
  catch(e){alert("This flyer couldn't be saved - your browser's local storage is full. Try removing an old flyer or photo, then try again.");}
}
function expire(){
  var t=new Date().toISOString().slice(0,10);
  evts.forEach(function(e){if(e.ed&&e.ed<t)e.exp=true;});
}
function isToday(ev){
  var d=new Date(),dn=["sun","mon","tue","wed","thu","fri","sat"][d.getDay()];
  if(!ev.d)return false;
  if(ev.d==="daily"||ev.d==="today")return true;
  if(ev.d===dn)return true;
  if(ev.d==="monthly"){
    if(d.getDay()!==5)return false;
    var f=new Date(d.getFullYear(),d.getMonth(),1);
    while(f.getDay()!==5)f.setDate(f.getDate()+1);
    return d.getDate()===f.getDate();
  }
  if(ev.d&&ev.d.length===10)return ev.d===new Date().toISOString().slice(0,10);
  return false;
}
function isWeek(ev){return!isToday(ev)&&!ev.exp&&["daily","wed","thu","fri","sat","sun","mon","tue","monthly"].indexOf(ev.d)>=0;}

/* Each city gets its own downtown background photo. Until real photos are
   supplied for Santa Clara/Sunnyvale/Mountain View/Campbell, they fall
   back to the San Jose photo so the layer never 404s. */
var CITY_BG={sj:"img/background.jpg",sc:"img/bg-sc.jpg",sv:"img/bg-sv.jpg",mv:"img/bg-mv.jpg",camp:"img/bg-camp.jpg"};
function setCityBg(v){
  var bg=document.querySelector(".bg");if(!bg)return;
  var file=CITY_BG[v]||CITY_BG.sj;
  bg.style.backgroundImage="linear-gradient(180deg,rgba(15,8,0,.5),rgba(20,10,0,.28) 50%,rgba(12,6,0,.52)),url('"+file+"')";
}

function setCity(v){
  document.getElementById("citylbl").textContent=CN[v]||v;
  setCityBg(v);
  var bv=document.getElementById("bView");
  if(v!=="sj"){
    bv.innerHTML="<div class='soon'>"+(CN[v]||v)+"<p>Events coming soon. Be the first to post a flyer!</p></div>";
    document.getElementById("tdwrap").style.display="none";
  }else{
    document.getElementById("tdwrap").style.display="block";
    renderBoards();
  }
}

function renderToday(){
  var tc=document.getElementById("tdCrds"),wc=document.getElementById("wkCrds");
  var td=evts.filter(function(e){return isToday(e)&&!e.exp;});
  var wk=evts.filter(function(e){return isWeek(e);});
  var none="<div style='color:rgba(218,184,112,.35);padding:16px;font-size:13px;'>Nothing confirmed yet</div>";
  tc.innerHTML=none;wc.innerHTML=none;
  if(td.length){tc.innerHTML="";td.forEach(function(ev){tc.appendChild(mkTCard(ev));});}
  if(wk.length){wc.innerHTML="";wk.forEach(function(ev){wc.appendChild(mkTCard(ev));});}
}

function mkTCard(ev){
  var ico=C[ev.cat]?C[ev.cat].i:"&#128204;";
  var d=document.createElement("div");
  d.className="tc";
  var imgDiv=document.createElement("div");
  imgDiv.className="tcimg";
  if(ev.photo){imgDiv.style.backgroundImage="url("+ev.photo+")";imgDiv.style.backgroundSize="cover";imgDiv.style.backgroundPosition="center";}
  else{imgDiv.innerHTML=ico;}
  var body=document.createElement("div");
  body.className="tcbody";
  body.innerHTML="<h4>"+ev.t+"</h4><div class='tw'>"+ev.w+"</div>";
  d.appendChild(imgDiv);d.appendChild(body);
  d.addEventListener("click",function(){openDetail(ev.id);});
  return d;
}

function renderBoards(){
  var bv=document.getElementById("bView");
  bv.innerHTML="";
  ORD.forEach(function(cat){
    var items=evts.filter(function(e){return e.cat===cat;});
    if(!items.length&&cat!=="venue"&&cat!=="shop"&&cat!=="bars")return;
    bv.appendChild(mkBoard(cat,items));
  });
  setupCatScrollSpy();
}

/* Keeps the sticky category bar in sync with whichever board is in view,
   so it doubles as a "you are here" guide instead of just a set of jump
   links - lights up the matching pill as the visitor scrolls up or down
   past a board's frame. Re-run after every renderBoards() since the
   .bsec sections it observes are rebuilt from scratch each time. */
var catObserver=null;
function setupCatScrollSpy(){
  if(catObserver){catObserver.disconnect();catObserver=null;}
  var catBtns={};
  document.querySelectorAll(".cnav .cc[data-cat]").forEach(function(b){catBtns[b.dataset.cat]=b;});
  var sections=document.querySelectorAll(".bsec");
  Object.keys(catBtns).forEach(function(k){catBtns[k].classList.remove("on");});
  if(!sections.length||!("IntersectionObserver" in window))return;
  catObserver=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting)return;
      var cat=entry.target.id.replace("board-","");
      Object.keys(catBtns).forEach(function(k){catBtns[k].classList.toggle("on",k===cat);});
    });
  },{rootMargin:"-100px 0px -70% 0px",threshold:0});
  sections.forEach(function(s){catObserver.observe(s);});
}

function setupBackToTop(){
  var btn=document.getElementById("toTopBtn");
  if(!btn)return;
  window.addEventListener("scroll",function(){
    btn.classList.toggle("show",window.scrollY>420);
  },{passive:true});
  btn.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"});});
}

function mkBoard(cat,items){
  var a=items.filter(function(e){return!e.exp;}).length;
  var p=items.filter(function(e){return e.exp;}).length;
  var sec=document.createElement("section");
  sec.className="bsec";sec.id="board-"+cat;

  var lbl=document.createElement("div");lbl.className="blbl";
  var dot=document.createElement("span");dot.className="dot "+cat;
  var h2=document.createElement("h2");h2.textContent=C[cat]?C[cat].l:cat;
  var bi=document.createElement("span");bi.className="bi";
  bi.textContent=a+" active"+(p?" - "+p+" past":"");
  lbl.appendChild(dot);lbl.appendChild(h2);lbl.appendChild(bi);

  var frame=document.createElement("div");frame.className="frame compact";
  var cork=document.createElement("div");cork.className="cork";
  var stripWrap=document.createElement("div");stripWrap.className="strip-wrap";
  var stringLine=document.createElement("div");stringLine.className="string-line";
  var fstrip=document.createElement("div");fstrip.className="fstrip";
  fstrip.id="fr-"+cat;
  stripWrap.appendChild(stringLine);stripWrap.appendChild(fstrip);
  cork.appendChild(stripWrap);
  frame.appendChild(cork);

  sec.appendChild(lbl);sec.appendChild(frame);

  var slotIdx=0;
  items.forEach(function(ev){
    fstrip.appendChild(mkPinSlot(mkFlyer(ev),slotIdx++));
  });

  var afc=document.createElement("div");afc.className="afc";
  var ap=document.createElement("div");ap.className="ap";ap.textContent="+";
  var al=document.createElement("div");al.className="al";al.textContent="Post a Flyer";
  afc.appendChild(ap);afc.appendChild(al);
  afc.addEventListener("click",(function(c){return function(){openForm(c);};})(cat));
  fstrip.appendChild(mkPinSlot(afc,slotIdx++));

  while(slotIdx<4){
    var empty=document.createElement("div");empty.className="fc-empty";
    empty.addEventListener("click",(function(c){return function(){openForm(c);};})(cat));
    fstrip.appendChild(mkPinSlot(empty,slotIdx++));
  }

  bindStripParallax(fstrip);

  return sec;
}

/* Wraps a card in a clothespin-clipped slot on the board's string.
   Rotation is applied inline (rather than via CSS nth-child) since each
   strip now scrolls instead of laying out in a fixed 3-column grid. */
function mkPinSlot(card,idx){
  var rotations=["-2deg","1.5deg","-1deg"];
  card.style.transform="rotate("+rotations[idx%3]+")";
  var slot=document.createElement("div");slot.className="pin-slot";
  var pin=document.createElement("div");pin.className="clothespin";
  slot.appendChild(pin);slot.appendChild(card);
  return slot;
}

/* Tapping a flyer opens the full detail modal directly (it used to flip
   in place to a small vendor list first — that flip is now the Vendor Hub
   view reachable from inside the modal via the top-left toggle button,
   see openDetail/toggleVendorView, which has room to show it properly). */
function mkFlyer(ev){
  var ico=C[ev.cat]?C[ev.cat].i:"&#128204;";

  var fc=document.createElement("div");fc.className="fc"+(ev.exp?" exp":"");

  var fimg=document.createElement("div");fimg.className="fimg"+(ev.photo?" hp":"");
  if(ev.photo){fimg.style.backgroundImage="url("+ev.photo+")";fimg.style.backgroundSize="cover";fimg.style.backgroundPosition="center";}
  else{
    fimg.innerHTML=ico;
    if(ev.exp){var etag=document.createElement("div");etag.className="etag";etag.textContent="Past";fimg.appendChild(etag);}
  }

  var fb=document.createElement("div");fb.className="fb";
  var rib=document.createElement("span");rib.className="rib "+ev.cat;rib.textContent=ev.lbl;
  var h3=document.createElement("h3");h3.textContent=ev.t;
  var fw=document.createElement("div");fw.className="fw";fw.textContent=ev.w;
  var fa=document.createElement("div");fa.className="fa";fa.textContent=ev.a.split(",")[0];
  fb.appendChild(rib);fb.appendChild(h3);fb.appendChild(fw);fb.appendChild(fa);

  fc.appendChild(fimg);fc.appendChild(fb);
  fc.addEventListener("click",function(){openDetail(ev.id);});
  return fc;
}

function openDetail(id){
  var ev=evts.find(function(e){return e.id===id;});
  if(!ev)return;
  var mu="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(ev.a);
  var ico=C[ev.cat]?C[ev.cat].i:"&#128204;";
  var dp=document.getElementById("detPanel");
  dp.innerHTML="";
  dp.dataset.eid=id;

  var xb=document.createElement("button");xb.className="xbtn";xb.textContent="X";
  xb.onclick=cls;dp.appendChild(xb);

  var vhBtn=document.createElement("button");vhBtn.className="xbtnL";vhBtn.id="vhToggle";
  vhBtn.innerHTML="&#128722;";vhBtn.title="Vendor Hub";
  vhBtn.onclick=function(e){e.stopPropagation();toggleVendorView();};
  dp.appendChild(vhBtn);

  var hero=document.createElement("div");hero.className="dhero"+(ev.photo?" hp":"");
  if(ev.photo){hero.style.backgroundImage="url("+ev.photo+")";hero.style.backgroundSize="cover";hero.style.backgroundPosition="center";}
  else{hero.innerHTML=ico;}
  dp.appendChild(hero);

  var body=document.createElement("div");body.className="dbody";body.id="infoView";

  var rib=document.createElement("span");rib.className="rib "+ev.cat;rib.style.marginBottom="9px";rib.textContent=ev.lbl;
  var h2=document.createElement("h2");h2.textContent=ev.t;
  var dw=document.createElement("div");dw.className="dw";dw.textContent=ev.w;

  var dloc=document.createElement("div");dloc.className="dloc";
  var dadr=document.createElement("span");dadr.className="dadr";dadr.textContent=ev.a;
  var mapBtn=document.createElement("a");mapBtn.className="ab blue";mapBtn.href=mu;mapBtn.target="_blank";mapBtn.textContent="Open in Maps";
  dloc.appendChild(dadr);dloc.appendChild(mapBtn);

  body.appendChild(rib);body.appendChild(h2);body.appendChild(dw);body.appendChild(dloc);

  if(ev.exp){var ew=document.createElement("div");ew.className="warn r";ew.textContent="This event has ended.";body.appendChild(ew);}
  if(ev.ms){var mw=document.createElement("div");mw.className="warn";mw.textContent=ev.ms;body.appendChild(mw);}

  var desc=document.createElement("p");desc.className="ddesc";desc.textContent=ev.ds;body.appendChild(desc);

  var tags=document.createElement("div");tags.className="dtags";
  (ev.tags||[]).forEach(function(t){var s=document.createElement("span");s.className="dtag";s.textContent=t;tags.appendChild(s);});
  body.appendChild(tags);

  if(ev.ph){var pline=document.createElement("p");pline.style.cssText="font-size:13px;margin-bottom:6px;";pline.innerHTML="Phone: <a href='tel:"+ev.ph+"' style='color:#2c5f8a;'>"+ev.ph+"</a>";body.appendChild(pline);}
  if(ev.wb){var wline=document.createElement("p");wline.style.cssText="font-size:13px;margin-bottom:14px;";wline.innerHTML="<a href='"+ev.wb+"' target='_blank' style='color:#2c5f8a;'>Visit Website</a>";body.appendChild(wline);}

  var igrid=document.createElement("div");igrid.className="igrid";
  function mkIbox(label,val){var b=document.createElement("div");b.className="ibox";b.innerHTML="<h4>"+label+"</h4><p>"+(val||"See organizer.")+"</p>";return b;}
  igrid.appendChild(mkIbox("Parking",ev.pk));
  igrid.appendChild(mkIbox("Transit",ev.tr));
  igrid.appendChild(mkIbox("Accessibility",ev.ac));
  igrid.appendChild(mkIbox("Family",ev.fam));
  if(ev.fp)igrid.appendChild(mkIbox("From Plaza",ev.fp));
  if(ev.fd)igrid.appendChild(mkIbox("From Diridon",ev.fd));
  body.appendChild(igrid);

  var btns=document.createElement("div");btns.className="dbtnrow";
  var sh=document.createElement("button");sh.className="ab gray";sh.textContent="Share";sh.onclick=(function(id){return function(){shareEv(id);};})(ev.id);
  var ed=document.createElement("button");ed.className="ab green";ed.textContent="Edit";ed.onclick=(function(id){return function(){editEv(id);};})(ev.id);
  var dl=document.createElement("button");dl.className="ab dark";dl.textContent="Remove";dl.onclick=(function(id){return function(){delEv(id);};})(ev.id);
  btns.appendChild(sh);btns.appendChild(ed);btns.appendChild(dl);
  body.appendChild(btns);

  dp.appendChild(body);
  dp.appendChild(buildVendorHub(ev));
  document.getElementById("detOv").classList.add("on");
  hPin(id);
}

/* The bigger Vendor Hub view for an event, reached via the top-left toggle
   button in openDetail instead of the old small in-card flip. Combines the
   registered-vendor list (boost/featured sorted, tap to open a vendor's
   own page) with the free-text vendor directory groups. */
function buildVendorHub(ev){
  var vhub=document.createElement("div");vhub.className="dbody";vhub.id="vhubView";vhub.style.display="none";

  var vh2=document.createElement("h2");vh2.textContent="Vendor Hub";
  var vsub=document.createElement("div");vsub.className="dw";vsub.textContent=ev.t;
  vhub.appendChild(vh2);vhub.appendChild(vsub);

  var linked=(typeof eventVendors==="function"?eventVendors(ev):[]).slice().sort(function(a,b){
    var av=(a.featured?2:0)+(a.boost&&a.boost.active?1:0);
    var bv=(b.featured?2:0)+(b.boost&&b.boost.active?1:0);
    return bv-av;
  });
  var list=document.createElement("div");list.className="vhub-list";
  if(linked.length){
    linked.forEach(function(v){
      var row=document.createElement("div");row.className="vhub-row";
      var nm=document.createElement("span");nm.className="vhub-name";nm.textContent=v.name;
      row.appendChild(nm);
      if(v.featured||(v.boost&&v.boost.active)){
        var badge=document.createElement("span");badge.className="vhub-badge";
        badge.textContent=(v.boost&&v.boost.active)?vBoostLabel(v.boost.tier):"Featured";
        row.appendChild(badge);
      }
      row.addEventListener("click",(function(vid){return function(){openVendorDetail(vid);};})(v.id));
      list.appendChild(row);
    });
  }else{
    var none=document.createElement("div");none.className="vhub-none";none.textContent="No vendors listed yet.";
    list.appendChild(none);
  }
  vhub.appendChild(list);

  var cta=document.createElement("div");cta.className="vhub-cta";
  cta.textContent="Want your business seen here? Boost or feature your listing.";
  vhub.appendChild(cta);

  var addV=document.createElement("button");addV.className="sugbtn";addV.textContent="+ Add Your Business";
  addV.onclick=(function(cat,eid){return function(){openVendorForm(cat,"",eid);};})(ev.cat,ev.id);
  vhub.appendChild(addV);

  if(ev.vg&&ev.vg.length){
    var vsec=document.createElement("div");vsec.className="vsec";
    var vh3=document.createElement("h3");vh3.textContent="Vendors and Directory";
    vsec.appendChild(vh3);
    var vf=document.createElement("div");vf.className="vfilts";
    var allBtn=document.createElement("button");allBtn.className="vbtn on";allBtn.textContent="All";allBtn.dataset.g="all";allBtn.onclick=function(){vFilter(allBtn);};
    vf.appendChild(allBtn);
    ev.vg.forEach(function(gr){
      var gb=document.createElement("button");gb.className="vbtn";gb.textContent=gr.g;gb.dataset.g=gr.g;
      gb.onclick=function(){vFilter(gb);};
      vf.appendChild(gb);
    });
    vsec.appendChild(vf);
    ev.vg.forEach(function(gr){
      var grDiv=document.createElement("div");grDiv.className="vgrp";grDiv.dataset.g=gr.g;
      var gh=document.createElement("h4");gh.textContent=gr.g;grDiv.appendChild(gh);
      gr.items.forEach(function(item){
        var vi=document.createElement("div");vi.className="vi";vi.dataset.g=gr.g;vi.textContent=item;
        grDiv.appendChild(vi);
      });
      vsec.appendChild(grDiv);
    });
    var sug=document.createElement("button");sug.className="sugbtn";sug.textContent="+ Suggest a vendor";
    sug.onclick=(function(id){return function(){openSug(id);};})(ev.id);
    vsec.appendChild(sug);
    vhub.appendChild(vsec);
  }

  return vhub;
}

function toggleVendorView(){
  var info=document.getElementById("infoView"),vhub=document.getElementById("vhubView"),btn=document.getElementById("vhToggle");
  if(!info||!vhub||!btn)return;
  var showingHub=vhub.style.display!=="none";
  if(showingHub){
    vhub.style.display="none";info.style.display="block";
    btn.innerHTML="&#128722;";btn.title="Vendor Hub";
  }else{
    info.style.display="none";vhub.style.display="block";
    btn.innerHTML="&#8505;";btn.title="Event Info";
  }
}

function vFilter(btn){
  var g=btn.dataset.g;
  var sec=btn.closest(".vsec");
  sec.querySelectorAll(".vbtn").forEach(function(b){b.classList.remove("on");});
  btn.classList.add("on");
  sec.querySelectorAll(".vgrp").forEach(function(el){
    (g==="all"||el.dataset.g===g)?el.classList.remove("hidden"):el.classList.add("hidden");
  });
}

function cls(){
  document.getElementById("detOv").classList.remove("on");
  document.getElementById("frmOv").classList.remove("on");
  document.getElementById("detPanel").innerHTML="";
  document.getElementById("frmPanel").innerHTML="";
  document.querySelectorAll(".mp.pulse").forEach(function(p){p.classList.remove("pulse");});
}

function shareEv(id){
  var ev=evts.find(function(e){return e.id===id;});if(!ev)return;
  if(navigator.share)navigator.share({title:ev.t,text:ev.ds,url:location.href});
  else{try{navigator.clipboard.writeText(location.href).then(function(){alert("Link copied!");});}catch(e){alert("Copy the URL from your browser bar.");}}
}

function delEv(id){
  if(!confirm("Remove this flyer?"))return;
  evts=evts.filter(function(e){return e.id!==id;});
  save();cls();renderBoards();renderToday();renderPins();
}

function editEv(id){
  var ev=evts.find(function(e){return e.id===id;});if(!ev)return;
  cls();openForm(ev.cat);
  setTimeout(function(){
    var fp=document.getElementById("frmPanel");fp.dataset.eid=id;
    function sv(i,v){var el=document.getElementById(i);if(el)el.value=v||"";}
    sv("ft",ev.t);sv("fl",ev.lbl);sv("fw",ev.w);sv("fa",ev.a);
    sv("fph",ev.ph);sv("fws",ev.wb);sv("fd",ev.ds);
    sv("ft2",(ev.tags||[]).join(", "));sv("fen",ev.ed);
    document.getElementById("fcat").value=ev.cat;
    document.getElementById("fdate").value=ev.d||"";
  },60);
}

function openSug(lid){
  var fp=document.getElementById("frmPanel");
  fp.innerHTML="<div class='fi'><h2>Suggest a Vendor</h2><label>Group (e.g. Hot Food)</label><input id='sg' type='text' placeholder='e.g. Hot Food'><label>Vendor name and what they sell</label><input id='sn' type='text' placeholder='e.g. Rosarios Tacos - carnitas horchata'><div class='facts'><button class='bcan' id='sgBack'>Back</button><button class='bsub' id='sgSub'>Submit</button></div></div>";
  document.getElementById("sgBack").onclick=function(){openDetail(lid);};
  document.getElementById("sgSub").onclick=function(){subSug(lid);};
  document.getElementById("detOv").classList.remove("on");
  document.getElementById("frmOv").classList.add("on");
}

function subSug(lid){
  var g=document.getElementById("sg").value.trim()||"Suggested";
  var n=document.getElementById("sn").value.trim();
  if(!n){alert("Please add a vendor name.");return;}
  var ev=evts.find(function(e){return e.id===lid;});
  if(!ev.vg)ev.vg=[];
  var vg=ev.vg.find(function(x){return x.g.toLowerCase()===g.toLowerCase();});
  if(!vg){vg={g:g,items:[]};ev.vg.push(vg);}
  vg.items.push(n+" (suggested - pending confirmation)");
  save();cls();openDetail(lid);
}

function openForm(defCat){
  var fp=document.getElementById("frmPanel");
  var opts=Object.entries(C).map(function(e){return "<option value='"+e[0]+"'>"+e[1].l+"</option>";}).join("");
  fp.innerHTML="<div class='fi'><h2>Post a Flyer</h2><label>Title *</label><input id='ft' type='text' placeholder='e.g. Japantown Night Market'><label>Category</label><select id='fcat'>"+opts+"</select><label>Short label shown on flyer</label><input id='fl' type='text' placeholder='e.g. Weekly Market'><label>When</label><input id='fw' type='text' placeholder='e.g. Saturdays 10am-2pm'><label>Date or recurrence</label><select id='fdate'><option value=''>None</option><option value='today'>Today</option><option value='daily'>Every Day</option><option value='mon'>Mondays</option><option value='tue'>Tuesdays</option><option value='wed'>Wednesdays</option><option value='thu'>Thursdays</option><option value='fri'>Fridays</option><option value='sat'>Saturdays</option><option value='sun'>Sundays</option><option value='monthly'>First Friday Monthly</option></select><label>Address *</label><input id='fa' type='text' placeholder='e.g. 87 N San Pedro St San Jose CA'><label>Phone</label><input id='fph' type='text' placeholder='(408) 555-0100'><label>Website</label><input id='fws' type='text' placeholder='https://'><label>Description</label><textarea id='fd' placeholder='Tell people what this is...'></textarea><label>Tags (comma separated)</label><input id='ft2' type='text' placeholder='Free Family Outdoor'><label>End date (auto-expires)</label><input id='fen' type='date'><label>Photo (optional)</label><input id='fp2' type='file' accept='image/*'><div class='facts'><button class='bcan' id='frmCan'>Cancel</button><button class='bsub' id='frmSub'>Pin It Up</button></div></div>";
  if(defCat)document.getElementById("fcat").value=defCat;
  document.getElementById("frmCan").onclick=cls;
  document.getElementById("frmSub").onclick=subForm;
  document.getElementById("frmOv").classList.add("on");
}

function subForm(){
  var t=document.getElementById("ft").value.trim();
  var a=document.getElementById("fa").value.trim();
  if(!t||!a){alert("Please add a title and address.");return;}
  var cat=document.getElementById("fcat").value;
  var eid=document.getElementById("frmPanel").dataset.eid;
  var ev={id:eid||"u"+Date.now(),cat:cat,
    lbl:document.getElementById("fl").value.trim()||(C[cat]?C[cat].l:cat),
    t:t,w:document.getElementById("fw").value.trim()||"See details",
    d:document.getElementById("fdate").value||"",a:a,
    ph:document.getElementById("fph").value.trim(),
    wb:document.getElementById("fws").value.trim(),
    ds:document.getElementById("fd").value.trim(),
    tags:document.getElementById("ft2").value.split(",").map(function(s){return s.trim();}).filter(Boolean),
    ed:document.getElementById("fen").value||"",photo:"",g:[],exp:false,ms:"",
    mx:390+(Math.random()-.5)*100,my:420+(Math.random()-.5)*80,
    pk:"Contact organizer.",tr:"Check VTA.org.",ac:"Contact organizer.",
    fam:"Contact organizer.",fp:"See Google Maps",fd:"See Google Maps",vg:[]};
  function done(){
    if(eid){var i=evts.findIndex(function(e){return e.id===eid;});if(i>=0){ev.g=evts[i].g||[];evts[i]=ev;}}
    else evts.push(ev);
    expire();save();cls();renderBoards();renderToday();renderPins();
  }
  var pf=document.getElementById("fp2").files[0];
  if(pf){resizeImageFile(pf,1100,0.82,function(dataUrl){ev.photo=dataUrl;done();});}
  else done();
}

function renderPins(){
  var g=document.getElementById("ePins");if(!g)return;g.innerHTML="";
  evts.filter(function(e){return e.mx&&e.my;}).forEach(function(ev){
    var col=C[ev.cat]?C[ev.cat].c:"#666",ico=C[ev.cat]?C[ev.cat].i:"&#128204;";
    var pg=document.createElementNS("http://www.w3.org/2000/svg","g");
    pg.setAttribute("class","mp");pg.setAttribute("id","pin-"+ev.id);
    var circ=document.createElementNS("http://www.w3.org/2000/svg","circle");
    circ.setAttribute("cx",ev.mx);circ.setAttribute("cy",ev.my);circ.setAttribute("r","13");
    circ.setAttribute("fill",col);circ.setAttribute("stroke","white");circ.setAttribute("stroke-width","2.5");
    circ.setAttribute("opacity",ev.exp?"0.35":"0.92");
    var txt=document.createElementNS("http://www.w3.org/2000/svg","text");
    txt.setAttribute("x",ev.mx);txt.setAttribute("y",ev.my+5);
    txt.setAttribute("text-anchor","middle");txt.setAttribute("font-size","11");
    txt.style.pointerEvents="none";txt.innerHTML=ico;
    pg.appendChild(circ);pg.appendChild(txt);
    pg.addEventListener("click",(function(id){return function(){openDetail(id);showMap();};})(ev.id));
    g.appendChild(pg);
    var lb=document.createElementNS("http://www.w3.org/2000/svg","text");
    lb.setAttribute("x",ev.mx);lb.setAttribute("y",ev.my+24);
    lb.setAttribute("text-anchor","middle");lb.setAttribute("font-family","Special Elite,monospace");
    lb.setAttribute("font-size","8.5");lb.setAttribute("fill","#1a0e00");
    lb.style.pointerEvents="none";
    lb.textContent=ev.t.split(" ").slice(0,3).join(" ");
    g.appendChild(lb);
  });
}

function hPin(id){
  document.querySelectorAll(".mp.pulse").forEach(function(p){p.classList.remove("pulse");});
  var p=document.getElementById("pin-"+id);if(p)p.classList.add("pulse");
}
function zMap(f){
  var vp=document.getElementById("mvp"),ns=Math.max(.6,Math.min(4,mS*f));
  var cx=vp.clientWidth/2,cy=vp.clientHeight/2;
  mX=cx-(cx-mX)*(ns/mS);mY=cy-(cy-mY)*(ns/mS);mS=ns;applyMap();
}
function rMap(){mS=1;centerMap();}
function applyMap(){
  var m=document.getElementById("mainMap");
  if(m){m.style.transform="translate("+mX+"px,"+mY+"px) scale("+mS+")";m.style.transformOrigin="0 0";}
}
/* Centers the viewport on Plaza de Cesar Chavez (the SVG's main downtown
   landmark, at 420,470) instead of defaulting to the map's top-left
   corner - the map used to open needing a lot of manual panning just to
   find it. */
function centerMap(){
  var vp=document.getElementById("mvp");
  if(!vp||!vp.clientWidth)return;
  mX=vp.clientWidth/2-420*mS;
  mY=vp.clientHeight/2-470*mS;
  applyMap();
}
function setupPan(){
  var vp=document.getElementById("mvp");if(!vp)return;
  vp.addEventListener("mousedown",function(e){pan=true;ps={x:e.clientX-mX,y:e.clientY-mY};vp.classList.add("gr");e.preventDefault();});
  window.addEventListener("mousemove",function(e){if(!pan)return;mX=e.clientX-ps.x;mY=e.clientY-ps.y;applyMap();});
  window.addEventListener("mouseup",function(){pan=false;var v=document.getElementById("mvp");if(v)v.classList.remove("gr");});
  vp.addEventListener("touchstart",function(e){if(e.touches.length===1){pan=true;ps={x:e.touches[0].clientX-mX,y:e.touches[0].clientY-mY};}},{passive:true});
  vp.addEventListener("touchmove",function(e){if(!pan||e.touches.length!==1)return;mX=e.touches[0].clientX-ps.x;mY=e.touches[0].clientY-ps.y;applyMap();},{passive:true});
  vp.addEventListener("touchend",function(){pan=false;});
}
function showBoards(){
  document.getElementById("bView").style.display="block";
  document.getElementById("tdwrap").style.display="block";
  document.getElementById("mapSec").style.display="none";
  document.getElementById("adminSec").style.display="none";
  document.getElementById("nB").classList.add("on");
  document.getElementById("nM").classList.remove("on");
}
function showMap(){
  document.getElementById("bView").style.display="none";
  document.getElementById("tdwrap").style.display="none";
  document.getElementById("mapSec").style.display="block";
  document.getElementById("adminSec").style.display="none";
  document.getElementById("nM").classList.add("on");
  document.getElementById("nB").classList.remove("on");
  centerMap();
}
function scrollToday(){showBoards();document.getElementById("tdwrap").scrollIntoView({behavior:"smooth"});}
function jumpTo(cat){
  showBoards();
  setTimeout(function(){var t=document.getElementById("board-"+cat);if(t)t.scrollIntoView({behavior:"smooth",block:"start"});},80);
}
document.addEventListener("DOMContentLoaded",init);
