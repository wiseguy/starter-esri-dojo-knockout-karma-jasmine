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

define(["core/config", "components/map/mapModel", "core/toolkitController", "core/coreController",
        "core/hashController"
    ],

    function(config, mapModel, toolkit, core, hash) {

        var o = {};
        /*
         * Private variables
         */
        o._initialized = false;
        o._isView = true;

        o._currentMapPosition = 0; //0 index
        o._currentTotalMaps = 0; //start with 1
        o._maxMaps = config.maxMaps; //starts with 1
        o._map;
        o._basemaps;
        o._legend;


        /*
         * Common methods for controllers
         */

        o.isInitialized = function() {
            return o._initialized;
        }

        o.isView = function() {
            return o._isView;
        }

        o.startup = function() {

            var _this = this;

            if (o._initialized) {
                return
            } else {
                o._initialized = true;
            }


            //looad the partial
            var loadMapDeferred = toolkit.loadPartial("components/map/mapPartial.html");
            var loadMapInstanceDeferred = toolkit.loadPartial("components/map/mapInstancePartial.html");

            var allDeferred = toolkit.allPromises([loadMapDeferred, loadMapInstanceDeferred])


            allDeferred.then(function(results) {
                var html = results[0];
                var mapInstanceHtml = results[1];
                o.createUI(html, mapInstanceHtml);

            });


            return loadMapDeferred;

        };



        o.createUI = function(html, mapInstanceHtml) {

            var maxMaps = o._maxMaps;


            console.log("create Map UI");

            var checkIfNodeExists = (toolkit.getNodeList(".app-container").length == 1);

            var selectorNode = ".app-container";
            if (!checkIfNodeExists) {
                selectorNode = "body"; //during tests
            }
            toolkit.injectHtml(selectorNode, html, "last");

            var mapsContainerNode = ".map-container";

            while (maxMaps > 0) {

                toolkit.injectHtml(mapsContainerNode, mapInstanceHtml, "last");
                maxMaps = maxMaps - 1;
            }

            //start model with default values
            mapModel.initialize();

            //start model with default values
            mapModel.bind(toolkit.getNodeList(".map-container")[0]);

            toolkit.parseDojo(toolkit.getNodeList(".map-container")[0]);

            o.addMap();
        };

        /*
         * Custom methods for controllers
         */

        /**
         *change current selected map,
         */
        o.addMap = function() {
            //Remove the show-1, show-2 classes
            //increment the currentMap
            var positionInView = 0;
            var allMapNodes;
            var currentTotalMaps = o._currentTotalMaps;

            //do we need to open a hidden map?
            if ((o._currentMapPosition + 1) < o._currentTotalMaps) {
                o.showMap();
                return;
            }

            //did we reach the max?
            if (o._currentTotalMaps === o._maxMaps) {
                alert("can not open more maps");
                return;
            }




            o._currentTotalMaps += 1;
            positionInView = o._currentTotalMaps - 1;
            o._currentMapPosition = positionInView;

            /* toolkit.getNodeList(".map").removeClass(function(index, css) {
                return (css.match(/(^|\s)show-\S+/g) || []).join(' '); //remove show-* classes
            });
*/
            while (currentTotalMaps > 0) {

                toolkit.getNodeList(".map").removeClass("show-" + currentTotalMaps);

                currentTotalMaps -= 1;

            }

            toolkit.getNodeList(".map").addClass("show-" + o._currentTotalMaps);

            o.createMap(positionInView);
        };
        /**
         *createMap needs the map id,
         */
        o.createMap = function(positionInView) {

            var MapClass = toolkit.getMapClass();
            var appCurrentState = config.appStateCurrent;
            var mapNode = toolkit.getNodeList(".map")[positionInView];
            toolkit.removeClass(mapNode, "dijitHidden");
            var map = new MapClass(mapNode, {
                basemap: appCurrentState.b,
                center: [appCurrentState.x, appCurrentState.y],
                zoom: appCurrentState.l
            });

            map.positionInView = positionInView;

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
                map.resize();
                console.log("layers added");

                //map.addLayers
                o.addBasemap(map);

                map.on("extent-change", function() {
                    var center = map.extent.getCenter();
                    var centerLL = toolkit.convertWM(center, 'wm'); //'ll'
                    var level = map.getLevel();
                    hash.updateHashWithoutChangeDetect({
                        x: centerLL.x,
                        y: centerLL.y,
                        l: level
                    });
                });

            });


            map.addLayers(mapLayers);


        };

        o.addBasemap = function(map) {

            console.log('Add basemap');

            var BasemapGallery = toolkit.getBasemapDijit();
            //debugger;
            var basemapGallery = new BasemapGallery({
                showArcGISBasemaps: true,
                map: map
            }, toolkit.getNodeList('.basemap-gallery')[0]); //this is always 0

            basemapGallery.startup();

            o.addLegend(map);


        };

        o.addLegend = function(map) {

            console.log("Add Legend");

            var Legend = toolkit.getLegendDijit();

            var legend = new Legend({
                map: map
            }, toolkit.getNodeList(".legend")[map.positionInView]);


            legend.startup();

        };

        o.removeMap = function(node) {
            //is only 1 map remaining?

            if (o._currentMapPosition == 0) {
                alert("at least one map needs to exist");
                return;
            }

            var currentTotalMaps = o._currentTotalMaps;

            var mapNode = toolkit.getNodeList(".map")[o._currentMapPosition];

            o._currentMapPosition -= 1;
            //o._currentTotalMaps -= 1;


            while (currentTotalMaps > 0) {

                toolkit.getNodeList(".map").removeClass("show-" + currentTotalMaps);

                currentTotalMaps -= 1;

            }

            toolkit.getNodeList(".map").addClass("show-" + (o._currentMapPosition + 1));

            toolkit.addClass(mapNode, "dijitHidden");


        };

        o.showMap = function() {

            var mapNode = toolkit.getNodeList(".map")[o._currentMapPosition + 1];

            toolkit.getNodeList(".map").removeClass("show-" + (o._currentMapPosition + 1));

            toolkit.getNodeList(".map").addClass("show-" + (o._currentMapPosition + 2));

            toolkit.removeClass(mapNode, "dijitHidden");

            o._currentMapPosition += 1;

        };

        o.hideMap = function() {


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

        o.setBasemap = function(basemapName) {
            var basemapId = "basemap_2";
            o._basemaps.select(basemapId);
        };

        o.centerAndZoom = function(centerLL, level) {
            o._map.centerAndZoom(centerLL, level);
        };



        return o;

    });