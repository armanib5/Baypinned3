/* Vendor Hub promotions — UI layer (picker, mock checkout, Vendor
   Dashboard, Admin Dashboard tabs). Pure rendering/wiring; all the
   data/booking logic lives in js/promo.js. Depends on globals from
   js/app.js, js/vendors.js and js/promo.js. Loaded last. */

function escHtml(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

/* ── Promotion picker (event -> type -> hour -> slots -> checkout) ── */
var promoState = {};

function openPromoPicker(vendorId, preferredEventId) {
  var v = vendors.find(function (x) { return x.id === vendorId; });
  if (!v) return;
  promoState = { vendorId: vendorId };
  var myEvents = vendorEvents(v);
  document.getElementById("promoOv").classList.add("on");
  if (preferredEventId && myEvents.some(function (e) { return e.id === preferredEventId; })) {
    promoState.eventId = preferredEventId; renderPromoTypeStep();
  } else if (!myEvents.length) renderPromoNoEvents(v);
  else if (myEvents.length === 1) { promoState.eventId = myEvents[0].id; renderPromoTypeStep(); }
  else renderPromoEventStep(myEvents);
}
function promoCls() {
  document.getElementById("promoOv").classList.remove("on");
  document.getElementById("promoPanel").innerHTML = "";
  promoState = {};
  if (promoSuccessTimer) { clearInterval(promoSuccessTimer); promoSuccessTimer = null; }
}

function renderPromoNoEvents(v) {
  var p = document.getElementById("promoPanel");
  p.innerHTML = "<div class='promo-step'><div class='promo-head'><h2>Promote " + escHtml(v.name) + "</h2></div>" +
    "<p class='promo-sub'>This listing isn't linked to an event yet — promotions are tied to a specific event's Vendor Hub. Add the link from Edit, or add your business again from that event's \"+ Add Your Business\" button.</p>" +
    "<div class='facts'><button class='bcan' id='promoCloseBtn'>Close</button></div></div>";
  document.getElementById("promoCloseBtn").onclick = promoCls;
}

function renderPromoEventStep(myEvents) {
  var v = vendors.find(function (x) { return x.id === promoState.vendorId; });
  var p = document.getElementById("promoPanel");
  var cards = myEvents.map(function (ev) {
    return "<div class='promo-card' data-eid='" + ev.id + "'><h3>" + escHtml(ev.t) + "</h3><p>" + escHtml(ev.w || "") + "</p></div>";
  }).join("");
  p.innerHTML = "<div class='promo-step'><div class='promo-head'><h2>Promote " + escHtml(v.name) + "</h2></div>" +
    "<p class='promo-sub'>Which event's Vendor Hub do you want to promote in?</p>" +
    "<div class='promo-cards'>" + cards + "</div>" +
    "<div class='facts'><button class='bcan' id='promoCloseBtn'>Cancel</button></div></div>";
  document.getElementById("promoCloseBtn").onclick = promoCls;
  p.querySelectorAll(".promo-card").forEach(function (card) {
    card.onclick = function () { promoState.eventId = card.dataset.eid; renderPromoTypeStep(); };
  });
}

function renderPromoTypeStep() {
  var v = vendors.find(function (x) { return x.id === promoState.vendorId; });
  var ev = evts.find(function (x) { return x.id === promoState.eventId; });
  var pricing = getPricing();
  var p = document.getElementById("promoPanel");
  p.innerHTML = "<div class='promo-step'>" +
    "<div class='promo-head'><h2>Promote " + escHtml(v.name) + "</h2></div>" +
    "<p class='promo-sub'>For: " + escHtml(ev.t) + "</p>" +
    "<div class='promo-cards'>" +
    "<div class='promo-card' id='pcBoost'><h3>&#128640; Boost</h3><span class='pc-price'>$" + pricing.boost + "</span>" +
    "<p>Two 10-minute slots (20 minutes total) during an event hour you pick. Puts your listing in the Top 10 spotlight while your slots run.</p></div>" +
    "<div class='promo-card' id='pcFeatured'><h3>&#11088; Featured</h3><span class='pc-price'>$" + pricing.featured + "</span>" +
    "<p>One 30-minute slot during an event hour you pick. Top-5 spotlight placement with a Featured badge while it runs.</p></div>" +
    "</div>" +
    "<div class='facts'><button class='bcan' id='promoCloseBtn'>Cancel</button></div></div>";
  document.getElementById("promoCloseBtn").onclick = promoCls;
  document.getElementById("pcBoost").onclick = function () { promoState.type = "boost"; renderPromoHourStep(); };
  document.getElementById("pcFeatured").onclick = function () { promoState.type = "featured"; renderPromoHourStep(); };
}

function renderPromoHourStep() {
  var v = vendors.find(function (x) { return x.id === promoState.vendorId; });
  var ev = evts.find(function (x) { return x.id === promoState.eventId; });
  var typeLabel = promoState.type === "boost" ? "Boost" : "Featured";
  var hours = openHoursFor(ev, promoState.type);
  var p = document.getElementById("promoPanel");
  var grid = hours.map(function (h) {
    var label = h.status === "open" ? "Open" : h.status === "full" ? "Full" : "Closed";
    return "<button class='hourbtn" + (h.status !== "open" ? " " + h.status : "") + "' data-hour='" + h.hour + "'" + (h.status !== "open" ? " disabled" : "") + ">" + fmtHour(h.hour) + "<span class='hbstat'>" + label + "</span></button>";
  }).join("");
  p.innerHTML = "<div class='promo-step'>" +
    "<div class='promo-head'><button class='promo-back' id='promoBackBtn'>&#8592;</button><h2>&#128339; Pick an hour</h2></div>" +
    "<p class='promo-sub'>" + escHtml(ev.t) + " — choose an open hour for " + escHtml(v.name) + "'s " + typeLabel + ".</p>" +
    "<div class='hourgrid'>" + (grid || "<p class='promo-sub'>No bookable hours are open for this event yet.</p>") + "</div>" +
    "<div class='facts'><button class='bcan' id='promoCloseBtn'>Cancel</button></div></div>";
  document.getElementById("promoCloseBtn").onclick = promoCls;
  document.getElementById("promoBackBtn").onclick = renderPromoTypeStep;
  p.querySelectorAll(".hourbtn:not(:disabled)").forEach(function (btn) {
    btn.onclick = function () { promoState.hour = parseInt(btn.dataset.hour, 10); promoState.slots = []; renderPromoSlotStep(); };
  });
}

function renderPromoSlotStep() {
  var v = vendors.find(function (x) { return x.id === promoState.vendorId; });
  var ev = evts.find(function (x) { return x.id === promoState.eventId; });
  var type = promoState.type;
  var need = MIN_FREE_TO_STAY_OPEN[type];
  var total = SLOTS_PER_HOUR[type];
  var date = nextOccurrenceDate(ev);
  var taken = takenSlotsFor(ev.id, date, promoState.hour, type);
  var p = document.getElementById("promoPanel");
  function slotsHtml() {
    var out = "";
    for (var i = 0; i < total; i++) {
      var isTaken = taken.indexOf(i) >= 0;
      var isOn = promoState.slots.indexOf(i) >= 0;
      out += "<button class='slotbtn" + (isTaken ? " taken" : isOn ? " on" : "") + "' data-i='" + i + "'" + (isTaken ? " disabled" : "") + ">" + slotTimeLabel(promoState.hour, i, type) + "</button>";
    }
    return out;
  }
  function wireSlots() {
    p.querySelectorAll(".slotbtn:not(.taken)").forEach(function (btn) {
      btn.onclick = function () {
        var i = parseInt(btn.dataset.i, 10);
        var idx = promoState.slots.indexOf(i);
        if (idx >= 0) promoState.slots.splice(idx, 1);
        else if (promoState.slots.length < need) promoState.slots.push(i);
        document.getElementById("slotGrid").innerHTML = slotsHtml();
        wireSlots();
        document.getElementById("slotNextBtn").disabled = promoState.slots.length !== need;
      };
    });
  }
  var pickLabel = need === 1 ? "Pick one 30-min slot" : "Pick two 10-min slots";
  var tapLabel = need === 1 ? "Tap one." : "Tap exactly two.";
  p.innerHTML = "<div class='promo-step'>" +
    "<div class='promo-head'><button class='promo-back' id='promoBackBtn'>&#8592;</button><h2>&#9201; " + pickLabel + "</h2></div>" +
    "<p class='promo-sub'>" + escHtml(ev.t) + " — " + fmtHour(promoState.hour) + " hour. " + tapLabel + "</p>" +
    "<div class='slotgrid" + (total === 2 ? " slotgrid-2" : "") + "' id='slotGrid'>" + slotsHtml() + "</div>" +
    "<div class='facts'><button class='bcan' id='promoCloseBtn'>Cancel</button><button class='bsub' id='slotNextBtn' disabled>Continue</button></div></div>";
  document.getElementById("promoCloseBtn").onclick = promoCls;
  document.getElementById("promoBackBtn").onclick = renderPromoHourStep;
  wireSlots();
  document.getElementById("slotNextBtn").onclick = function () { if (promoState.slots.length === need) renderPromoCheckout(); };
}

function renderPromoCheckout() {
  var v = vendors.find(function (x) { return x.id === promoState.vendorId; });
  var ev = evts.find(function (x) { return x.id === promoState.eventId; });
  var pricing = getPricing();
  var type = promoState.type;
  var amount = pricing[type];
  var typeLabel = type === "boost" ? "Boost" : "Featured";
  var slotWords = promoState.slots.slice().sort(function (a, b) { return a - b; }).map(function (i) { return slotTimeLabel(promoState.hour, i, type); }).join(" &amp; ");
  var summary = "<b>" + typeLabel + "</b> for " + escHtml(v.name) + " during " + escHtml(ev.t) + "<br>" +
    fmtHour(promoState.hour) + " hour, " + slotWords;
  var p = document.getElementById("promoPanel");
  p.innerHTML = "<div class='promo-step'>" +
    "<div class='promo-head'><button class='promo-back' id='promoBackBtn'>&#8592;</button><h2>&#128179; Checkout</h2></div>" +
    "<div class='checkout-demo-banner'>Demo checkout — no real payment is processed. This activates the promotion in your browser only.</div>" +
    "<div class='promo-summary'>" + summary + "<br><b>Total: $" + amount + "</b></div>" +
    "<div id='promoCkErr'></div>" +
    "<label>Name on card</label><input id='ckName' type='text' placeholder='Jane Vendor'>" +
    "<label>Card number (demo)</label><input id='ckCard' type='text' placeholder='4242 4242 4242 4242'>" +
    "<div class='facts'><button class='bcan' id='promoCloseBtn'>Cancel</button><button class='bsub' id='payBtn'>Pay $" + amount + " — Activate</button></div></div>";
  p.querySelector(".promo-step").classList.add("fi");
  document.getElementById("promoCloseBtn").onclick = promoCls;
  document.getElementById("promoBackBtn").onclick = renderPromoSlotStep;
  document.getElementById("payBtn").onclick = function () {
    var btn = document.getElementById("payBtn");
    btn.disabled = true; btn.textContent = "Processing…";
    setTimeout(function () {
      var result = type === "boost"
        ? reserveBoost(promoState.eventId, promoState.vendorId, promoState.hour, promoState.slots)
        : reserveFeatured(promoState.eventId, promoState.vendorId, promoState.hour, promoState.slots[0]);
      if (!result.ok) {
        document.getElementById("promoCkErr").innerHTML = "<div class='promo-err'>" + escHtml(result.reason) + "</div>";
        btn.disabled = false; btn.textContent = "Pay $" + amount + " — Activate";
        return;
      }
      renderPromoSuccess(result.booking);
    }, 500);
  };
}

var promoSuccessTimer = null;
function renderPromoSuccess(booking) {
  var p = document.getElementById("promoPanel");
  var typeLabel = booking.type === "boost" ? "Boost" : "Featured";
  p.innerHTML = "<div class='promo-step'><div class='promo-head'><h2>Promotion Active</h2></div>" +
    "<div class='promo-ok'>Payment confirmed (demo) — your " + typeLabel + " is booked.<br><span class='countdown' id='promoSuccessClock'>&hellip;</span></div>" +
    "<div class='facts'><button class='bsub' id='promoDoneBtn'>Done</button></div></div>";
  function tick() {
    var el = document.getElementById("promoSuccessClock");
    if (!el) { if (promoSuccessTimer) clearInterval(promoSuccessTimer); return; }
    var text = booking.type === "boost"
      ? promoCountdownText(booking.vendorId, booking.eventId, "boost", "&#128640;", "Boost")
      : promoCountdownText(booking.vendorId, booking.eventId, "featured", "&#11088;", "Featured");
    el.innerHTML = text || "Promotion window has passed.";
  }
  if (promoSuccessTimer) clearInterval(promoSuccessTimer);
  tick();
  promoSuccessTimer = setInterval(tick, 1000);
  document.getElementById("promoDoneBtn").onclick = function () {
    if (promoSuccessTimer) { clearInterval(promoSuccessTimer); promoSuccessTimer = null; }
    promoCls(); refreshOpenViewsAfterPromo();
  };
}

/* ── Vendor Dashboard ── */
var dashCountdownTimer = null;

function openVendorDashboard() {
  renderVendorDashboard();
  document.getElementById("dashOv").classList.add("on");
  if (dashCountdownTimer) clearInterval(dashCountdownTimer);
  dashCountdownTimer = setInterval(renderDashCountdowns, 1000);
}
function dashCls() {
  document.getElementById("dashOv").classList.remove("on");
  document.getElementById("dashPanel").innerHTML = "";
  if (dashCountdownTimer) { clearInterval(dashCountdownTimer); dashCountdownTimer = null; }
}

function renderVendorDashboard() {
  var ids = getMyVendorIds();
  var mine = vendors.filter(function (v) { return ids.indexOf(v.id) >= 0; });
  var p = document.getElementById("dashPanel");
  var html = "<div class='fi'><h2>My Vendor Dashboard</h2>";
  if (!mine.length) {
    html += "<p class='dash-empty'>No listings yet on this device. Add your business from any event's Vendor Hub to get started.</p>";
  } else {
    html += "<div class='dash-sec'><h3>My Listings</h3>";
    mine.forEach(function (v) {
      var vEvts = vendorEvents(v);
      html += "<div class='dash-listing'><h4>" + escHtml(v.name) + "</h4>";
      if (!vEvts.length) {
        html += "<p class='dash-empty' style='padding:2px 0;'>Not linked to an event yet.</p>";
      } else {
        vEvts.forEach(function (ev) {
          html += "<div class='dash-row'><span style='font-size:12.5px;color:#3a2810;'>" + escHtml(ev.t) + "</span>" +
            "<span class='dash-cd' data-vid='" + v.id + "' data-eid='" + ev.id + "'></span></div>";
        });
      }
      html += "<div class='dash-row'><button class='ab green promdash-btn' data-vid='" + v.id + "'>Promote</button>" +
        "<button class='ab dark promdash-edit' data-vid='" + v.id + "' data-cat='" + v.cat + "'>Edit Listing</button></div></div>";
    });
    html += "</div>";
  }
  html += "<div class='dash-sec'><h3>Payment &amp; Promotion History</h3>";
  var history = getBookings().filter(function (b) { return ids.indexOf(b.vendorId) >= 0; })
    .sort(function (a, b) { return new Date(b.purchasedAt) - new Date(a.purchasedAt); });
  if (!history.length) {
    html += "<p class='dash-empty'>No promotions purchased yet.</p>";
  } else {
    html += "<div class='dash-table-wrap'><table class='dash-table'><thead><tr><th>Date</th><th>Vendor</th><th>Event</th><th>Type</th><th>Detail</th><th>Amount</th><th>Status</th></tr></thead><tbody>";
    history.forEach(function (b) {
      var v = vendors.find(function (x) { return x.id === b.vendorId; });
      var ev = evts.find(function (x) { return x.id === b.eventId; });
      var detail = fmtHour(b.hour) + " hour, " + b.slots.length + (b.type === "boost" ? " x 10min" : " x 30min") + " slot" + (b.slots.length > 1 ? "s" : "");
      var status = b.status === "cancelled" ? "cancelled" : bookingLiveStatus(b);
      html += "<tr><td>" + new Date(b.purchasedAt).toLocaleDateString() + "</td><td>" + escHtml(v ? v.name : "?") + "</td><td>" +
        escHtml(ev ? ev.t : "?") + "</td><td>" + (b.type === "boost" ? "Boost" : "Featured") + "</td><td>" + detail + "</td><td>$" + b.amount + "</td><td>" +
        status.charAt(0).toUpperCase() + status.slice(1) + "</td></tr>";
    });
    html += "</tbody></table></div>";
  }
  html += "</div><div class='facts'><button class='bcan' id='dashCloseBtn'>Close</button></div></div>";
  p.innerHTML = html;
  document.getElementById("dashCloseBtn").onclick = dashCls;
  p.querySelectorAll(".promdash-btn").forEach(function (btn) {
    btn.onclick = function () { dashCls(); openPromoPicker(btn.dataset.vid); };
  });
  p.querySelectorAll(".promdash-edit").forEach(function (btn) {
    btn.onclick = function () { dashCls(); openVendorForm(btn.dataset.cat, btn.dataset.vid); };
  });
  renderDashCountdowns();
}

/* One live-countdown-or-upcoming-ETA string for a single promo type
   (boost or featured) on a vendor+event, or "" if nothing to show. */
function promoCountdownText(vid, eid, type, icon, label) {
  var active = getBookings().find(function (b) { return b.vendorId === vid && b.eventId === eid && b.type === type && bookingLiveStatus(b) === "active"; });
  if (active) {
    var ranges = active.slots.map(function (i) { return slotRange(active.date, active.hour, i, type); });
    var now = new Date();
    var curRange = ranges.find(function (r) { return now >= r.start && now < r.end; });
    if (curRange) {
      var secs = Math.max(0, Math.floor((curRange.end - now) / 1000));
      return icon + " " + label + " live — " + Math.floor(secs / 60) + ":" + String(secs % 60).padStart(2, "0") + " left";
    }
  }
  var upcoming = getBookings().filter(function (b) { return b.vendorId === vid && b.eventId === eid && b.type === type && bookingLiveStatus(b) === "upcoming"; })
    .sort(function (a, b) { return a.hour - b.hour; })[0];
  if (upcoming) {
    var r = slotRange(upcoming.date, upcoming.hour, Math.min.apply(null, upcoming.slots), type);
    var now2 = new Date();
    var secs2 = Math.max(0, Math.floor((r.start - now2) / 1000));
    var hh = Math.floor(secs2 / 3600), mm = Math.floor((secs2 % 3600) / 60), ss = secs2 % 60;
    return icon + " " + label + " in " + (hh > 0 ? hh + "h " : "") + mm + "m " + ss + "s";
  }
  return "";
}

function renderDashCountdowns() {
  document.querySelectorAll(".dash-cd").forEach(function (el) {
    var vid = el.dataset.vid, eid = el.dataset.eid;
    var parts = [];
    var featuredText = promoCountdownText(vid, eid, "featured", "&#11088;", "Featured");
    var boostText = promoCountdownText(vid, eid, "boost", "&#128640;", "Boost");
    if (featuredText) parts.push(featuredText);
    if (boostText) parts.push(boostText);
    el.innerHTML = parts.length ? "<span class='countdown'>" + parts.join(" &middot; ") + "</span>" : "<span style='font-size:11px;color:rgba(90,65,30,.5);'>No active promo</span>";
  });
}

function updateDashNavVisibility() {
  var btn = document.getElementById("nDash");
  if (btn) btn.style.display = getMyVendorIds().length ? "inline-block" : "none";
}

/* ── Admin Dashboard tabs ── */
function showAdminTab(tab) {
  document.querySelectorAll(".admintab").forEach(function (b) { b.classList.toggle("on", b.dataset.tab === tab); });
  var panels = { vendors: "adminTabVendors", bookings: "adminTabBookings", pricing: "adminTabPricing", hours: "adminTabHours" };
  Object.keys(panels).forEach(function (t) {
    var el = document.getElementById(panels[t]);
    if (el) el.style.display = t === tab ? "block" : "none";
  });
  if (tab === "vendors") renderAdminList();
  if (tab === "bookings") renderAdminBookings();
  if (tab === "pricing") renderAdminPricing();
  if (tab === "hours") renderAdminHours();
}

function renderAdminBookings() {
  var list = document.getElementById("adminBookingsList");
  if (!list) return;
  var all = getBookings().slice().sort(function (a, b) { return new Date(b.purchasedAt) - new Date(a.purchasedAt); });
  if (!all.length) { list.innerHTML = "<p class='aempty'>No bookings yet.</p>"; return; }
  list.innerHTML = "";
  all.forEach(function (b) {
    var v = vendors.find(function (x) { return x.id === b.vendorId; });
    var ev = evts.find(function (x) { return x.id === b.eventId; });
    var detail = b.date + " " + fmtHour(b.hour) + " hour, " +
      b.slots.slice().sort(function (a, c) { return a - c; }).map(function (i) { return slotTimeLabel(b.hour, i, b.type); }).join(", ");
    var status = b.status === "cancelled" ? "cancelled" : bookingLiveStatus(b);
    var row = document.createElement("div"); row.className = "abkrow";
    row.innerHTML = "<span style='flex:1;min-width:180px;'><b>" + escHtml(v ? v.name : "?") + "</b> &middot; " + escHtml(ev ? ev.t : "?") +
      "<br><span style='opacity:.65;font-size:10.5px;'>" + (b.type === "boost" ? "Boost" : "Featured") + " &middot; " + escHtml(detail) + " &middot; " + status + "</span></span>" +
      "<span class='abk-amt'>$" + b.amount + "</span>";
    if (b.status !== "cancelled") {
      var cancelBtn = document.createElement("button"); cancelBtn.className = "nb"; cancelBtn.textContent = "Cancel";
      cancelBtn.onclick = function () { if (confirm("Cancel this booking and free the slot?")) { cancelBooking(b.id); renderAdminBookings(); } };
      row.appendChild(cancelBtn);
    }
    list.appendChild(row);
  });
}

function renderAdminPricing() {
  var wrap = document.getElementById("adminPricingForm");
  if (!wrap) return;
  var pricing = getPricing();
  wrap.innerHTML = "<div class='aformgrid'>" +
    "<label>Boost price ($)<input id='priceBoost' type='number' min='0' step='1' value='" + pricing.boost + "'></label>" +
    "<label>Featured price ($)<input id='priceFeatured' type='number' min='0' step='1' value='" + pricing.featured + "'></label>" +
    "</div><button class='nb on' id='savePricingBtn'>Save Pricing</button>";
  document.getElementById("savePricingBtn").onclick = function () {
    var b = parseFloat(document.getElementById("priceBoost").value) || 0;
    var f = parseFloat(document.getElementById("priceFeatured").value) || 0;
    setPricing({ boost: b, featured: f });
    alert("Pricing updated.");
  };
}

function renderAdminHours() {
  var wrap = document.getElementById("adminHoursForm");
  if (!wrap) return;
  if (!evts.length) { wrap.innerHTML = "<p class='aempty'>No events yet.</p>"; return; }
  var opts = evts.map(function (ev) { return "<option value='" + ev.id + "'>" + escHtml(ev.t) + "</option>"; }).join("");
  wrap.innerHTML = "<div class='aformgrid'><label>Event<select id='hoursEventSel'>" + opts + "</select></label></div><div id='hoursGridWrap'></div>";
  var sel = document.getElementById("hoursEventSel");
  function draw() {
    var ev = evts.find(function (x) { return x.id === sel.value; });
    var gridWrap = document.getElementById("hoursGridWrap");
    if (!ev) { gridWrap.innerHTML = ""; return; }
    var hours = eventHourRange(ev);
    var closed = closedHoursFor(ev.id);
    var grid = hours.map(function (h) {
      var isClosed = closed.indexOf(h) >= 0;
      return "<button class='hourbtn" + (isClosed ? " closed" : " on") + "' data-hour='" + h + "'>" + fmtHour(h) + "<span class='hbstat'>" + (isClosed ? "Closed" : "Open") + "</span></button>";
    }).join("");
    gridWrap.innerHTML = "<p class='promo-sub' style='margin-top:10px;'>Tap an hour to open/close it for Boost booking.</p><div class='hourgrid'>" + grid + "</div>";
    gridWrap.querySelectorAll(".hourbtn").forEach(function (btn) {
      btn.onclick = function () { toggleHourClosed(ev.id, parseInt(btn.dataset.hour, 10)); draw(); };
    });
  }
  sel.onchange = draw;
  draw();
}

/* Re-renders whatever detail/admin/dashboard view is currently open so a
   just-purchased promotion (or a cross-tab change picked up via
   onPromoSync below) shows up immediately instead of needing a manual
   refresh. */
function refreshOpenViewsAfterPromo() {
  var dp = document.getElementById("detPanel");
  if (document.getElementById("detOv").classList.contains("on")) {
    if (dp.dataset.vid) openVendorDetail(dp.dataset.vid, dp.dataset.fromEvent || undefined);
    else if (dp.dataset.eid) openDetail(dp.dataset.eid);
  }
  if (document.getElementById("adminSec").style.display !== "none") {
    var activeTab = document.querySelector(".admintab.on");
    if (activeTab) showAdminTab(activeTab.dataset.tab);
  }
  if (document.getElementById("dashOv").classList.contains("on")) renderVendorDashboard();
}

onPromoSync(refreshOpenViewsAfterPromo);

document.addEventListener("DOMContentLoaded", function () {
  updateDashNavVisibility();
});
