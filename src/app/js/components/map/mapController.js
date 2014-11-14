/**
 Start a module
 Close a Module
 showNotification
 hideNotification
 getAppState
 setAppState
 getBrowserVersion
 syncViewModels 
 */

define(["core/config", "components/map/mapModel", "core/toolkitController", "core/coreController"],

    function(config, mapModel, toolkit, core) {

        var o = {};
        /*
         * Private variables
         */

        o._map;
        o._basemaps;
        o._legend;

        o.startup = function() {

            var _this = this;

            //looad the partial
            var loadMapDeferred = toolkit.loadPartial("components/map/mapPartial.html");

            loadMapDeferred.then(function(html) {

                o.createUI(html);

            });


            return loadMapDeferred;

        };

        o.createUI = function(html) {

            console.log("create Map UI");

            var checkIfNodeExists = (toolkit.getNodeList(".app-container").length == 1);

            var selectorNode = ".app-container";
            if (!checkIfNodeExists) {
                selectorNode = "body"; //during tests
            }
            toolkit.injectHtml(selectorNode, html, "last");


            //start model with default values
            mapModel.startup();

            //start model with default values
            mapModel.bind(toolkit.getNodeList(".map-container")[0]);

            o.createMap();
        };

        o.createMap = function() {

            var MapClass = toolkit.getMapClass();

            var map = new MapClass("map", {
                basemap: "streets"
            });

            o._map = map;

            map.on("load", function() {
                o.addLayers(map);
            });

            return map;

        };

        o.addLayers = function(map) {

            console.log("add layers");
            var mapLayers = [];

            var mapLayers = toolkit.arrayMap(config.services.layers, function(layerItem) {

                var mapLayer;
                var url = layerItem.url;
                var urlIsAbsolute = url && (url.indexOf("http://") + url.indexOf("https://") <= -2);
                var mapServerPrefix = config.services.mapServerPrefix;

                if (urlIsAbsolute) {
                    url = mapServerPrefix + url;
                }
                //debugger;

                var LayerConstructor = toolkit.getLayerConstructor(layerItem.type);
                switch (layerItem.type) {
                    case "dynamic":
                        mapLayer = new LayerConstructor(url, layerItem);
                        break;
                    case "graphic":
                        mapLayer = new LayerConstructor();
                        break;
                    case "feature":
                        mapLayer = new LayerConstructor(url, layerItem);
                        break;

                }
                return mapLayer;

            });

            var layersAddResult = map.on("layers-add-result", function() {

                layersAddResult.remove();

                console.log("layers added");

                //map.addLayers
                o.addBasemap(map);

            });


            map.addLayers(mapLayers);


        };

        o.addBasemap = function(map) {
            console.log("Add basemap");
            var BasemapGallery = toolkit.getBasemapDijit();

            var basemapGallery = new BasemapGallery({
                showArcGISBasemaps: true,
                map: map
            }, toolkit.getNodeList(".basemap-gallery")[0]);

            basemapGallery.startup();

            o.addLegend(map);
        };

        o.addLegend = function(map) {
            console.log("Add Legend");
            var Legend = toolkit.getLegendDijit();

            var legend = new Legend({
                map: map
            }, toolkit.getNodeList(".legend")[0]);

            legend.startup();

        };

        /**
         * Setters and Getters
         */

        o.getMap = function() {
            return o._map;
        }

        o.getBasemap = function() {
            return o._basemap;
        }

        o.getLegend = function() {
            return o._getLegend;
        }

        return o;

    });