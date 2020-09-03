// ==UserScript==
// @name         Free Agar.io Bots (OGARio Version)
// @namespace    ogario.v4.b
// @version      4.0.0.35
// @description  Free open source agar.io bots with OGARio
// @author       Nel & szymy (OGARio deobfuscated by ReFisGood)
// @match        *://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      cdn.ogario.ovh
// @connect      yyycs.github.io
// ==/UserScript==

if (location.host === "agar.io" && location.pathname === "/") {
    location.href = "https://agar.io/ogario" + location.hash;
    return;
}

function inject(page) {
    page = page.replace('<head>', '<head><script src="https://bundle.run/buffer@5.2.1"></script><script src="https://yyycs.github.io/Ogario/vendor.js"></script>');
    page = page.replace('https://cdn.ogario.ovh/v4/beta/ogario.v4.js', 'https://yyycs.github.io/Ogario/OGARio.core.js');
    return page;
}

window.stop();
document.documentElement.innerHTML = "";
GM_xmlhttpRequest({
    method : "GET",
    url : "https://cdn.ogario.ovh/v4/beta/",
    onload : function(e) {
        var doc = inject(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});
