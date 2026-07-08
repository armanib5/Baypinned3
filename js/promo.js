/* Vendor Hub promotions — Boost (two 10-minute slots inside one chosen
   event hour) and Featured (per-event top placement). Fully client-side
   today, backed by localStorage through Storage.js exactly like the rest
   of the site — checkout is simulated (clearly labeled, no real payment
   processed). Every function here follows a validate -> reserve -> confirm
   shape, the same shape a real backend call would have, so swapping in
   Supabase + a real payment processor later means replacing what's
   inside these functions, not how the UI calls them.

   Depends on globals from js/storage.js (Storage), js/app.js (evts), and
   js/vendors.js (vendors). Loaded after all three. */

var PROMO_PRICE_KEY = "promo-pricing-v1";
var PROMO_BOOK_KEY = "promo-bookings-v1";
var PROMO_HOURS_KEY = "promo-hours-v1";
var MY_VENDORS_KEY = "my-vendor-ids-v1";

function getPricing() { return Storage.get(PROMO_PRICE_KEY, { boost: 15, featured: 30 }); }
function setPricing(p) { return Storage.set(PROMO_PRICE_KEY, p); }

/* Boost sells two 10-minute slots (six per hour) inside one chosen
   event hour. Featured sells one 30-minute slot (two per hour: :00-:30
   or :30-:00) — same hour-picker flow, coarser granularity. Both types
   keep their own independent slot bookkeeping per hour, so an hour can
   be simultaneously open for Featured while full for Boost. */
var SLOT_MIN = { boost: 10, featured: 30 };
var SLOTS_PER_HOUR = { boost: 6, featured: 2 };
var MIN_FREE_TO_STAY_OPEN = { boost: 2, featured: 1 };

function getBookings() { return Storage.get(PROMO_BOOK_KEY, []); }
function saveBookings(list) {
  if (!Storage.set(PROMO_BOOK_KEY, list)) {
    alert("That couldn't be saved - your browser's local storage is full. Try clearing an old photo, then try again.");
    return false;
  }
  return true;
}

function getMyVendorIds() { return Storage.get(MY_VENDORS_KEY, []); }
function markMyVendor(id) {
  var mine = getMyVendorIds();
  if (mine.indexOf(id) < 0) { mine.push(id); Storage.set(MY_VENDORS_KEY, mine); }
}
function isMyVendor(id) { return getMyVendorIds().indexOf(id) >= 0; }

/* ── Bookable hours ──
   An event's bookable window comes from its sh/eh (start/end hour, 24hr)
   if set, otherwise a generic 9am-9pm default so booking always has
   something to offer even before an admin has configured real hours. */
function eventHourRange(ev) {
  var sh = (ev.sh != null) ? Math.floor(ev.sh) : 9;
  var eh = (ev.eh != null) ? Math.ceil(ev.eh) : 21;
  if (eh <= sh) eh = sh + 1;
  var hours = [];
  for (var h = sh; h < eh; h++) hours.push(h);
  return hours;
}
function closedHoursFor(eventId) {
  var map = Storage.get(PROMO_HOURS_KEY, {});
  return map[eventId] || [];
}
function setClosedHoursFor(eventId, closedArr) {
  var map = Storage.get(PROMO_HOURS_KEY, {});
  map[eventId] = closedArr;
  Storage.set(PROMO_HOURS_KEY, map);
}
function toggleHourClosed(eventId, hour) {
  var closed = closedHoursFor(eventId).slice();
  var i = closed.indexOf(hour);
  if (i >= 0) closed.splice(i, 1); else closed.push(hour);
  setClosedHoursFor(eventId, closed);
}

/* Resolves which actual calendar date an event's "next hour slot" booking
   applies to — bookings are tied to that date, not to the abstract hour
   number, so a Wednesday market's 9am slot frees up again the following
   Wednesday instead of staying permanently booked. Mirrors app.js's
   isToday() day-matching rules. */
