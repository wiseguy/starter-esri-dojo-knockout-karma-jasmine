define(["exports", "core/config", "core/toolkitController", "core/coreController", "components/map/mapController",
        "components/header/headerController"
    ],

    function(exports, config, toolkit, core, mapController, headerController) {

        var watchHash = true;
        var isBrowerBackFwdButton = true;
        var initialized = false;

        /**
         * Uses the URL state, if not present then uses default from config
         */
        exports.startAppStateTracking = function() {

            var urlSplitByHash = window.document.location.href.split("#"),
                appStateFromURL;
            var hasHashInUrl = urlSplitByHash.length >= 2;

            if (hasHashInUrl) {

                appStateFromURL = toolkit.stringToObject(urlSplitByHash[urlSplitByHash.length - 1]);
                //config.appStateCurrent = toolkit.mixin(appStateFromURL, config.appStateCurrent); //override the default app state by mixing with URL state
                config.appStateCurrent = appStateFromURL; //override the default app state by mixing with URL state

                // exports.appStateCompare(config.appStatePrevious, appStateFromURL);

            } else {

                //debugger;
                watchHash = false;
                exports.updateURL(config.appStateCurrent); //default

            }

            exports.startDetectUrlChange();

            return true;
        };

        exports.watchHash = function(bool) {
            watchHash = bool;
        }

        exports.getWatchHash = function() {
            return watchHash;
        }

        /**
         *Detect hash change for browser back/foward button click
         */
        exports.startDetectUrlChange = function() {

            toolkit.topicSubscribe("/dojo/hashchange", exports.hashChangeTopicHandler);

        };

        exports.hashChangeTopicHandler = function(changedHash) {

            if (!watchHash) {
                watchHash = true;
                isBrowerBackFwdButton = true;
                console.log("ended hash change handler since watchHash is FALSE");
                return;
            }

            var appStatePrevious, appStateCurrent;
            // var appStateCurrent = config.appStateCurrent;
            // var appStatePrevious = config.appStatePrevious;

            if (isBrowerBackFwdButton) { //for browser back button use appStateCurrent

                appStatePrevious = config.appStateCurrent;

            } else {

                appStatePrevious = config.appStatePrevious;
            }

            appStateCurrent = toolkit.stringToObject(changedHash);
            //debugger;
            //debugger;
            // watchHash = true;

            exports.hashChangeExecute(appStatePrevious, appStateCurrent);

            isBrowerBackFwdButton = true;

        };

        exports.hashChangeExecute = function(appStatePrevious, appStateCurrent) {

            var newAppState;

            var hash = toolkit.getHash();

            // newAppState = toolkit.stringToObject(hash());

            if (Object.keys(appStateCurrent).length === 0) {
                return;
            }

            exports.appStateCompare(appStatePrevious, appStateCurrent);

            config.appStateCurrent = toolkit.clone(appStateCurrent);
            config.appStatePrevious = toolkit.clone(appStatePrevious);


        };

        /**
         * API to call when hash/URL is to be updated, firing the app update
         *
         */
        //updateHash
        exports.updateApp = function(updateObject, urlOnly) {

            console.log("updateApp", updateObject);
            console.log("watchHash", watchHash);
            console.log("urlOnly", urlOnly);

            //debugger;

            isBrowerBackFwdButton = false;

            var appStateCurrent = config.appStateCurrent;
            var newAppState = toolkit.mixin(toolkit.clone(appStateCurrent), updateObject);
            var hashString = toolkit.objectToQuery(newAppState);
            var hash = toolkit.getHash();

            config.appStatePrevious = toolkit.clone(appStateCurrent);
            config.appStateCurrent = newAppState;

            if (urlOnly) {
                //debugger;
                watchHash = false;
            } else {
                watchHash = true;
            }

            hash(hashString);

        };

        //updateHashWithoutChangeDetect
        /**
         * API to call when hash/URL is to be updated, WITHOUT firing the app update
         *
         */
        exports.updateURL = function(updateObject) {


            console.log("update URL only");

            // watchHash = false; // disable identifying Url change
            //debugger;
            if (watchHash || !initialized) {
                exports.updateApp(updateObject, true);
                initialized = true;
            }

        };

        exports.appStateCompare = function(oldState, newState) {

            var changesArray = [];

            for (var prop in oldState) {

                if (oldState[prop].toString() !== newState[prop].toString()) {
                    changesArray.push(prop);
                }

            }

            if (changesArray.length > 0) {
                exports.handleChanges(oldState, newState, changesArray);
            } else {
                console.log("Nothing has changed");
            }

            return changesArray;
            //when a change is found

        };

        /**
         * Convert changed properties to array of descriptive names
         */
        exports.handleChanges = function(oldState, newState, changesArray) {
            var changesNameArray = [];

            toolkit.arrayEach(changesArray, function(changeProperty) {
                switch (changeProperty) {
                    case "b":
                        if (toolkit.arrayIndex(changesNameArray, "basemap") < 0) {
                            changesNameArray.push("basemap");
                        }
                        break;
                    case "x":
                        if (toolkit.arrayIndex(changesNameArray, "coordinate") < 0) {
                            changesNameArray.push("coordinate");
                        }
                        break;
                    case "y":
                        if (toolkit.arrayIndex(changesNameArray, "coordinate") < 0) {
                            changesNameArray.push("coordinate");
                        }
                        break;
                    case "l":
                        if (toolkit.arrayIndex(changesNameArray, "level") < 0) {
                            changesNameArray.push("level");
                        }
                        break;
                    case "v":
                        if (toolkit.arrayIndex(changesNameArray, "view") < 0) {
                            changesNameArray.push("view");
                        }
                        break;
                    case "m":
                        if (toolkit.arrayIndex(changesNameArray, "totalmaps") < 0) {
                            changesNameArray.push("totalmaps");
                        }
                        break;
                    case "a":
                        if (toolkit.arrayIndex(changesNameArray, "activemap") < 0) {
                            changesNameArray.push("activemap");
                        }
                        break;
                }

            });


            exports.updateUIfromChanges(oldState, newState, changesNameArray);

            return changesNameArray;

        };

        exports.updateUIfromChanges = function(oldState, newState, changesNameArray) {

            // exports.watchHash(false);
            console.log("UPDATE UI >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            if (toolkit.arrayIndex(changesNameArray, "basemap") > -1) {
                console.log(">>> set basemap");
                mapController.setBasemap(newState.b);
            }

            if (toolkit.arrayIndex(changesNameArray, "coordinate") > -1 || toolkit.arrayIndex(changesNameArray, "level") > -1) {
                var mapIndex = -1;
                if (exports.detectMapIndex(oldState.x, newState.x) > -1) {
                    mapIndex = exports.detectMapIndex(oldState.x, newState.x);
                }
                if (exports.detectMapIndex(oldState.y, newState.y) > -1) {
                    mapIndex = exports.detectMapIndex(oldState.y, newState.y);
                }
                if (exports.detectMapIndex(oldState.l, newState.l) > -1) {
                    mapIndex = exports.detectMapIndex(oldState.l, newState.l);
                }
                console.log(">>> set center and level");
                mapController.centerAndZoom(newState.x, newState.y, newState.l, mapIndex);

            }


            if (toolkit.arrayIndex(changesNameArray, "view") > -1) {
                console.log(">>> set view");
                headerController.selectView(newState.v);
                core.startModule(newState.v); //starts only if it wasnt created before
            }

            if (toolkit.arrayIndex(changesNameArray, "totalmaps") > -1) {
                console.log(">>> set totalmaps");
                mapController.changeTotalMaps(newState.m);
            }

            if (toolkit.arrayIndex(changesNameArray, "activemap") > -1) {
                console.log(">>> set activemap");
                mapController.updateActiveMapDiv(newState.a);
            }

            // exports.watchHash(true);

        };

        /*
         * Find which map has changed
         */
        exports.detectMapIndex = function(oldStr, newStr) { //separated by !

            var changeIndex = -1;
            var oldStrArray = oldStr.split("!");
            var newStrArray = newStr.split("!");

            var foundChange = toolkit.arraySome(oldStrArray, function(oldItem, i) {
                if (oldItem !== newStrArray[i]) {
                    changeIndex = i;
                    return true;
                } else {
                    return false;
                }
            });

            return changeIndex;
        };


        return exports;

    });