// ==UserScript==
// @name           Twitter Menu Avatar
// @description    Quickly verify which account you're logged into on Twitter.com
// @namespace      http://patik.com/code/user-scripts/
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// @version        2.1.1
// @lastupdated    2014-01-23
// @run-at         document-end
// ==/UserScript==

(function _twitter_menu_avatar() {
        // Find the generic 'person' outline in the nav bar, which will be replaced
    var menuitem = document.querySelector('.nav-me'),
        // Get avatar from the user menu (gear icon) to ensure we don't grab some other avatar
        avi = document.querySelector('.global-nav .current-user .avatar[src]');

    if (menuitem && avi && avi.src) {
        menuitem.style.cssText = 'background-image: url("' + avi.src + '") !important;background-position: 0 0;border-radius: 4px;background-size: 21px 22px;';
    }
}());
