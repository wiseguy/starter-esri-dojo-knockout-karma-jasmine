/**
All dojo utilities implementation defined here. 
Can be swapped out for Jquery etc.
All esri/ and dojo/ stuff should be implemented here
*/

define(["dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/html", "dojo/query", "dojo/Deferred", "dojo/dom-construct", "dojo/_base/lang", "dojo/io-query", "core/config", "dojo/hash",
        "esri/request", "dojo/ready", "dojo/_base/array", "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/FeatureLayer", "esri/layers/GraphicsLayer", "esri/map", "esri/dijit/BasemapGallery", "esri/dijit/Legend",
        "dojo/hash", "dojo/topic", "esri/geometry/webMercatorUtils", "dojo/sniff"
    ],
    function(dom, domAttr, domClass, html, dojoQuery, Deferred, domConstruct, lang, ioQuery, config, hash, esriRequest, ready, arrayUtil, ArcGISDynamicMapServiceLayer,
        FeatureLayer, GraphicsLayer, Map, BasemapGallery, Legend, hash, topic, webMercatorUtils, sniff) {

        var o = {};

        o.addClass = function(node, className) {
            domClass.add(node, className);
        };

        o.removeClass = function(node, className) {
            domClass.remove(node, className);
        };

        o.registerFunctionWhenDomReady = function(func) {
            ready(func);
        };

        o.sniff = function(browserId) {
            return sniff(browserId);
        };

        o.setNodeHtml = function(node, htmlString) {
            return html.set(node, htmlString);
        };

        o.setNodeAttr = function(node, attribute, value) {
            return domAttr.set(node, attribute, value);
        };

        o.parseDojo = function() {
            require(["dojox/mobile/parser", "dijit/TitlePane", "dijit/layout/ContentPane", "dijit/form/Button"], function(parser) {
                //using mobile parser because regular one doesnt work with html tags manifest attribute
                parser.parse();
            })
        };

        o.getNodeById = function(id) {
            return dom.byId(id);
        };

        o.getNodeList = function(selector) {
            return dojoQuery(selector);
        };

        o.getHash = function() {
            return hash;
        };

        o.arrayMap = function(sourceArray, handlerFunc) {
            var targetArray = arrayUtil.map(sourceArray, handlerFunc);
            return targetArray;
        };

        o.arrayEach = function(sourceArray, handlerFunc) {
            arrayUtil.forEach(sourceArray, handlerFunc);
        };

        o.arraySome = function(sourceArray, handlerFunc) {
            var testArray = arrayUtil.some(sourceArray, handlerFunc);
            return testArray;
        };

        o.arrayIndex = function(sourceArray, findItem) {
            return arrayUtil.indexOf(sourceArray, findItem);
        };


        o.clone = function(object) {
            return lang.clone(object);
        }
        /**
         * sourceProjection can be wm or ll
         */
        o.convertWM = function(geometry, sourceProjection) {

            var transformedGeometry;

            switch (sourceProjection) {
                case 'wm':
                    transformedGeometry = webMercatorUtils.webMercatorToGeographic(geometry);
                    break;

                case 'll':
                    transformedGeometry = webMercatorUtils.geographicToWebMercator(geometry);
                    break;
            }

            return transformedGeometry;

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

        o.createDom = function(nodeStr, options, targetNode) {
            return domConstruct.create(nodeStr, options, targetNode);
        };

        o.stringToObject = function(string) {

            return ioQuery.queryToObject(string);

        };

        o.objectToQuery = function(object) {

            return ioQuery.objectToQuery(object);

        };

        o.topicSubscribe = function(eventString, handlerFunc) {

            topic.subscribe(eventString, handlerFunc);

        };

        o.mixin = function(targetObject, sourceObject) {
            return lang.mixin(targetObject, sourceObject);
        };

        o.getMapClass = function() {

            return Map;

        };

        o.getBasemapDijit = function() {

            return BasemapGallery;

        };

        o.getLegendDijit = function() {

            return Legend;

        };





        return o;

    });