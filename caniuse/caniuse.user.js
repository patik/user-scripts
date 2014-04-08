// ==UserScript==
// @name           CanIUse.com Autoswitch to Beta
// @description    Automatically redirect to the beta site for CanIUse.com
// @namespace      http://patik.com/code/user-scripts/
// @match          https://caniuse.com/*
// @match          http://caniuse.com/*
// @version        1.0.0
// @lastupdated    2014-04-08
// ==/UserScript==

(function _caniuse() {
    window.location.href = window.location.href.replace(/\/\/caniuse.com\//, '//beta.caniuse.com/');
}());
