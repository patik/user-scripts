// ==UserScript==
// @name           Magnet Link Finder
// @description    Finds all magnet URLs and displays them prominently
// @namespace      http://patik.com/code/user-scripts/
// @include        *
// @version        1.0.1.20140120
// ==/UserScript==

(function _magnet_links() {
    var linkList = '',    // Display list that holds the links
        magnetAnchors = [], // List of all found P2P anchors

        // Run the plugin
        init = function _init() {
            findAnchors();

            if (magnetAnchors.length) {
                displayAnchors();
                createDisplay();
            }
        },

        /**
         * Find anchor elements that point to P2P links
         */
        findAnchors = function _findAnchors() {
            var magSelector = 'a[href^="magnet:"], a[href^="ed2k://"], a[href^="thunder://"], a[href^="flashget://"], a[href^="qqdl://"]',
                hostURL = window.location.host;
            // For some sites we know which link to keep and which to disregard (e.g. keep the link for a file set, but disregard links for individual files)

            // Pirate Bay
            if (hostURL.indexOf('thepiratebay') !== -1 || hostURL.indexOf('baymirror.com') !== -1) {
                magnetAnchors.push(document.querySelector('.download ' + magSelector));
            }
            // Kickass.to
            if (hostURL.indexOf('kickass.to') !== -1) {
                magnetAnchors.push(document.querySelector('.magnetlinkButton'));
            }
            // Other sites
            else {
                // Get all links
                magnetAnchors = magnetAnchors.concat([].slice.call(document.querySelectorAll(magSelector)));
            }
        },

        /**
         * Add all found anchors to the display
         */
        displayAnchors = function displayAnchors() {
            var knownURLs = [];

            magnetAnchors.forEach(function (magnet) {
                // Make sure this URL is unique
                // if (knownURLs.indexOf(magnet.href) !== -1) {
                //     return false;
                // }

                knownURLs.push(magnet.href);

                // Create list item
                linkList += '<li><a href="' + magnet.href + '">';
                linkList += magnet.innerText || magnet.getAttribute('title') || 'Link';
                linkList += '</a><br><input type="url" value="' + magnet.href + '"></li>';
            });
        },

        /**
         * Create a display area to hold the links
         */
        createDisplay = function _createDisplay() {
            var iframe = document.createElement('iframe'),
                html = '',
                parentRules = '',
                iframeRules = '<style>',
                style;

            html += '<div>';
            html += '<h1>Magnet Links</h1>';
            html += '<ul>';
            html += linkList;
            html += '</ul></div>';

            // Outer container
            parentRules += '#magnet-link-list {';
            parentRules +=     'position: absolute;';
            parentRules +=     'top: 1em;';
            parentRules +=     'right: 1em;';
            parentRules +=     'width: 20em;';
            parentRules +=     'min-height: 5em;';
            parentRules +=     'background-color: #fff;';
            parentRules +=     'z-index: 10001;';
            parentRules +=     'border: 1px solid #777;';
            parentRules +=     'box-shadow: 1px 1px 6px #aaa;';
            parentRules += '}';

            // iframe
            iframeRules += 'body {';
            iframeRules +=     'padding: 0.75em;';
            iframeRules +=     'background-color: #fff;';
            iframeRules +=     'font: 16px/1.4 "Open Sans", "Helvetica Neue", sans-serif;';
            iframeRules +=     'color: #444;';
            iframeRules += '}';

            // Header
            iframeRules += 'h1 {';
            iframeRules +=     'font-size: 18px;';
            iframeRules +=     'margin-top: 0em;';
            iframeRules +=     'text-align: center;';
            iframeRules += '}';

            // List of links
            iframeRules += 'ul {';
            iframeRules +=     'list-style: none outside none;';
            iframeRules +=     'margin-left: 0;';
            iframeRules +=     '-webkit-padding-start: 0;';
            iframeRules +=     '-moz-padding-start: 0;';
            iframeRules += '}';

            iframeRules += 'li {';
            iframeRules +=     'margin-bottom: 1em';
            iframeRules += '}';

            iframeRules += 'li:last-child {';
            iframeRules +=     'margin-bottom: 0';
            iframeRules += '}';

            iframeRules += 'input {';
            iframeRules +=     'width: 100%';
            iframeRules += '}';

            iframeRules += '*, *:before, *:after {';
            iframeRules +=     'box-sizing: border-box;';
            iframeRules += '}';

            iframeRules += '</style>';

            // Add styles to the document
            style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = parentRules;
            document.getElementsByTagName('head')[0].appendChild(style);

            // Add elements to the document
            iframe.id = 'magnet-link-list';
            iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(iframeRules + html);
            iframe.setAttribute('seamless', 'seamless');

            document.body.appendChild(iframe);
        };

    // Run
    init();
}());