function nextOccurrenceDate(ev) {
  var dayMap = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
  var now = new Date();
  var todayStr = now.toISOString().slice(0, 10);
  if (!ev.d) return todayStr;
  if (ev.d === "daily" || ev.d === "today") return todayStr;
  if (ev.d.length === 10) return ev.d;
  if (ev.d === "monthly") {
    var f = new Date(now.getFullYear(), now.getMonth(), 1);
    while (f.getDay() !== 5) f.setDate(f.getDate() + 1);
    if (f.toISOString().slice(0, 10) < todayStr) {
      f = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      while (f.getDay() !== 5) f.setDate(f.getDate() + 1);
    }
    return f.toISOString().slice(0, 10);
  }
  var target = dayMap[ev.d];
  if (target == null) return todayStr;
  var d = new Date(now);
  var diff = (target - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

function takenSlotsFor(eventId, date, hour, type) {
  var taken = [];
  getBookings().filter(function (b) {
    return b.eventId === eventId && b.date === date && b.hour === hour && b.type === type && b.status !== "cancelled";
  }).forEach(function (b) { taken = taken.concat(b.slots); });
  return taken;
}
function freeSlotsFor(eventId, date, hour, type) {
  var total = SLOTS_PER_HOUR[type] || 6;
  var taken = takenSlotsFor(eventId, date, hour, type);
  var free = [];
  for (var i = 0; i < total; i++) if (taken.indexOf(i) < 0) free.push(i);
  return free;
}
function hourStatus(ev, hour, type) {
  if (closedHoursFor(ev.id).indexOf(hour) >= 0) return "closed";
  var date = nextOccurrenceDate(ev);
  var need = MIN_FREE_TO_STAY_OPEN[type] || 1;
  if (freeSlotsFor(ev.id, date, hour, type).length < need) return "full";
  return "open";
}
function openHoursFor(ev, type) {
  return eventHourRange(ev).map(function (h) { return { hour: h, status: hourStatus(ev, h, type) }; });
}

function fmtHour(h) {
  var ap = h >= 12 ? "pm" : "am", h12 = h % 12 || 12;
  return h12 + ap;
}
function slotTimeLabel(hour, slotIndex, type) {
  var mins = SLOT_MIN[type] || 10;
  var startMin = slotIndex * mins;
  var endMin = startMin + mins;
  function fmt(h, m) {
    var ap = h >= 12 ? "pm" : "am", h12 = h % 12 || 12;
    return h12 + ":" + (m < 10 ? "0" : "") + m + ap;
  }
  var endHour = hour + Math.floor(endMin / 60);
  return fmt(hour, startMin) + " - " + fmt(endHour, endMin % 60);
}
function slotRange(date, hour, slotIndex, type) {
  var mins = SLOT_MIN[type] || 10;
  var start = new Date(date + "T00:00:00");
  start.setHours(hour, slotIndex * mins, 0, 0);
  return { start: start, end: new Date(start.getTime() + mins * 60000) };
}

/* ── Reserve + mock checkout ──
   Re-checks availability immediately before writing, same shape a real
   atomic backend transaction would have — the actual double-booking
   guard, not just a UI nicety. reserveBoost/reserveFeatured are thin
   named wrappers so call sites read clearly. */
function reservePromoSlot(type, eventId, vendorId, hour, slotIdxs) {
  var ev = evts.find(function (e) { return e.id === eventId; });
  if (!ev) return { ok: false, reason: "Event not found." };
  if (closedHoursFor(eventId).indexOf(hour) >= 0) return { ok: false, reason: "That hour just closed for booking." };
  var date = nextOccurrenceDate(ev);
  var free = freeSlotsFor(eventId, date, hour, type);
  var stillFree = slotIdxs.every(function (i) { return free.indexOf(i) >= 0; });
  if (!stillFree) return { ok: false, reason: "One of those slots was just taken by someone else. Pick another." };
  var pricing = getPricing();
  var booking = {
    id: "bk" + Date.now() + Math.floor(Math.random() * 1000), type: type,
    eventId: eventId, vendorId: vendorId, date: date, hour: hour, slots: slotIdxs.slice(),
    amount: pricing[type], status: "paid", purchasedAt: new Date().toISOString()
  };
  var list = getBookings(); list.push(booking);
  if (!saveBookings(list)) return { ok: false, reason: "Storage full." };
  return { ok: true, booking: booking };
}
function reserveBoost(eventId, vendorId, hour, slotIdxs) {
  return reservePromoSlot("boost", eventId, vendorId, hour, slotIdxs);
}
function reserveFeatured(eventId, vendorId, hour, slotIdx) {
  return reservePromoSlot("featured", eventId, vendorId, hour, [slotIdx]);
}
function cancelBooking(id) {
  var list = getBookings();
  var b = list.find(function (x) { return x.id === id; });
  if (b) b.status = "cancelled";
  saveBookings(list);
}

/* ── Live status (drives badges + dashboard countdowns) ──
   Both promo types now book real time slots, so one status function
   covers both — the only difference is slot duration (SLOT_MIN). */
function bookingLiveStatus(b) {
  if (b.status === "cancelled") return "cancelled";
  var now = new Date();
  var ranges = b.slots.map(function (i) { return slotRange(b.date, b.hour, i, b.type); });
  var starts = ranges.map(function (r) { return r.start.getTime(); });
  var ends = ranges.map(function (r) { return r.end.getTime(); });
  var earliestStart = Math.min.apply(null, starts);
  var latestEnd = Math.max.apply(null, ends);
  var activeNow = ranges.some(function (r) { return now >= r.start && now < r.end; });
  if (activeNow) return "active";
  if (now.getTime() < earliestStart) return "upcoming";
  if (now.getTime() >= latestEnd) return "completed";
  return "upcoming";
}

/* Badges shown wherever a vendor appears inside a specific event's
   Vendor Hub (buildVendorHub's list, openVendorDetail), and for the
   Top 10 Spotlight ranking (top 5 active-Featured, next 5 active-Boost). */
function vendorPromoBadges(vendorId, eventId) {
  var mine = getBookings().filter(function (b) {
    return b.vendorId === vendorId && b.eventId === eventId && b.status !== "cancelled";
  });
  var featuredActive = mine.some(function (b) { return b.type === "featured" && bookingLiveStatus(b) === "active"; });
  var featuredUpcoming = mine.filter(function (b) { return b.type === "featured" && bookingLiveStatus(b) === "upcoming"; })
    .sort(function (a, c) { return a.hour - c.hour; })[0] || null;
  var boostActive = mine.some(function (b) { return b.type === "boost" && bookingLiveStatus(b) === "active"; });
  var boostUpcoming = mine.filter(function (b) { return b.type === "boost" && bookingLiveStatus(b) === "upcoming"; })
    .sort(function (a, c) { return a.hour - c.hour; })[0] || null;
  return { featured: featuredActive, featuredUpcoming: featuredUpcoming, boostActive: boostActive, boostUpcoming: boostUpcoming };
}

/* Cross-tab "real time": localStorage writes fire a `storage` event in
   every OTHER open tab on this browser (never the writing tab itself) -
   the closest a static, backend-less site can get to live sync. Anything
   showing live availability/badges should re-render on this. */
var promoSyncHandlers = [];
function onPromoSync(fn) { promoSyncHandlers.push(fn); }
window.addEventListener("storage", function (e) {
  if (!e.key || e.key.indexOf("pinnedsj-promo-") !== 0) return;
  promoSyncHandlers.forEach(function (fn) { try { fn(); } catch (err) {} });
});
