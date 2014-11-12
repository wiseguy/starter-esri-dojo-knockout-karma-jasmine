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
            var _this = this;
            _this.appStateInit();
            //looad the partial
            var loadApp = toolkit.loadPartial("components/app/appPartial.html");

            loadApp.then(function(html) {
                console.log("load startup");

                toolkit.injectHtml("body", html, "only");

                //start model with default values
                appModel.startup();

                //start model with default values
                appModel.bind(toolkit.getNodeById("appContainer"));



                //now decide which part of the app to load based on url
            });


            return loadApp;
            //bind model

            //load css

        };

        /**
         * starts tracking the app state change in URL
         * injects the default state
         */
        o.appStateInit = function() {



            return true;
        }


        return o;

    });