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

define(["exports", "core/config", "components/map/mapModel", "core/toolkitController", "core/coreController",
        "core/hashController", "core/onEventController"
    ],

    function(o, config, mapModel, toolkit, core, hash, onEventController) {

        /*
         * Private variables
         */
        o._initialized = false;

        o._currentMapPosition = 0; //0 index
        o._currentTotalMaps = 0; //start with 1
        o._maxMaps = config.maxMaps; //starts with 1
        o._map;
        o._maps = [];
        o._mapsExtentChangeEvent = [];
        o._basemaps;
        o._legend;


        /*
         * Common methods for controllers
         */

        o.isInitialized = function() {
            return o._initialized;
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
            var totalMapsToCreate = config.appStateCurrent.m;

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

            console.log("parsing map");
            toolkit.parseDojo(toolkit.getNodeList(".map-container")[0]);

            while (totalMapsToCreate > 0) {
                o.addMap();
                totalMapsToCreate -= 1;
            }



        };

        /**************************************
         * Custom methods for this controller
         **************************************/


        /**
         *was map incremented or decremented?,
         */
        o.changeTotalMaps = function(newMapCount) {

            var currentTotalMaps = o._currentTotalMaps;
            if (newMapCount < currentTotalMaps) { //decreased
                o.removeMap();
            } else { //increased
                o.addMap();
            }

        };

        o.incrementMap = function() {

            var currentTotalMaps = config.appStateCurrent.m;
            if (currentTotalMaps === o._maxMaps) {
                alert("can not open more maps");
                return;
            }

            hash.updateHash({
                m: parseInt(currentTotalMaps) + 1
            });


        };

        o.decrementMap = function() {
            var currentTotalMaps = config.appStateCurrent.m;
            if (currentTotalMaps === 1) {
                alert("at least one map needs to exist");
                return;
            }

            hash.updateHash({
                m: parseInt(currentTotalMaps) - 1
            });
        };
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
                core.resumeModule();
                alert("can not open more maps");
                return;
            }

            //block map interaction
            // core.blockModule(toolkit.getNodeList(".map-container")[0]);
            core.blockModule(toolkit.getNodeList(".tools-container")[0]);

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
                center: [appCurrentState.x.split("!")[positionInView], appCurrentState.y.split("!")[positionInView]],
                zoom: appCurrentState.l.split("!")[positionInView]
            });

            map.positionInView = positionInView;

            o._map = map;
            o._maps[positionInView] = map;
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
                //map.resize();
                console.log("layers added");

                //map.addLayers

                if (map.positionInView == 0 || config.basemapForEachMap) { //only add basemap for first map
                    o.addBasemap(map);
                } else {
                    o.addLegend(map);
                }

                var extentChangeHandler = toolkit.getOn().pausable(map, "extent-change", function() {
                    onEventController.extentChange(map);
                });

                o._mapsExtentChangeEvent.push(extentChangeHandler);

                core.resumeModule();

            });


            map.addLayers(mapLayers);


        };

        o.addBasemap = function(map) {

            console.log('Add basemap');

            var BasemapGallery = toolkit.getBasemapDijit();
            //debugger;
            var basemapGallery = new BasemapGallery({
                showArcGISBasemaps: true,
                map: map,
                onLoad: function() {
                    toolkit.arrayEach(basemapGallery.basemaps, function(basemap) {
                        switch (basemap.title.toLowerCase()) {
                            case "imagery": //basemap_8
                                basemap.name = "satellite";
                                break;
                            case "imagery with labels":
                                basemap.name = "hybrid"; //basemap_7
                                break;
                            case "streets":
                                basemap.name = "streets"; //basemap_6
                                break;
                            case "topographic":
                                basemap.name = "topo"; //basemap_5
                                break;
                            case "terrain with labels":
                                basemap.name = "terrain"; //basemap_4 //terrain is NOT a standard name
                                break;
                            case "light gray canvas":
                                basemap.name = "gray"; //basemap_3
                                break;
                            case "national geographic":
                                basemap.name = "national-geographic"; //basemap_2
                                break;
                            case "oceans":
                                basemap.name = "oceans"; //basemap_1
                                break;
                            case "openstreetmap":
                                basemap.name = "osm"; //basemap_0
                                break;
                        }

                    });
                }
            }, toolkit.getNodeList('.basemap-gallery')[0]); //this is always 0

            toolkit.removeClass(toolkit.getNodeList('.basemap-gallery-titlepane-holder')[map.positionInView], "dijitHidden");

            basemapGallery.startup();

            map.basemapGallery = basemapGallery;

            basemapGallery.on("selection-change", function() {
                var basemap = basemapGallery.getSelected();
                onEventController.setBasemap(basemap, o._maps, map);
            });

            o.addLegend(map);


        };

        o.addLegend = function(map) {

            console.log("Add Legend");

            var Legend = toolkit.getLegendDijit();

            var legend = new Legend({
                map: map
            }, toolkit.getNodeList(".legend")[map.positionInView]);


            legend.startup();

            o.resizeActiveMaps();

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

            o._mapsExtentChangeEvent[o._currentMapPosition + 1].pause();

            toolkit.addClass(mapNode, "dijitHidden");

            o._mapsExtentChangeEvent[o._currentMapPosition + 1].resume();

            o.resizeActiveMaps();

        };

        o.resizeActiveMaps = function() {

            toolkit.arrayEach(o._maps, function(theMap, i) {
                if (i <= o._currentMapPosition) {
                    theMap.resize();
                }
            });

        };

        o.showMap = function() {

            var mapNode = toolkit.getNodeList(".map")[o._currentMapPosition + 1];

            toolkit.getNodeList(".map").removeClass("show-" + (o._currentMapPosition + 1));

            toolkit.getNodeList(".map").addClass("show-" + (o._currentMapPosition + 2));

            toolkit.removeClass(mapNode, "dijitHidden");

            o._currentMapPosition += 1;

            o.resizeActiveMaps();

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

        /**
         * Called when hash value for basemap changes
         */
        o.setBasemap = function(basemapName) {


            toolkit.arrayEach(o._maps, function(map) {
                //debugger;
                //setBasemap(basemapName);


                if (!map.basemapGallery) { //for maps that dont have a basemapGallery

                    map.setBasemap(basemapName);

                } else { //for maps that HAVE a basemapGallery

                    var selectedBasemap;
                    toolkit.arraySome(map.basemapGallery.basemaps, function(basemap) {
                        selectedBasemap = basemap;
                        return (basemap.name === basemapName);
                    });
                    map.basemapGallery.select(selectedBasemap.id);

                }

            })

        };

        o.centerAndZoom = function(xList, yList, lList, mapIndex) {
            var changedMapPosition = mapIndex;
            var centerX = parseFloat(xList.split("!")[changedMapPosition]);
            var centerY = parseFloat(yList.split("!")[changedMapPosition]);
            var centerLL = [centerX, centerY];
            var level = parseInt(lList.split("!")[changedMapPosition]);

            o._maps[changedMapPosition].centerAndZoom(centerLL, level);
        };



        return o;

    });