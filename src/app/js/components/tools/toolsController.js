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

        /*
         * Common methods for controllers
         */

        o.isInitialized = function() {
            return o._initialized;
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

            //dom dependant initialization
            if (config.plugins.share) {
                o.addShare();
            }


        };

        /*
         * Custom methods for controllers
         */

        o.addShare = function() {

            core.addShare();

        };

        o.showHelp = function() {

            $('#joyRideTipContent').joyride({
                autoStart: true,
                postStepCallback: function(index, tip) {
                    /*if (index == 2) {
                        $(this).joyride('set_li', false, 1);
                    }*/
                },
                nubPosition: 'auto',
                modal: true,
                expose: true,
                nextButton: true
            });

            // $(window).joyride('resume');


        };

        o.shareButton = function(node) {


            //show container
            var shareNode = toolkit.getNodeList(".share-container")[0];

            var isClosed = toolkit.containsClass(shareNode, "dijitHidden");

            if (isClosed) {

                toolkit.removeClass(shareNode, "dijitHidden");
                toolkit.placeDom(shareNode, node, "last");

            } else {

                toolkit.addClass(shareNode, "dijitHidden");

            }

        };

        o.geocode = function(node) {

            //show container
            var shareNode = toolkit.getNodeList(".geocode-container")[0];

            var isClosed = toolkit.containsClass(shareNode, "dijitHidden");

            if (isClosed) {

                toolkit.removeClass(shareNode, "dijitHidden");
                toolkit.placeDom(shareNode, node, "last");

            } else {

                toolkit.addClass(shareNode, "dijitHidden");

            }

        };

        return o;

    });