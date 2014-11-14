/**
All dojo utilities implementation defined here. 
Can be swapped out for Jquery etc.
All esri/ and dojo/ stuff should be implemented here
*/

define(["dojo/dom", "dojo/query", "dojo/Deferred", "dojo/dom-construct", "dojo/_base/lang", "dojo/io-query", "core/config", "dojo/hash",
        "esri/request", "dojo/parser", "dojo/ready", "dojo/_base/array", "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/FeatureLayer", "esri/layers/GraphicsLayer", "esri/map", "esri/dijit/BasemapGallery", "esri/dijit/Legend"
    ],
    function(dom, dojoQuery, Deferred, domConstruct, lang, ioQuery, config, hash, esriRequest, parser, ready, arrayUtil, ArcGISDynamicMapServiceLayer,
        FeatureLayer, GraphicsLayer, Map, BasemapGallery, Legend) {

        var o = {};

        o.getNodeById = function(id) {
            return dom.byId(id);
        };

        o.getNodeList = function(selector) {
            return dojoQuery(selector);
        };

        o.arrayMap = function(sourceArray, handlerFunc) {
            var targetArray = arrayUtil.map(sourceArray, handlerFunc);
            return targetArray;
        };

        o.getLayerConstructor = function(type) {
            var constructor;

            switch (type) {
                case "dynamic":
                    constructor = ArcGISDynamicMapServiceLayer;
                    break;
                case "graphic":
                    constructor = GraphicsLayer;
                    break;
                case "feature":
                    constructor = FeatureLayer;
                    break;
            }

            return constructor;
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
            console.log("insert HTML for " + selector);

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

        o.getMapClass = function() {

            return Map;

        };

        o.getBasemapDijit = function() {

            return BasemapGallery;

        };

        o.getLegendDijit = function() {

            return Legend;

        };

        /**
         * Hash / App State tracking
         */

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

        /**
         * Web Service Calls
         */

        o.requestJson = function(url, options) {

            var deferred = esriRequest(url, options);

            return deferred;
        }

        return o;

    });