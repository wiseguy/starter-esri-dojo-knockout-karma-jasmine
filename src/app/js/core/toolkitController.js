/**
All dojo utilities implementation defined here. 
Can be swapped out for Jquery etc.
*/

define(["dojo/dom", "dojo/query", "dojo/Deferred", "dojo/dom-construct", "dojo/_base/lang", "dojo/io-query", "core/config", "dojo/hash"],
    function(dom, dojoQuery, Deferred, domConstruct, lang, ioQuery, config, hash) {

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
        };

        o.stringToObject = function(string) {

            return ioQuery.queryToObject(string);

        };

        o.objectToQuery = function(object) {

            return ioQuery.objectToQuery(object);

        };

        o.mixin = function(targetObject, sourceObject) {
            return lang.mixin(targetObject, sourceObject);
        }


        o.startDetectHashChange = function() {
            require(["dojo/hash", "dojo/topic"], function(hash, topic) {
                topic.subscribe("/dojo/hashchange", function(changedHash) {
                    // Handle the hash change publish

                });
            });
        };

        o.updateHash = function(updatedObj) {
            var hashString = o.objectToQuery(updatedObj);
            hash(hashString);
            //logic to update the config.appStateCurrent
        },

        o.hashChangeDetect = function(newState, oldState) {
            //logic to detect change in hash

            topic.publish("appStateChange", {
                "type": "x",
                "value": 11
            });
        }

        return o;

    });