window.viewerModel = JSON.parse(document.getElementById('wix-viewer-model').textContent)
window.fetchDynamicModel = fetch(window.viewerModel.dynamicModelUrl, { credentials: 'same-origin' }).then(function(r){return r.ok ? r.json() : "[" + r.status + "] " + r.statusText}).catch(function(e){ return e.message; });
window.commonConfig = viewerModel.commonConfig

var bodyCacheable = true;
    
var exclusionReason = {"shouldRender":true,"forced":false};
var ssrInfo = {"renderBodyTime":369}
window.clientSideRender = false;

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
		
window.firstPageId = 'klk7a'
window.bi.sendBeat(12, 'Partially visible', {pageId: window.firstPageId})
window.fedops.phaseMark('partially_visible')