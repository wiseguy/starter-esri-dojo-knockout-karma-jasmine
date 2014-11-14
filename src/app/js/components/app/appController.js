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

define(["core/config", "components/app/appModel", "core/toolkitController", "core/coreController"],

    function(config, appModel, toolkit, core) {

        var o = {};

        o.startup = function() {
            var currentView;
            var _this = this;

            //looad the partial
            var loadAppDeferred = toolkit.loadPartial("components/app/appPartial.html");

            loadAppDeferred.then(function(html) {

                console.log("load startup");

                o.createUI(html);


                //now decide which part of the app to load based on url
            });


            return loadAppDeferred;

        };

        o.createUI = function(html) {

            console.log("create App UI");

            toolkit.injectHtml("body", html, "only");

            //start model with default values
            appModel.startup();

            //start model with default values
            appModel.bind(toolkit.getNodeList(".app-container")[0]);

            //load other components
            //core.startModule("header");
            //core.startModule("footer");                
            core.startModule("tools");

            //start the view that is in current app state

            currentView = config.appStateCurrent.v;

            core.startModule(currentView);

        }

        return o;

    });