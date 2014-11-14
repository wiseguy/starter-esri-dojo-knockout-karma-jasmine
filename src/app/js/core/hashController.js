define(["core/config", "core/toolkitController"], function(config, toolkit) {

    var o = {};

    /**
     * Uses the URL state, if not present then uses default from config
     */
    o.startAppStateTracking = function() {

        var urlSplitByHash = window.document.location.href.split("#"),
            appStateFromURL;
        var hasHashInUrl = urlSplitByHash.length >= 2;

        if (hasHashInUrl) {

            appStateFromURL = toolkit.stringToObject(urlSplitByHash[urlSplitByHash.length - 1]);
            //config.appStateCurrent = toolkit.mixin(appStateFromURL, config.appStateCurrent); //override the default app state by mixing with URL state
            config.appStateCurrent = appStateFromURL; //override the default app state by mixing with URL state

            // o.appStateCompare(config.appStatePrevious, appStateFromURL);

        } else {
            o.updateHash(config.appStateCurrent); //default
        }

        toolkit.startDetectHashChange();

        return true;
    };

    o.updateHash = function(updateObject) {
        var newAppState = toolkit.mixin(config.appStateCurrent, updateObject);
        toolkit.updateHash(newAppState)
    };

    o.appStateCompare = function(oldState, newState) {
        debugger;

        //when a change is found

    },

    o.hashUpdate = function(updatedObj) {
        toolkit.updateHash(updatedObj);
    };





    return o;

});