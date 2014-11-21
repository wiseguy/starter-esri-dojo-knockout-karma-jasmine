define(["exports", "core/config", "core/toolkitController", "core/coreController", "components/map/mapController"],

    function(exports, config, toolkit, core, mapController) {


        var identifyChangesInHash = true;
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

                var appStateCurrent = config.appStateCurrent;
                var appStatePrevious = config.appStatePrevious;

                // debugger;
                if (!identifyChangesInHash) { //updateHashWithoutChangeDetect was called               
                    return;
                }

                if (identifyChangesInHash) {
                    // var newAppState = toolkit.stringToObject(changedHash);
                    exports.appStateCompare(appStatePrevious, appStateCurrent);
                }



            });

        };

        /**
         * API to call when hash is to be updated.
         * changeDetect determines whether update is done silently or follows through to execute some code
         */
        exports.updateHash = function(updateObject) {
            var appStateCurrent = config.appStateCurrent;
            var newAppState = toolkit.mixin(toolkit.clone(appStateCurrent), updateObject);
            var hashString = toolkit.objectToQuery(newAppState);
            var hash = toolkit.getHash();

            config.appStatePrevious = toolkit.clone(appStateCurrent);
            config.appStateCurrent = newAppState;


            hash(hashString);
            //debugger;
            identifyChangesInHash = true; // enable identifying changes in Url

        };


        exports.updateHashWithoutChangeDetect = function(updateObject) {

            identifyChangesInHash = false; // disable identifying Url change

            exports.updateHash(updateObject);

        };

        exports.appStateCompare = function(oldState, newState) {

            var changesArray = [];
            //debugger;
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
                mapController.setBasemap(newState.b);
            }

            if (toolkit.arrayIndex(changesNameArray, "coordinate") > -1) {
                mapController.centerAndZoom([parseFloat(newState.x), parseFloat(newState.y)], parseFloat(newState.l));
            }

            if (toolkit.arrayIndex(changesNameArray, "view") > -1) {
                core.startModule(newState.v);
            }


        };


        return exports;

    });