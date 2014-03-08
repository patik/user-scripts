// ==UserScript==
// @name           Facebook Newsfeed Sort
// @description    Sort the Facebook Newsfeed with most recent items first
// @namespace      http://patik.com/code/user-scripts/
// @match          http://facebook.com/*
// @match          https://facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @version        1.0.0
// @lastupdated    2014-03-08
// @run-at         document-end
// ==/UserScript==

(function _facebook_sort_recent() {
    var loc = document.location;

    // Changes the page to "most recent" sort
    function changeSort() {
        window.location.href = loc.protocol + '//' + loc.hostname + '/?sk=h_chr';
    }

    // Attempts to determine the type of sort based on the URL
    function checkURL() {
        // Try URL first
        var param = loc.search;

        if (param) {
            // Most Recent: ?sk=h_chr
            // Top Stories: ?sk=h_nor

            // Not currently sorted by most recent
            if (param.indexOf('sk=h_chr') === -1) {
                changeSort();
            }

            // Successfully determined sort
            return true;
        }
        else {
            param = loc.pathname;

            if (param && /\/.+/.test(param)) {
                // We're not on the home page, so sorting is not applicable
                return true;
            }
        }

        // Failed to determine sort via URL
        return false;
    }

    // Attempts to determine the type of sort based on available menu items
    function checkDOM() {
        var elem = document.querySelector('._50f9');

        function query(selector, node) {
            node = node || document;
            return Array.prototype.slice.call(node.querySelectorAll(selector));
        }

        // Early 2014 redesign
        if (elem && elem.textContent.indexOf('Viewing most recent stories') !== -1) {
            // Already sorted correctly
            return true;
        }

        // 2013 design
        // Find 'Sort' menu
        elem = query('.sortLink._p');
        if (elem.length) {
            elem = elem.filter(function(el) {
                return (el.textContent === 'SORT');
            });

            if (elem) {
                if (elem.length) {
                    elem = elem[0];

                    // Click to open menu
                    elem.click();

                    // Find 'Most Recent' menu item
                    elem = query('span', elem).filter(function(el) {
                        return (el.textContent === 'Most Recent');
                    });

                    if (elem.length) {
                        // Click to set the sorting method
                        elem[0].click();
                    }
                }
            }
        }
    }

    // Try URL first, then the DOM
    if (!checkURL() && !checkDOM()) {
        // Current sort couldn't be determined, so force it to re-sort
        changeSort();
    }
}());
