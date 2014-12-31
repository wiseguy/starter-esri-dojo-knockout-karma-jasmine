/**
All dojo utilities implementation defined here. 
Can be swapped out for Jquery etc.
All esri / and dojo / stuff should be implemented here
*/

define(["core/config",
        /*Dojo*/
        "dojo/promise/all", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/html", "dojo/query",
        "dojo/Deferred", "dojo/dom-construct", "dojo/_base/lang", "dojo/io-query", "dojo/hash",
        "dojo/ready", "dojo/_base/array", "dojo/sniff", "dojo/hash", "dojo/topic", "dojo/on", "dojo/parser",
        "dijit/TitlePane", "dijit/layout/ContentPane", "dijit/form/Button", "dijit/form/DropDownButton", "dijit/TooltipDialog",
        /*Esri*/
        "esri/request", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/FeatureLayer", "esri/layers/GraphicsLayer",
        "esri/map", "esri/dijit/BasemapGallery", "esri/dijit/Legend", "esri/geometry/webMercatorUtils", "esri/arcgis/utils",
        "esri/config"
    ],
    function(config,
        /*Dojo*/
        all, dom, domAttr, domClass, html, dojoQuery,
        Deferred, domConstruct, lang, ioQuery, hash,
        ready, arrayUtil, sniff, hash, topic, on, parser,
        TitlePane, ContentPane, Button, DropDownButton, TooltipDialog,
        /*Esri*/
        esriRequest, ArcGISDynamicMapServiceLayer, FeatureLayer, GraphicsLayer,
        Map, BasemapGallery, Legend, webMercatorUtils, arcgisUtils,
        esriConfig) {

        var o = {};

        o.allPromises = function(arrayOfPromises) {
            return all(arrayOfPromises);
        }

        o.addClass = function(node, className) {
            domClass.add(node, className);
        };

        o.removeClass = function(node, className) {
            domClass.remove(node, className);
        };

        o.containsClass = function(node, className) {
            return domClass.contains(node, className);
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

        o.parseDojo = function(node) {

            var nodeToParse = node;
            var parserDeferred;

            if (!nodeToParse) {
                parserDeferred = parser.parse();
            } else {
                parserDeferred = parser.parse(nodeToParse);
            }

            return parserDeferred;
        };

        o.getNodeById = function(id) {
            return dom.byId(id);
        };

        o.getNodeList = function(selector) {
            return dojoQuery(selector);
        };

        o.getOn = function() {
            return on;
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
        o.reproject = function(geometry) {

            var transformedGeometry;

            switch (geometry.spatialReference.wkid) {
                case 102100:
                    transformedGeometry = webMercatorUtils.webMercatorToGeographic(geometry);
                    break;

                case 4326:
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
         * @pos - only, first, last, replace
         */
        o.injectHtml = function(selector, html, pos) {
            console.log("insert HTML for " + selector);

            dojoQuery(selector).forEach(function(node) {
                domConstruct.place(html, node, pos);
            });
        };

        o.createDom = function(nodeStr, options, targetNode) {
            return domConstruct.create(nodeStr, options, targetNode);
        };

        o.placeDom = function(nodeOrHtml, refNode, type) {
            return domConstruct.place(nodeOrHtml, refNode, type);
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

        o.getEsriConfig = function() {

            return esriConfig;
        }

        o.getMapClass = function() {

            return Map;

        };

        o.getArcGISutils = function() {

            return arcgisUtils;

        };


        o.getBasemapDijit = function() {

            return BasemapGallery;

        };

        o.getLegendDijit = function() {

            return Legend;

        };





        return o;

    });