/* Vendors — data and interactions. Vendor profiles are surfaced inside
   each event's detail view (see the "Registered Vendors" section built in
   js/app.js openDetail) and as pins on the map, rather than as a separate
   standalone page. Depends on globals from js/app.js (C, evts, openDetail,
   showMap, cls) and js/storage.js (Storage). Loaded after both. */
var vendors = [];
var VFAV_KEY = "vendor-favs-v1";
var VDATA_KEY = "vendors-v1";

function loadVendors() {
  vendors = Storage.get(VDATA_KEY, null) || JSON.parse(JSON.stringify(VENDOR_DEF));
}
function saveVendors() {
  if (!Storage.set(VDATA_KEY, vendors)) {
    alert("This business couldn't be saved - your browser's local storage is full. Try removing an old photo, then try again.");
  }
}

/* Runs immediately (not inside DOMContentLoaded) so `vendors` is already
   populated by the time app.js's init() renders the boards - both files
   listen for DOMContentLoaded, and app.js's listener was registered first
   since its <script> tag comes first, so waiting until then would be too
   late for the vendor lists on each flyer's back to have real data. */
loadVendors();

function getFavs() { return Storage.get(VFAV_KEY, []); }
function isFav(id) { return getFavs().indexOf(id) >= 0; }
function toggleFav(id) {
  var favs = getFavs();
  var i = favs.indexOf(id);
  if (i >= 0) favs.splice(i, 1); else favs.push(id);
  Storage.set(VFAV_KEY, favs);
}

function vendorEvents(v) {
  return (v.events || []).map(function (id) {
    return evts.find(function (e) { return e.id === id; });
  }).filter(Boolean);
}
function eventVendors(ev) {
  return vendors.filter(function (v) { return (v.events || []).indexOf(ev.id) >= 0; });
}

/* Vendor profile detail — reuses the same .dpanel/.dhero/.dbody/.igrid
   markup the event detail modal already uses, so it looks consistent
   without needing its own CSS. */
