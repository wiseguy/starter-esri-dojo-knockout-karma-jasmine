define(["ko", "core/config", "core/modelEventController"],
    function(ko, config, modelEventController) {

        var o = {};
        var vm = {};

        vm.viewLinks = ko.observableArray([]);

        /**
         * set defaults
         */
        o.initialize = function() {

            vm.viewLinks(config.viewLinks);

        };

        /**
         * handle events
         */
        vm.selectView = function(view) {

            modelEventController.selectView(view);

        }



        /**
         * bind to DOM
         */
        o.bind = function(node) {
            console.log("apply bindings for tools");
            ko.applyBindings(vm, node);
        };


        /**
         * API to get and set model
         */
        o.get = function(name) {
            return vm[name]();
        };

        /*o.getObservable = function(name) {
            return vm[name];
        };*/

        o.set = function(name, value) {
            vm[name](value);
        };

        return o;


    });