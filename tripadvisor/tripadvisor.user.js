// ==UserScript==
// @name           Tripadvisor Customized
// @description    Auto-expands reviews
// @namespace      http://patik.com/code/user-scripts/
// @include        http://*.tripadvisor.com/*
// @include        http://*.tripadvisor.co.uk/*
// @include        http://*.tripadvisor.in/*
// @version        1.0.0
// @last-updated   2014-02-09
// ==/UserScript==

(function _tripadvisor_customized() {
    var elem;

    // Expand all reviews by clicking on the first 'more' link
    elem = document.querySelectorAll('.moreLink');

    if (elem.length) {
        elem[0].click();
    }
}());
