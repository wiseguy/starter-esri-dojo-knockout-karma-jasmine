/**
All dojo utilities implementation defined here. 
Can be swapped out for Jquery etc.
*/

define(["dojo/dom", "dojo/query", "dojo/Deferred", "dojo/dom-construct"],
    function(dom, dojoQuery, Deferred, domConstruct) {

        var o = {};

        o.getNodeById = function(id) {
            return dom.byId(id);
        };

        o.getNodeList = function(selector) {
            return dojoQuery(selector);
        };

        o.loadPartial = function(loadStr) {
            console.log("loading the partial " + loadStr);
            var deferred = new Deferred();

            require(["dojo/text!" + loadStr], function(appPartial) {
                deferred.resolve(appPartial);
            });

            return deferred;

        };

        /**
         * @selector - css selector
         * @html - html string
         * @type - only, first, last, replace
         */
        o.injectHtml = function(selector, html, type) {
            dojoQuery(selector).forEach(function(node) {
                domConstruct.place(html, node, type);
            });
        }

        return o;

    });