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

define(["core/config", "components/tools/toolsModel", "core/toolkitController", "core/coreController", "core/hashController"],

    function(config, toolsModel, toolkit, core, hash) {

        var o = {};

        o.startup = function() {

            var _this = this;

            //looad the partial
            var loadToolsDeferred = toolkit.loadPartial("components/tools/toolsPartial.html");

            loadToolsDeferred.then(function(html) {

                console.log("load startup");
                // debugger;

                var checkIfNodeExists = (toolkit.getNodeList(".app-container").length == 1);
                var selectorNode = ".app-container";
                if (!checkIfNodeExists) {
                    selectorNode = "body"; //during tests
                }

                toolkit.injectHtml(".app-container", html, "last");

                //start model with default values
                toolsModel.startup();

                //start model with default values
                toolsModel.bind(toolkit.getNodeList(".tools-container")[0]);

            });


            return loadToolsDeferred;

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