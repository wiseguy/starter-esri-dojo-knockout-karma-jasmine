define(["ko", "core/config", "core/modelEventController"],
    function(ko, config, modelEventController) {

        var o = {};
        var vm = {};

        vm.title = ko.observable();

        /**
         * set defaults
         */
        o.initialize = function() {

            vm.title("Dashboard");

        };

        /**
         * handle events
         */
        /* vm.selectView = function(view) {

            modelEventController.selectView(config.viewLinks);

        }*/



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

        o.set = function(name, value) {
            vm[name](value);
        };

        return o;


    });