define(["exports", "core/config", "core/toolkitController", "core/coreController", "components/map/mapController",
        "components/header/headerController"
    ],

    function(exports, config, toolkit, core, mapController, headerController) {


        var watchHashChange = true;
        var isBrowserNavigation = true;
        var breakLoop = false;

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

                exports.updateHashWithoutChangeDetect(config.appStateCurrent); //default

            }

            exports.startDetectUrlChange();

            return true;
        };

        /**
         *Detect hash change for browser back/foward button click
         */
        exports.startDetectUrlChange = function() {


            toolkit.topicSubscribe("/dojo/hashchange", function(changedHash) {
                console.log("hash change handler");

                if (!watchHashChange) {
                    isBrowserNavigation = true;
                    watchHashChange = true; // enable identifying changes in Url
                    console.log("ended hash change handler since updateHashWithoutChangeDetect was called");
                    return;
                }

                var appStateCurrent = config.appStateCurrent;
                var appStatePrevious = config.appStatePrevious;

                // 

                if (watchHashChange) {
                    // 
                    exports.hashChangeExecute(appStatePrevious, appStateCurrent);

                }

                isBrowserNavigation = true;
                watchHashChange = true;

            });

        };

        exports.hashChangeExecute = function(appStatePrevious, appStateCurrent) {
            var newAppState;
            var hash = toolkit.getHash();
            if (!isBrowserNavigation) {
                console.log("hash update by user interaction");
                //if UI interaction
                exports.appStateCompare(appStatePrevious, appStateCurrent);
                // debugger;
            } else {

                console.log("hash update by browser navigation");
                breakLoop = true;
                //if back/forward in browser
                newAppState = toolkit.stringToObject(hash());

                if (Object.keys(newAppState).length === 0) {
                    return;
                }

                exports.appStateCompare(appStateCurrent, newAppState);

                config.appStateCurrent = toolkit.clone(newAppState);
                config.appStatePrevious = toolkit.clone(appStateCurrent);
                // debugger;
            }

        };

        /**
         * API to call when hash is to be updated.
         * changeDetect determines whether update is done silently or follows through to execute some code
         */
        exports.updateHash = function(updateObject) {
            //debugger;
            if (breakLoop) {
                console.log("breaking the loop");
                breakLoop = false;
                return;
            }

            console.log("updateHash");

            var appStateCurrent = config.appStateCurrent;
            var newAppState = toolkit.mixin(toolkit.clone(appStateCurrent), updateObject);
            var hashString = toolkit.objectToQuery(newAppState);
            var hash = toolkit.getHash();

            config.appStatePrevious = toolkit.clone(appStateCurrent);
            config.appStateCurrent = newAppState;

            //debugger;
            isBrowserNavigation = false;
            //console.log(hashString);
            //debugger;
            hash(hashString);

        };


        exports.updateHashWithoutChangeDetect = function(updateObject) {
            if (breakLoop) {
                console.log("breaking the loop");
                breakLoop = false;
                return;
            }

            console.log("updateHashWithoutChangeDetect");

            watchHashChange = false; // disable identifying Url change

            exports.updateHash(updateObject);

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
                }

            });


            exports.updateUIfromChanges(oldState, newState, changesNameArray);

            return changesNameArray;

        };

        exports.updateUIfromChanges = function(oldState, newState, changesNameArray) {

            if (toolkit.arrayIndex(changesNameArray, "basemap") > -1) {
                console.log("set basemap");
                mapController.setBasemap(newState.b);
            }

            if (toolkit.arrayIndex(changesNameArray, "coordinate") > -1 || toolkit.arrayIndex(changesNameArray, "level") > -1) {
                var mapIndex = -1;
                if (exports.detectChangeIndex(oldState.x, newState.x) > -1) {
                    mapIndex = exports.detectChangeIndex(oldState.x, newState.x);
                }
                if (exports.detectChangeIndex(oldState.y, newState.y) > -1) {
                    mapIndex = exports.detectChangeIndex(oldState.y, newState.y);
                }
                if (exports.detectChangeIndex(oldState.l, newState.l) > -1) {
                    mapIndex = exports.detectChangeIndex(oldState.l, newState.l);
                }
                console.log("set center and level");
                mapController.centerAndZoom(newState.x, newState.y, newState.l, mapIndex);
            }


            if (toolkit.arrayIndex(changesNameArray, "view") > -1) {
                console.log("set view");
                headerController.selectView(newState.v);
                core.startModule(newState.v);
            }

        };

        exports.detectChangeIndex = function(oldStr, newStr) { //separated by !

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

        exports.isUpdateByBrowser = function() {
            return isBrowserNavigation;
        }

        return exports;

    });