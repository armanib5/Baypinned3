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
