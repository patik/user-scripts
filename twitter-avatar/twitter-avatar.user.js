// ==UserScript==
// @name           Twitter Menu Avatar
// @description    Quickly verify which account you're logged into on Twitter.com
// @namespace      http://patik.com/code/user-scripts/
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// @version        2.2.0
// @lastupdated    2014-02-03
// @run-at         document-end
// ==/UserScript==

(function _twitter_menu_avatar() {
    var
        // Find the generic 'person' outline in the nav bar, which will be replaced
        //     `.Icon.Icon--me.Icon--large` -> early 2014 design
        //     `.nav-me` -> 2013 design
        menuitem = document.querySelector('.Icon.Icon--me.Icon--large, .nav-me'),

        // Get avatar from the user menu (person outline in 2014, gear icon in 2013)
        //     to ensure we don't grab some other avatar
        avi = document.querySelector('.global-nav .current-user .avatar[src]');

    if (menuitem && avi && avi.src) {
        menuitem.style.cssText = 'background-image: url("' + avi.src + '") !important;background-position: 0 0;border-radius: 4px;background-size: 21px 22px;';
    }

    // Tweaks for the 2014 design
    if (menuitem.classList.contains('Icon--large')) {
        // Hide the person overlay
        document.styleSheets[0].insertRule('.Icon.Icon--me.Icon--large:before { content: ""; }', 0);
        // Make the avatar a little bigger
        document.styleSheets[0].insertRule('.Icon.Icon--me.Icon--large { width: 28px; height: 28px; background-size: 28px 28px; margin-top: 9px; }', 0);
    }
}());
