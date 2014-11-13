define(["core/config", "core/toolkitController"], function(config, toolkit) {

    var o = {};

    o.startup = function() {

        this.initProxy();
        this.initPreCallback();
        this.initCors();
        this.startAppStateTracking();
        this.startModule("app");



        //set the default esri config
        //set the proxy
        //set the cors

    };

    o.initProxy = function() {

    };

    o.initPreCallback = function() {

    };

    o.initCors = function() {

    };

    o.startModule = function(moduleId) {

        require(["components/" + moduleId + "/" + moduleId + "Controller"], function(module) {
            module.startup();
        });

    };

    o.stopModule = function(moduleId) {

        require(["components/" + moduleId + "/" + moduleId + "Controller"], function(module) {
            module.stop();
        });

    };

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