function openVendorDetail(id, fromEventId) {
  var v = vendors.find(function (x) { return x.id === id; }); if (!v) return;
  var cat = C[v.cat] || { l: v.cat, i: "&#128204;", c: "#666" };
  var mu = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(v.address || v.name);
  var dp = document.getElementById("detPanel");
  dp.innerHTML = "";
  dp.dataset.vid = id;
  dp.dataset.fromEvent = fromEventId || "";
  delete dp.dataset.eid;

  var xb = document.createElement("button"); xb.className = "xbtn"; xb.textContent = "X";
  xb.onclick = cls; dp.appendChild(xb);

  /* Only vendors opened from inside an event's Vendor Hub list carry a
     fromEventId - map-pin/search-opened vendors have nowhere to "go
     back" to, so they keep just the X close button. */
  if (fromEventId) {
    var backBtn = document.createElement("button"); backBtn.className = "vhbtn back";
    backBtn.innerHTML = "&#8592; Back to Vendor Hub"; backBtn.title = "Back to Vendor Hub";
    backBtn.onclick = function (e) { e.stopPropagation(); backToVendorHub(fromEventId); };
    dp.appendChild(backBtn);
  }

  var hero = document.createElement("div"); hero.className = "dhero" + (v.cover ? " hp" : "");
  if (v.cover) { hero.style.backgroundImage = "url(" + v.cover + ")"; hero.style.backgroundSize = "cover"; hero.style.backgroundPosition = "center"; }
  else { hero.innerHTML = v.logo ? v.logo : cat.i; }
  dp.appendChild(hero);

  var body = document.createElement("div"); body.className = "dbody";

  var rib = document.createElement("span"); rib.className = "rib " + v.cat; rib.style.marginBottom = "9px"; rib.textContent = cat.l;
  var h2 = document.createElement("h2"); h2.textContent = v.name;
  body.appendChild(rib); body.appendChild(h2);

  /* Badges reflect real purchased promotions (js/promo.js), scoped per
     event - a vendor with no active/upcoming promotion anywhere shows no
     badge at all, same as any other listing (no "Free Vendor" label). */
  var anyFeatured = (v.events || []).some(function (eid) { return vendorPromoBadges(v.id, eid).featured; });
  var anyBoost = (v.events || []).some(function (eid) { return vendorPromoBadges(v.id, eid).boostActive; });
  if (anyFeatured || anyBoost) {
    var badges = document.createElement("div"); badges.style.cssText = "display:flex;gap:6px;margin:4px 0 8px;flex-wrap:wrap;";
    if (anyFeatured) { var fb = document.createElement("span"); fb.className = "promo-badge featured"; fb.textContent = "Featured"; badges.appendChild(fb); }
    if (anyBoost) { var bb = document.createElement("span"); bb.className = "promo-badge boost"; bb.textContent = "Boost Live"; badges.appendChild(bb); }
    body.appendChild(badges);
  }

  var dloc = document.createElement("div"); dloc.className = "dloc";
  var dadr = document.createElement("span"); dadr.className = "dadr"; dadr.textContent = v.address || "Address on file";
  var mapBtn = document.createElement("a"); mapBtn.className = "ab blue"; mapBtn.href = mu; mapBtn.target = "_blank"; mapBtn.textContent = "Open in Maps";
  dloc.appendChild(dadr); dloc.appendChild(mapBtn);
  body.appendChild(dloc);

  var desc = document.createElement("p"); desc.className = "ddesc"; desc.textContent = v.desc || "No description yet.";
  body.appendChild(desc);

  var crow = document.createElement("div"); crow.className = "dtags";
  if (v.contact && v.contact.phone) { var a = document.createElement("a"); a.className = "ab blue"; a.href = "tel:" + v.contact.phone; a.textContent = "Call"; crow.appendChild(a); }
  if (v.contact && v.contact.email) { var a2 = document.createElement("a"); a2.className = "ab gray"; a2.href = "mailto:" + v.contact.email; a2.textContent = "Email"; crow.appendChild(a2); }
  if (v.website) { var a3 = document.createElement("a"); a3.className = "ab green"; a3.href = v.website; a3.target = "_blank"; a3.textContent = "Website"; crow.appendChild(a3); }
  Object.keys(v.social || {}).forEach(function (k) {
    if (v.social[k]) { var s = document.createElement("a"); s.className = "ab dark"; s.href = v.social[k]; s.target = "_blank"; s.textContent = k.charAt(0).toUpperCase() + k.slice(1); crow.appendChild(s); }
  });
  if (crow.children.length) body.appendChild(crow);

  var igrid = document.createElement("div"); igrid.className = "igrid";
  function mkIbox(label, val) { var b = document.createElement("div"); b.className = "ibox"; b.innerHTML = "<h4>" + label + "</h4><p>" + (val || "See vendor.") + "</p>"; return b; }
  var hoursSummary = [["mon", "Mon"], ["tue", "Tue"], ["wed", "Wed"], ["thu", "Thu"], ["fri", "Fri"], ["sat", "Sat"], ["sun", "Sun"]]
    .map(function (d) { return d[1] + ": " + ((v.hours && v.hours[d[0]]) || "Closed"); }).join("<br>");
  igrid.appendChild(mkIbox("Hours", hoursSummary));
  igrid.appendChild(mkIbox("Menu / Offerings", v.menu || "Menu coming soon."));
  igrid.appendChild(mkIbox("Category", cat.l));
  body.appendChild(igrid);

  var vEvts = vendorEvents(v);
  if (vEvts.length) {
    var vsec = document.createElement("div"); vsec.className = "vsec";
    var vh3 = document.createElement("h3"); vh3.textContent = "Upcoming Events";
    vsec.appendChild(vh3);
    vEvts.forEach(function (ev) {
      var vi = document.createElement("div"); vi.className = "vi"; vi.style.cssText = "cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:8px;";
      var lbl = document.createElement("span"); lbl.textContent = ev.t + " — " + ev.w;
      vi.appendChild(lbl);
      var badges = vendorPromoBadges(v.id, ev.id);
      if (badges.featured || badges.boostActive || badges.boostUpcoming) {
        var bwrap = document.createElement("span"); bwrap.style.cssText = "display:flex;gap:4px;flex-shrink:0;";
        if (badges.featured) { var fb2 = document.createElement("span"); fb2.className = "promo-badge featured"; fb2.textContent = "Featured"; bwrap.appendChild(fb2); }
        if (badges.boostActive) { var bb2 = document.createElement("span"); bb2.className = "promo-badge boost"; bb2.textContent = "Boost Live"; bwrap.appendChild(bb2); }
        else if (badges.boostUpcoming) { var ub = document.createElement("span"); ub.className = "promo-badge upcoming"; ub.textContent = "Boost Soon"; bwrap.appendChild(ub); }
        vi.appendChild(bwrap);
      }
      vi.addEventListener("click", function () { openDetail(ev.id); });
      vsec.appendChild(vi);
    });
    body.appendChild(vsec);
  }

  var btns = document.createElement("div"); btns.className = "dbtnrow";
  var favBtn = document.createElement("button");
  function paintFav() { favBtn.className = "ab " + (isFav(v.id) ? "dark" : "gray"); favBtn.textContent = isFav(v.id) ? "Saved" : "Save"; }
  paintFav();
  favBtn.addEventListener("click", function () { toggleFav(v.id); paintFav(); });
  var shareBtn = document.createElement("button"); shareBtn.className = "ab gray"; shareBtn.textContent = "Share";
  shareBtn.addEventListener("click", function () { shareVendor(v.id); });
  var mapBtn2 = document.createElement("button"); mapBtn2.className = "ab blue"; mapBtn2.textContent = "View on Map";
  mapBtn2.addEventListener("click", function () { showVendorOnMap(v.id); });
  var dirBtn = document.createElement("a"); dirBtn.className = "ab green"; dirBtn.target = "_blank";
  dirBtn.href = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(v.address || v.name);
  dirBtn.textContent = "Directions";
  var editBtn = document.createElement("button"); editBtn.className = "ab dark"; editBtn.textContent = "Edit";
  editBtn.addEventListener("click", function () { openVendorForm(v.cat, v.id); });
  var promoBtn = document.createElement("button"); promoBtn.className = "ab green"; promoBtn.textContent = "🚀 Promote";
  promoBtn.addEventListener("click", function () { openPromoPicker(v.id); });
  var msgBtn = document.createElement("button"); msgBtn.className = "ab gray"; msgBtn.disabled = true;
  msgBtn.style.opacity = ".5"; msgBtn.textContent = "Message (Coming Soon)";
  btns.appendChild(favBtn); btns.appendChild(shareBtn); btns.appendChild(mapBtn2); btns.appendChild(dirBtn); btns.appendChild(editBtn); btns.appendChild(promoBtn); btns.appendChild(msgBtn);
  body.appendChild(btns);

  dp.appendChild(body);
  document.getElementById("detOv").classList.add("on");
}

