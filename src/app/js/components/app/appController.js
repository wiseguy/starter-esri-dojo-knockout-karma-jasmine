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

define(["core/config", "components/app/appModel", "core/toolkitController", "core/onEventController", "core/coreController", "core/koExtend", "bootstrap"],

    function(config, appModel, toolkit, onevent, core, koExtend) {

        var o = {};
        /*
         * Private variables
         */
        o._initialized = false;


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

            koExtend.extend();

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

            toolkit.getOn()(window, "resize", function() {
                onevent.windowResize();
            });

            var activeViewLink = {};

            var deps = toolkit.arraySome(config.viewLinks, function(viewLink) {
                if (viewLink.id === activeViewId) {
                    activeViewLink = viewLink
                    return true;
                }
            });

            core.startModule(activeViewId, activeViewLink.deps);

        }

        /*
         * Custom methods for controllers
         */

        return o;

    });