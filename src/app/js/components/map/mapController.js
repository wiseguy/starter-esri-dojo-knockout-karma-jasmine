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

        o.startup = function() {

            var _this = this;

            //looad the partial
            var loadMapDeferred = toolkit.loadPartial("components/map/mapPartial.html");

            loadMapDeferred.then(function(html) {

                console.log("load startup");


                toolkit.injectHtml(".app-container", html, "last");

                //start model with default values
                mapModel.startup();

                //start model with default values
                mapModel.bind(toolkit.getNodeList(".map-container")[0]);

            });


            return loadMapDeferred;

        };




        return o;

    });