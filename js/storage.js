/* Storage abstraction — every feature reads/writes through this instead of
   localStorage directly, so a real backend (Firebase, etc.) can be swapped
   in later by changing only this file. */
var Storage = (function () {
  var PREFIX = "pinnedsj-";

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function remove(key) {
    try {
      localStorage.removeItem(PREFIX + key);
    } catch (e) {}
  }

  return { get: read, set: write, remove: remove };
})();

/* Downscales an uploaded photo before it's stored as a base64 data URL.
   Real phone photos run 2-8MB, and localStorage quota is ~5-10MB total
   for the whole site - a couple of full-res uploads would silently blow
   the budget and quietly fail to save. Shrinking to maxDim keeps a single
   photo in the tens-of-KB range so many flyers/vendors fit comfortably. */
function resizeImageFile(file, maxDim, quality, cb) {
  maxDim = maxDim || 1000;
  quality = quality || 0.82;
  var reader = new FileReader();
  reader.onload = function (e) {
    var img = new Image();
    img.onload = function () {
      var scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      var w = Math.max(1, Math.round(img.width * scale));
      var h = Math.max(1, Math.round(img.height * scale));
      var canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      try { cb(canvas.toDataURL("image/jpeg", quality)); }
      catch (err) { cb(e.target.result); }
    };
    img.onerror = function () { cb(e.target.result); };
    img.src = e.target.result;
  };
  reader.onerror = function () { cb(""); };
  reader.readAsDataURL(file);
}
