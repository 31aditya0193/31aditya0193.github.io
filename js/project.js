(function () {
  var resolve
  window.lodashPromise = new Promise(function (_resolve) { resolve = _resolve })
  window.__onLodashLoaded = function () {
    resolve()
  }
})()

(function () {
  var noop = function noop() {};
  if ("performance" in window === false) {
    window.performance = {};
  }
  window.performance.mark = performance.mark || noop;
  window.performance.measure = performance.measure || noop;
  if ("now" in window.performance === false) {
    var nowOffset = Date.now();
    if (performance.timing && performance.timing.navigationStart) {
      nowOffset = performance.timing.navigationStart;
    }
    window.performance.now = function now() {
      return Date.now() - nowOffset;
    };
  }
})();

(function () {
  var now = Date.now()
  window.initialTimestamps = {
    initialTimestamp: now,
    initialRequestTimestamp: Math.round(performance.timeOrigin ? performance.timeOrigin : now - performance.now())
  }

  window.thunderboltTag = "libs-releases-GA-local"
  window.thunderboltVersion = "1.4601.0"
})();

window.viewerModel = JSON.parse(document.getElementById('wix-viewer-model').textContent)
window.fetchDynamicModel = fetch(window.viewerModel.dynamicModelUrl, { credentials: 'same-origin' }).then(function(r){return r.ok ? r.json() : "[" + r.status + "] " + r.statusText}).catch(function(e){ return e.message; });
window.commonConfig = viewerModel.commonConfig

if (window.ResizeObserver &&
    (!window.PerformanceObserver || !PerformanceObserver.supportedEntryTypes || PerformanceObserver.supportedEntryTypes.indexOf('paint') === -1)) {
    new ResizeObserver(function (entries, observer) {
        entries.some(function (entry) {
            var contentRect = entry.contentRect;
            if (contentRect.width > 0 && contentRect.height > 0) {
                requestAnimationFrame(function (now) {
                    window.wixFirstPaint = now;
                    dispatchEvent(new CustomEvent('wixFirstPaint'));
                });
                observer.disconnect();
                return true;
            }
        });
    }).observe(document.body);
      }