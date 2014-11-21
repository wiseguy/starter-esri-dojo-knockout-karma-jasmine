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

define(["exports", "core/config", "components/dashboard/dashboardModel", "core/toolkitController", "core/coreController", "core/hashController"],

    function(o, config, dashboardModel, toolkit, core, hash) {

        /*
         * Private variables
         */
        o._initialized = false;
        o._isView = true;

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
            var loadDashboardDeferred = toolkit.loadPartial("components/dashboard/dashboardPartial.html");

            loadDashboardDeferred.then(function(html) {

                console.log("load startup");
                // debugger;




                o.createUI(html);

            });


            return loadDashboardDeferred;

        };



        o.createUI = function(html) {

            var selectorNode = ".app-container";
            var checkIfNodeExists = (toolkit.getNodeList(".app-container").length == 1);
            if (!checkIfNodeExists) {
                selectorNode = "body"; //during tests
            }

            toolkit.injectHtml(selectorNode, html, "last");



            //start model with default values
            dashboardModel.initialize();

            //start model with default values
            dashboardModel.bind(toolkit.getNodeList(".dashboard-container")[0]);

            console.log("parsing dashboard");
            toolkit.parseDojo(toolkit.getNodeList(".dashboard-container")[0]);


        };


        /*
         * Custom methods for controllers
         */

        return o;

    });