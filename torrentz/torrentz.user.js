// ==UserScript==
// @name           Torrentz.eu Customized
// @description    Links to torrent sites open in the same window, and kickass.to is automatically chosen if available
// @namespace      http://patik.com/code/user-scripts/
// @match          https://torrentz.eu/*
// @match          http://torrentz.eu/*
// @version        1.0.1
// @lastupdated    2014-10-20
// ==/UserScript==

(function _torrentz_customized() {
    // Find all links to other torrent sites
    [].slice.call(document.querySelectorAll('a[rel="e"]')).forEach(function(a) {
        var linkTitle;

        // Make them open in the same window
        a.removeAttribute('target');

        // Auto navigate to kickass.to
        linkTitle = a.querySelector('.u');
        if (linkTitle && /\bkickass\.to\b/i.test(linkTitle.innerHTML)) {
            window.location.href = a.href;
        }
    });
}());
