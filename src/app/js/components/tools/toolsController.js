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

define(["exports", "core/config", "components/tools/toolsModel", "core/toolkitController", "core/coreController", "core/hashController"],

    function(o, config, toolsModel, toolkit, core, hash) {

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

            //looad the partial
            var loadToolsDeferred = toolkit.loadPartial("components/tools/toolsPartial.html");

            loadToolsDeferred.then(function(html) {

                console.log("load startup");
                // debugger;




                o.createUI(html);

            });


            return loadToolsDeferred;

        };


        /*
         * Custom methods for controllers
         */

        o.createUI = function(html) {

            var selectorNode = ".app-container";
            var checkIfNodeExists = (toolkit.getNodeList(".app-container").length == 1);
            if (!checkIfNodeExists) {
                selectorNode = "body"; //during tests
            }

            toolkit.injectHtml(selectorNode, html, "last");



            //start model with default values
            toolsModel.initialize();

            //start model with default values
            toolsModel.bind(toolkit.getNodeList(".tools-container")[0]);

            console.log("parsing tools");

            toolkit.parseDojo(toolkit.getNodeList(".tools-container")[0]);

            o.addShare();

        };

        /*
         * Custom methods for controllers
         */

        o.addShare = function() {

            core.addShare();

        };

        o.handleClickGo = function() {

            //zoom the map to DC
            hash.updateHash({
                x: 11,
                y: 22
            });

        };



        return o;

    });