function shareVendor(id) {
  var v = vendors.find(function (x) { return x.id === id; }); if (!v) return;
  if (navigator.share) navigator.share({ title: v.name, text: v.desc, url: location.href });
  else { try { navigator.clipboard.writeText(location.href).then(function () { alert("Link copied!"); }); } catch (e) { alert("Copy the URL from your browser bar."); } }
}

function showVendorOnMap(id) {
  showMap();
  hVendorPin(id);
}

/* Returns from a vendor's own detail page to the event flyer it was
   opened from, landing back on that event's Vendor Hub face (not the
   event-info face) so it feels like a "back" step rather than starting
   over from the flyer's front. */
function backToVendorHub(eventId) {
  openDetail(eventId);
  setTimeout(function () {
    var info = document.getElementById("infoView"), vhub = document.getElementById("vhubView"), btn = document.getElementById("vhToggle");
    if (info && vhub && btn) {
      info.style.display = "none"; vhub.style.display = "block";
      btn.innerHTML = "&#8617; Back to Flyer"; btn.title = "Back to Event Flyer";
      btn.classList.add("back");
    }
  }, 30);
}

/* ── MAP PINS (square markers, distinct from the round event pins) ── */
function renderVendorPins() {
  var g = document.getElementById("vPins"); if (!g) return;
  g.innerHTML = "";
  vendors.filter(function (v) { return v.mx && v.my; }).forEach(function (v) {
    var cat = C[v.cat] || { c: "#666", i: "&#128204;" };
    var pg = document.createElementNS("http://www.w3.org/2000/svg", "g");
    pg.setAttribute("class", "vp"); pg.setAttribute("id", "vpin-" + v.id);
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", v.mx - 9); rect.setAttribute("y", v.my - 9);
    rect.setAttribute("width", "18"); rect.setAttribute("height", "18"); rect.setAttribute("rx", "4");
    rect.setAttribute("fill", cat.c); rect.setAttribute("stroke", "white"); rect.setAttribute("stroke-width", "2.5");
    rect.setAttribute("opacity", v.featured ? "1" : "0.82");
    var txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    txt.setAttribute("x", v.mx); txt.setAttribute("y", v.my + 4);
    txt.setAttribute("text-anchor", "middle"); txt.setAttribute("font-size", "10");
    txt.style.pointerEvents = "none"; txt.innerHTML = cat.i;
    pg.appendChild(rect); pg.appendChild(txt);
    pg.addEventListener("click", function () { openVendorDetail(v.id); });
    g.appendChild(pg);
  });
}
function hVendorPin(id) {
  document.querySelectorAll(".vp.pulse").forEach(function (p) { p.classList.remove("pulse"); });
  var p = document.getElementById("vpin-" + id); if (p) p.classList.add("pulse");
}

