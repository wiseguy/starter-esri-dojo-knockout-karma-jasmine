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
        "core/hashController", "core/onEventController", "core/modelEventController", "core/modelSaveController"
    ],

    function(o, config, mapModel, toolkit, core, hash, onEventController, modelEventController, modelSaveController) {

        /*
         * Private variables
         */
        o._initialized = false;

        o._currentMapPosition = 0; //0 index,keep this updated in addMap and removeMap only
        o._currentTotalMaps = 0; //start with 1, keep this updated in addMap and removeMap only
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
         *was map incremented or decremented?, hashController fires this
         *is done only by one */
        o.changeTotalMaps = function(newMapCount) {

            var currentTotalMaps = o._currentTotalMaps;

            var numberOfIterations = Math.abs(newMapCount - currentTotalMaps);
            var isRemove = (parseInt(newMapCount) < parseInt(currentTotalMaps));
            var isAdd = !isRemove;
            if (isAdd) {
                o.showMapContainers(currentTotalMaps + numberOfIterations)
            }

            while (numberOfIterations > 0) {

                if (isRemove) { //decreased                    
                    o.removeMap();
                } else { //increased
                    //debugger;
                    o.addMap();
                }

                numberOfIterations -= 1;

            }

            if (isRemove) { //resize total maps showing
                o.resizeActiveMaps();
            }


        };

        o.incrementMap = function() {

            var currentTotalMaps = o._currentTotalMaps; //config.appStateCurrent.m;
            if (currentTotalMaps === o._maxMaps) {
                core.resumeComponent();
                return;
            }
            //make the new map active
            hash.updateApp({
                m: parseInt(currentTotalMaps) + 1,
                a: parseInt(currentTotalMaps)
            });


        };

        o.decrementMap = function() {
            var currentTotalMaps = o._currentTotalMaps; //config.appStateCurrent.m;
            if (currentTotalMaps === 1) {
                core.resumeComponent();
                alert("at least one map needs to exist decrementMap");
                return;
            }

            var lastMapNode = toolkit.getNodeList(".map.main")[parseInt(currentTotalMaps) - 1];
            var isRemovedMapAlsoActive = toolkit.containsClass(lastMapNode, "selected-map");

            var hashObj = {
                m: parseInt(currentTotalMaps) - 1
            }

            if (isRemovedMapAlsoActive) {
                hashObj.a = parseInt(currentTotalMaps) - 2;
            }

            hash.updateApp(hashObj);

        };


        /**
         *change current selected map,
         */
        o.addMap = function() {
            console.log("begin adding map");
            //Remove the show-1, show-2 classes
            //increment the currentMap
            var positionInView = 0;
            var allMapNodes;
            var currentTotalMaps = o._currentTotalMaps;
            var totalMapsCreated = o._maps.length;

            //do we need to open a hidden map?
            if ((o._currentMapPosition + 1) < totalMapsCreated) {

                o._currentTotalMaps += 1;
                o._currentMapPosition += 1;
                o.resizeActiveMaps(o._maps[o._currentMapPosition]);
                //console.clear();
                //console.log("%c Adding - _currentMapPosition " + o._currentMapPosition + " o._currentTotalMaps " + o._currentTotalMaps, "color:green");
                //debugger;
                return;
            }


            //did we reach the max?
            if (o._currentTotalMaps === o._maxMaps) {
                core.resumeComponent();
                alert("can not open more maps");
                return;
            }

            //block map interaction
            // core.blockModule(toolkit.getNodeList(".map-container")[0]);
            core.blockComponent(toolkit.getNodeList(".tools-container")[0]);

            o._currentTotalMaps += 1;
            o._currentMapPosition += 1;

            positionInView = o._currentTotalMaps - 1;
            o._currentMapPosition = positionInView;

            mapModel.set("visibleMapCount", o._currentTotalMaps);


            while (currentTotalMaps > 0) {

                toolkit.getNodeList(".map.main").removeClass("show-" + currentTotalMaps);

                currentTotalMaps -= 1;

            }

            toolkit.getNodeList(".map.main").addClass("show-" + o._currentTotalMaps);

            o.createMap(positionInView);


        };

        /**
         *createMap needs the map id,
         */
        o.createMap = function(positionInView) {
            console.log("creating map");

            var isWebMap = false;

            var MapClass = toolkit.getMapClass();
            var arcgisUtils = toolkit.getArcGISutils();
            var appCurrentState = config.appStateCurrent;
            var mapNode = toolkit.getNodeList(".map.main")[positionInView];

            if (config.webMapId.length) {
                isWebMap = true;
            };

            toolkit.removeClass(mapNode, "dijitHidden");

            if (isWebMap) {

                arcgisUtils.createMap(config.webMapId, mapNode).then(function(response) {
                    o.mapCreationHandler(response.map, positionInView, isWebMap);
                    o.addLayers(response.map);
                });

            } else {

                var map = new MapClass(mapNode, {
                    basemap: appCurrentState.b,
                    center: [appCurrentState.x.split("!")[positionInView], appCurrentState.y.split("!")[positionInView]],
                    zoom: appCurrentState.l.split("!")[positionInView],
                    fadeOnZoom: true,
                    autoResize: false,
                    force3DTransforms: true,
                    navigationMode: "css-transforms"
                });


                o.homeButton(map, positionInView);


                o.mapCreationHandler(map, positionInView, isWebMap);

            }


        };

        o.homeButton = function(map, positionInView) {

            var HomeButton = toolkit.getConstructor("HomeButton");

            var node = toolkit.getNodeList(".homeButton")[positionInView];
            var homeButton = new HomeButton({
                theme: "HomeButton",
                map: map,
                extent: null,
                visible: true
            }, node);
            homeButton.startup();

        };

        o.mapCreationHandler = function(map, positionInView, isWebMap) {
            //var legendLayers = arcgisUtils.getLegendLayers(response);

            o._map = map;

            map.positionInView = positionInView;


            if (!isWebMap && !o._maps[positionInView]) {
                var mapLoad = map.on("load", function() {
                    mapLoad.remove();
                    o.addLayers(map);
                });
            }

            o._maps[positionInView] = map;

        };

        /**
         *@param: layers - structure like config.services.layers
         *
         */

        o.addLayers = function(map, layers) {

            console.log("add layers");

            var mapLayers = [];

            var layers = layers || config.services.layers;

            var mapLayers = toolkit.arrayMap(config.services.layers, function(layerItem) {

                var mapLayer,
                    url = layerItem.url,
                    urlIsAbsolute = url && (url.indexOf("http://") + url.indexOf("https://") <= -2),
                    mapServerPrefix = config.services.mapServerPrefix;

                if (urlIsAbsolute) {
                    url = mapServerPrefix + url;
                }
                //debugger;

                var LayerConstructor = toolkit.getLayerConstructor(layerItem.type);
                mapLayer = new LayerConstructor(url, layerItem);
                /*switch (layerItem.type) {
                    case "tile":
                        mapLayer = new LayerConstructor(url);
                        break;
                    case "dynamic":
                        mapLayer = new LayerConstructor(url, layerItem);
                        break;
                    case "graphic":
                        mapLayer = new LayerConstructor();
                        break;
                    case "feature":
                        mapLayer = new LayerConstructor(url, layerItem);
                        break;

                }*/
                return mapLayer;

            });

            var layersAddResult = map.on("layers-add-result", function(evt) {

                var resized = false;

                layersAddResult.remove();
                //map.resize();
                console.log("layers added");

                //map.addLayers

                if (map.positionInView == 0 || config.basemapForEachMap) { //only add basemap for first map
                    o.addBasemap(map, evt.layers);
                    o.updateActiveMapDiv(0); //set the first map as active one
                } else {
                    o.addLegend(map, evt.layers);
                }

                var extentChangeHandler = toolkit.getOn().pausable(map, "extent-change", function() {
                    console.log("map's extentChange handler");
                    if (!resized) {
                        onEventController.extentChange(map);
                    };

                    resized = false;
                });

                map.on("resize", function() { //when resizing do not fire the extentChange
                    resized = true;
                });

                o._mapsExtentChangeEvent.push(extentChangeHandler);

                core.resumeComponent();

            });


            map.addLayers(mapLayers);


        };

        o.addBasemap = function(map, layersAdded) {

            console.log('Add basemap');

            var BasemapGallery = toolkit.getBasemapDijit();
            //debugger;
            var basemapGallery = new BasemapGallery({
                showArcGISBasemaps: true,
                map: map,
                onLoad: function() {
                    // Dont rely on the id's. the basemap_X are subject to change
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
                            case "dark gray canvas": //NEW
                                basemap.name = "dark-gray"; //basemap_3
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
                            case "usa topo maps": //NEW , not a standard
                                basemap.name = "osm"; //basemap_3
                                break;
                        }

                    });
                }
            }, toolkit.getNodeList('.basemap-gallery')[0]); //this is always 0

            toolkit.removeClass(toolkit.getNodeList('.basemap-gallery-titlepane-holder')[map.positionInView], "dijitHidden");
            toolkit.removeClass(toolkit.getNodeList('.theme-titlepane-holder')[map.positionInView], "dijitHidden");

            basemapGallery.startup();

            map.basemapGallery = basemapGallery;

            basemapGallery.on("selection-change", function() {
                var basemap = basemapGallery.getSelected();
                onEventController.setBasemap(basemap, o._maps, map);
            });

            o.addLegend(map, layersAdded);


        };

        o.addLegend = function(map, layersAdded) {

            console.log("Add Legend");

            var Legend = toolkit.getLegendDijit();

            var layerInfos = [];

            toolkit.arrayEach(layersAdded, function(layerItem) {
                layerInfos.push({
                    title: " ",
                    layer: layerItem.layer
                });
            });

            var legend = new Legend({
                map: map,
                layerInfos: layerInfos
            }, toolkit.getNodeList(".legend")[map.positionInView]);


            legend.startup();

            o.resizeActiveMaps(map);

            core.resumeComponent();

        };

        o.removeMap = function(node) {
            //is only 1 map remaining?

            if (o._currentMapPosition == 0) {
                core.resumeComponent();
                alert("at least one map needs to exist");
                return;
            }

            var currentTotalMaps = o._currentTotalMaps;

            var mapNode = toolkit.getNodeList(".map.main")[o._currentMapPosition];

            o._currentMapPosition -= 1;

            o._currentTotalMaps -= 1;

            mapModel.set("visibleMapCount", o._currentTotalMaps);

            while (currentTotalMaps > 0) {

                toolkit.getNodeList(".map.main").removeClass("show-" + currentTotalMaps);

                currentTotalMaps -= 1;

            }

            toolkit.getNodeList(".map.main").addClass("show-" + (o._currentMapPosition + 1));

            console.log("%c Remmoving - currentMapPosition " + o._currentMapPosition + " o._currentTotalMaps " + o._currentTotalMaps, "color:blue");

            o._mapsExtentChangeEvent[o._currentMapPosition + 1].pause();

            toolkit.addClass(mapNode, "dijitHidden");

            o._mapsExtentChangeEvent[o._currentMapPosition + 1].resume();

            //o.resizeActiveMaps();

            console.log("RESUME");

            core.resumeComponent();

        };
        /*
         * If map sent then resize only the target map
         */
        o.resizeActiveMaps = function(map) {

            if (map) {
                map.resize();
            } else {

                toolkit.arrayEach(o._maps, function(theMap, i) {
                    if (i <= (o._currentTotalMaps - 1)) {
                        theMap.resize();
                    }
                });

            }


        };

        o.showMapContainers = function(totalToShow) {

            toolkit.getNodeList(".map.main").forEach(function(node, i) {
                if (i <= (totalToShow - 1)) {
                    toolkit.removeClass(node, "dijitHidden");
                    var currentShowClass = node.className.match(/(^|\s)show-\S+/g)[0].trim();
                    node.className = node.className.replace(currentShowClass, "show-" + totalToShow);
                } else {
                    toolkit.addClass(node, "dijitHidden");
                }
            });



            // o.resizeActiveMaps();
            console.log("RESUME");

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

            /* o.disableAllMapExtentEvent();

            var mapPanEnd = o._maps[changedMapPosition].on("pan-end", function() {
                mapPanEnd.remove();
                o.enableAllMapExtentEvent();
            });*/

            o._maps[changedMapPosition].centerAndZoom(centerLL, level);

        };

        o.updateActiveMapDiv = function(mapIndex) {


            // mapModel.set("activeMapIndex", mapIndex);
            modelSaveController.setActiveMap(mapIndex);

            toolkit.getNodeList(".map.main").removeClass("selected-map");

            toolkit.addClass(toolkit.getNodeList(".map.main")[mapIndex], "selected-map");


        };

        /**
         * Match all extents to the current maps extent
         **/

        o.syncMaps = function(mapIndex) {

            var activeIndex = mapIndex; //parseInt(config.appStateCurrent.a);
            var activeMap = o._maps[activeIndex];

            var center = activeMap.extent.getCenter();

            var centerLL = toolkit.reproject(center);
            var level = activeMap.getLevel();
            var maxMaps = o._maxMaps;
            var xArray = [],
                yArray = [],
                lArray = [];

            while (maxMaps > 0) {
                xArray.push(centerLL.x.toString());
                yArray.push(centerLL.y.toString());
                lArray.push(level.toString());

                maxMaps = maxMaps - 1;
            }

            toolkit.arrayEach(o._maps, function(map, i) {
                o._mapsExtentChangeEvent[i].pause();
                map.centerAndZoom([centerLL.x, centerLL.y], level);
                o._mapsExtentChangeEvent[i].resume();
            });

            hash.updateURL({
                x: xArray.join("!"),
                y: yArray.join("!"),
                l: lArray.join("!")
            });


        },

        o.getCurrentMap = function() {
            var activeIndex = parseInt(config.appStateCurrent.a);
            var activeMap = o._maps[activeIndex];
            return activeMap;
        }

        o.zoomToXY = function(xy) {
            var currentMap = o.getCurrentMap();

            currentMap.centerAndZoom([xy.x, xy.y], xy.l);

        }

        o.selectTheme = function(theme, mapIndex) {
            //alert("selected theme " + theme.name + " for map " + mapIndex);
            var map = o._maps[mapIndex - 1];
            var url = theme.url;
            var themeWasAdded = map.getLayer(theme.id);

            if (!themeWasAdded) {
                var LayerConstructor = toolkit.getLayerConstructor(theme.type);
                var mapLayer = new LayerConstructor(url, theme);
                map.addLayer(mapLayer);
            }


        }

        /**
         *Zooms to browser location
         */
        o.zoomToCurrentLocation = function(mapIndex) {

            var map = o._maps[mapIndex];

            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function(position) {

                    var coords = position.coords || position.coordinate || position;
                    var Point = toolkit.getConstructor("Point");

                    var currentLocation = new Point(coords.longitude, coords.latitude);

                    map.centerAndZoom(currentLocation, 9);

                })

            } else {

            }
        }





        return o;

    });