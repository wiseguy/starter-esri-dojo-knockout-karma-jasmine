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

define(["exports", "core/config", "components/header/headerModel", "core/toolkitController", "core/coreController", "core/hashController",
        "core/modelSaveController"
    ],

    function(o, config, headerModel, toolkit, core, hash, modelSaveController) {

        //var o = {};
        o._initialized = false;
        o._isView = false;

        o.startup = function() {

            var _this = this;

            if (o._initialized) {
                return
            } else {
                o._initialized = true;
            }

            //looad the partial
            var loadToolsDeferred = toolkit.loadPartial("components/header/headerPartial.html");

            loadToolsDeferred.then(function(html) {

                console.log("load startup");
                // debugger;




                o.createUI(html);

            });


            return loadToolsDeferred;

        };


        o.createUI = function(html) {

            var selectorNode = ".app-container";
            var checkIfNodeExists = (toolkit.getNodeList(".app-container").length == 1);
            if (!checkIfNodeExists) {
                selectorNode = "body"; //during tests
            }

            toolkit.injectHtml(selectorNode, html, "last");


            //update link to set the selected as true
            var selectedViewId = config.appStateCurrent.v;
            toolkit.arrayEach(config.viewLinks, function(viewLink) {
                if (viewLink.id === selectedViewId) {
                    viewLink["selected"] = true;
                } else {
                    viewLink["selected"] = false;
                }
            });

            //start model with default values
            headerModel.initialize();

            //start model with default values
            headerModel.bind(toolkit.getNodeList(".header-container")[0]);

            console.log("parsing header");
            toolkit.parseDojo(toolkit.getNodeList(".header-container")[0]);


        };


        /*
         * Custom methods for controllers
         */

        o.selectView = function(viewId) {

            var viewLinks = headerModel.get("viewLinks");
            headerModel.set("viewLinks", []);


            toolkit.arrayEach(viewLinks, function(viewLink) {
                if (viewLink.id === viewId) {
                    viewLink.selected = true;
                    o.switchView(viewLink.id)
                } else {
                    viewLink.selected = false;
                }
            });

            modelSaveController.updateView(viewLinks);

        };

        o.switchView = function(viewId) {
            //debugger;
            hash.updateHash({
                v: viewId
            });

            // core.startModule(viewId);


        }

        o.isInitialized = function() {
            return o._initialized;
        }

        o.isView = function() {
            return o._isView;
        }



        return o;

    });