/* ── ADMIN MODERATION PLACEHOLDER ──
   Hidden behind ?admin=1 until real accounts/roles exist. Lets a site
   operator approve pending vendor listings and flip boost tiers on/off. */
function maybeShowAdminNav() {
  if (location.search.indexOf("admin=1") >= 0) {
    document.getElementById("nAdmin").style.display = "inline-block";
  }
}
function showAdmin() {
  document.getElementById("bView").style.display = "none";
  document.getElementById("tdwrap").style.display = "none";
  document.getElementById("mapSec").style.display = "none";
  document.getElementById("adminSec").style.display = "block";
  if (typeof showAdminTab === "function") showAdminTab("vendors");
  else renderAdminList();
}
function renderAdminList() {
  var list = document.getElementById("adminList");
  if (!list) return;
  list.innerHTML = "";
  vendors.forEach(function (v) {
    var row = document.createElement("div");
    row.style.cssText = "background:rgba(253,246,224,.06);border:1px solid rgba(218,184,112,.2);border-radius:6px;padding:10px 14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;";

    var name = document.createElement("div");
    name.style.cssText = "font-family:'Special Elite',monospace;font-size:12.5px;color:var(--cl);flex:1;min-width:140px;";
    name.textContent = v.name + " (" + v.status + ")";
    row.appendChild(name);

    var approveBtn = document.createElement("button");
    approveBtn.className = "nb"; approveBtn.textContent = "Approve";
    approveBtn.onclick = function () { v.status = "approved"; saveVendors(); renderAdminList(); };
    var rejectBtn = document.createElement("button");
    rejectBtn.className = "nb"; rejectBtn.textContent = "Reject";
    rejectBtn.onclick = function () { v.status = "rejected"; saveVendors(); renderAdminList(); };
    row.appendChild(approveBtn); row.appendChild(rejectBtn);

    var promoCount = typeof getBookings === "function"
      ? getBookings().filter(function (b) { return b.vendorId === v.id && b.status !== "cancelled"; }).length
      : 0;
    var bkBtn = document.createElement("button");
    bkBtn.className = "nb"; bkBtn.textContent = promoCount ? "Bookings (" + promoCount + ")" : "Bookings";
    bkBtn.onclick = function () { showAdminTab("bookings"); };
    row.appendChild(bkBtn);

    list.appendChild(row);
  });
}

/* ── ADD / EDIT FORM (a lightweight vendor dashboard placeholder — no
   real auth yet, so anyone can edit any listing, same permission model
   the existing event flyer form already uses) ── */
function openVendorForm(defCat, vid, eventId) {
  var fp = document.getElementById("vfrmPanel");
  var opts = Object.entries(C).map(function (e) { return "<option value='" + e[0] + "'>" + e[1].l + "</option>"; }).join("");
  fp.innerHTML = "<div class='fi'><h2>" + (vid ? "Edit Your Business" : "Add Your Business") + "</h2>" +
    "<label>Business Name *</label><input id='vn' type='text' placeholder='e.g. Xiong Farms'>" +
    "<label>Category</label><select id='vcat'>" + opts + "</select>" +
    "<label>Description</label><textarea id='vd' placeholder='Tell customers about your business...'></textarea>" +
    "<label>Menu / Offerings</label><textarea id='vmenu' placeholder='List a few items or paste a menu link...'></textarea>" +
    "<label>Address</label><input id='va' type='text' placeholder='Street address'>" +
    "<label>Phone</label><input id='vph' type='text' placeholder='(408) 555-0100'>" +
    "<label>Email</label><input id='vem' type='text' placeholder='hello@business.com'>" +
    "<label>Website</label><input id='vwb' type='text' placeholder='https://'>" +
    "<label>Instagram</label><input id='vig' type='text' placeholder='https://instagram.com/yourbiz'>" +
    "<label>Logo (optional upload)</label><input id='vlg' type='file' accept='image/*'>" +
    "<label>Cover Photo (optional upload)</label><input id='vcv' type='file' accept='image/*'>" +
    "<div class='facts'><button class='bcan' id='vfrmCan'>Cancel</button><button class='bsub' id='vfrmSub'>Save Business</button></div>" +
    "</div>";
  fp.dataset.vid = vid || "";
  fp.dataset.eventId = eventId || "";
  if (defCat) document.getElementById("vcat").value = defCat;
  document.getElementById("vfrmCan").onclick = vCls;
  document.getElementById("vfrmSub").onclick = subVendorForm;
  if (vid) {
    var v = vendors.find(function (x) { return x.id === vid; });
    if (v) {
      function sv(i, val) { var el = document.getElementById(i); if (el) el.value = val || ""; }
      sv("vn", v.name); sv("vd", v.desc); sv("vmenu", v.menu); sv("va", v.address);
      sv("vph", v.contact && v.contact.phone); sv("vem", v.contact && v.contact.email);
      sv("vwb", v.website); sv("vig", v.social && v.social.instagram);
      document.getElementById("vcat").value = v.cat;
    }
  }
  document.getElementById("vfrmOv").classList.add("on");
}

