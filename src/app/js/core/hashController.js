define(["core/config", "core/toolkitController"], function(config, toolkit) {

    var o = {};
    var changeDetect = true;
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

        o.startDetectHashChange();

        return true;
    };

    o.startDetectHashChange = function() {

        toolkit.topicSubscribe("/dojo/hashchange", function(changedHash) {
            // Handle the hash change publish
            if (!changeDetect) {
                changeDetect = true;
                return;
            }

        });

    };

    o.updateHash = function(updateObject) {
        var cloneAppStateCurrent = toolkit.clone(config.appStateCurrent);
        var newAppState = toolkit.mixin(config.appStateCurrent, updateObject);
        var hashString = toolkit.objectToQuery(newAppState);
        var hash = toolkit.getHash();
        hash(hashString);
        if (changeDetect) {
            o.appStateCompare(cloneAppStateCurrent, newAppState);
        } else {
            changeDetect = true;
        }
    };

    o.updateHashWithoutChangeDetect = function(updateObject) {

        changeDetect = false;

        o.updateHash(updateObject);

    };

    o.appStateCompare = function(oldState, newState) {

        var changesArray = [];

        for (var prop in oldState) {

            if (oldState[prop] != newState[prop]) {
                changesArray.push(prop);
            }

        }

        if (changesArray.length > 0) {
            o.handleChanges(oldState, newState, changesArray);
        }

        //when a change is found

    };

    o.handleChanges = function(oldState, newState, changesArray) {



    }


    return o;

});