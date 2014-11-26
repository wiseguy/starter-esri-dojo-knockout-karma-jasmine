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

define(["core/config", "components/app/appModel", "core/toolkitController", "core/coreController", "bootstrap"],

    function(config, appModel, toolkit, core) {

        var o = {};
        /*
         * Private variables
         */
        o._initialized = false;
        o._isView = false;

        /*
         * Common methods for controllers
         */

        o.isInitialized = function() {
            return o._initialized;
        }

        o.isView = function() {
            return o._isView;
        }

        o.startup = function() {

            var _this = this;

            if (o._initialized) {
                return
            } else {
                o._initialized = true;
            }

            //looad the partial
            var loadAppDeferred = toolkit.loadPartial("components/app/appPartial.html");

            loadAppDeferred.then(function(html) {

                console.log("load startup");

                o.createUI(html);

                // toolkit.registerFunctionWhenDomReady(function() {
                //     toolkit.parseDojo();
                // });



                //now decide which part of the app to load based on url
            });


            return loadAppDeferred;

        };

        o.createUI = function(html) {

            var activeViewId;

            console.log("create App UI");

            toolkit.injectHtml("body", html, "only");

            //start model with default values
            appModel.initialize();

            //start model with default values
            appModel.bind(toolkit.getNodeList(".app-container")[0]);

            //load other components
            //core.startModule("header");
            //core.startModule("footer");                

            core.startModule("header");
            core.startModule("tools");

            //start the view that is in current app state

            activeViewId = config.appStateCurrent.v;

            core.startModule(activeViewId);

        }

        /*
         * Custom methods for controllers
         */

        return o;

    });