function vCls() {
  document.getElementById("vfrmOv").classList.remove("on");
  document.getElementById("vfrmPanel").innerHTML = "";
}

function subVendorForm() {
  var name = document.getElementById("vn").value.trim();
  if (!name) { alert("Please add a business name."); return; }
  var vid = document.getElementById("vfrmPanel").dataset.vid;
  var eventId = document.getElementById("vfrmPanel").dataset.eventId;
  var cat = document.getElementById("vcat").value;
  var v = {
    id: vid || "vu" + Date.now(), name: name, cat: cat,
    desc: document.getElementById("vd").value.trim(),
    menu: document.getElementById("vmenu").value.trim(),
    address: document.getElementById("va").value.trim(),
    contact: { phone: document.getElementById("vph").value.trim(), email: document.getElementById("vem").value.trim() },
    website: document.getElementById("vwb").value.trim(),
    social: { instagram: document.getElementById("vig").value.trim() },
    hours: {}, featured: false, verified: false,
    boost: { tier: null, active: false, until: "", radius: null },
    mx: 380 + (Math.random() - 0.5) * 120, my: 420 + (Math.random() - 0.5) * 80,
    city: "sj", events: eventId ? [eventId] : [], gallery: [], logo: "", cover: "", status: "pending"
  };
  var isNew = !vid;
  function done() {
    if (vid) {
      var i = vendors.findIndex(function (x) { return x.id === vid; });
      if (i >= 0) {
        var old = vendors[i];
        v.hours = old.hours; v.featured = old.featured; v.boost = old.boost;
        v.mx = old.mx; v.my = old.my; v.gallery = old.gallery; v.status = old.status;
        v.logo = v.logo || old.logo; v.cover = v.cover || old.cover;
        v.events = old.events || [];
        if (eventId && v.events.indexOf(eventId) < 0) v.events.push(eventId);
        vendors[i] = v;
      }
    } else vendors.push(v);
    saveVendors(); vCls(); renderVendorPins();
    if (typeof markMyVendor === "function") markMyVendor(v.id);
    if (typeof updateDashNavVisibility === "function") updateDashNavVisibility();
    if (typeof renderBoards === "function") renderBoards();
    if (document.getElementById("detOv").classList.contains("on") && document.getElementById("detPanel").dataset.eid) {
      openDetail(document.getElementById("detPanel").dataset.eid);
    }
    /* Prompt Premium Promotion right after a NEW listing is created (not
       on every edit, which would get old fast) - the small delay lets
       vCls()/openDetail() above finish settling before the promo
       overlay stacks on top. */
    if (isNew && typeof openPromoPicker === "function") {
      setTimeout(function () { openPromoPicker(v.id); }, 250);
    }
  }
  var logoFile = document.getElementById("vlg").files[0];
  var coverFile = document.getElementById("vcv").files[0];
  if (coverFile) {
    resizeImageFile(coverFile, 1100, 0.82, function (dataUrl) {
      v.cover = dataUrl;
      if (logoFile) resizeImageFile(logoFile, 300, 0.85, function (logoUrl) { v.logo = logoUrl; done(); });
      else done();
    });
  } else if (logoFile) {
    resizeImageFile(logoFile, 300, 0.85, function (logoUrl) { v.logo = logoUrl; done(); });
  } else done();
}

document.addEventListener("DOMContentLoaded", function () {
  renderVendorPins();
  maybeShowAdminNav();
});
