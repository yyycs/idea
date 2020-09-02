// ==UserScript==
// @name         OGARio for agarbot.ovh
// @namespace    ogario.v4.b
// @version      4.0.0.38
// @description  Unoffical Polish MOD
// @author       szymy, golman
// @match        *://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      ext.agarbot.ovh
// ==/UserScript==

// © 2019 ogario.ovh

// Check location
if (location.host === "agar.io" && location.pathname === "/") {
    window.stop();
    location.href = "https://agar.io/ogario" + location.hash;
    return;
}

// Inject script
document.documentElement.innerHTML = "<center><h1>OGARio is loading...</h1></center>";
GM_xmlhttpRequest({
    method : "GET",
    url : "https://ext.agarbot.ovh/ogario",
    onload : function(e) {
        document.open();
        document.write(e.responseText);
        document.close();
    }
});
