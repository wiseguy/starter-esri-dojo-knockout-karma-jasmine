define(["ko", "core/config", "core/toolkitController"],
    function(ko, config, toolkit) {

        var o = {};
        var vm = {};

        /**
         * Declare variables that are bindable
         */

        vm.title = ko.observable();

        console.log("apply bindings for app");

        o.initialize = function() {
            //set defaults
            vm.title("Application");

        };

        /**
         * bind to DOM
         */
        o.bind = function(node) {
            ko.applyBindings(vm, node);
        };

        /**
         * API to get and set model
         */
        o.get = function(name) {
            return vm[name]();
        };

        o.set = function(name, value) {
            if (value instanceof Array) {
                vm[name]([]); //empty first
                toolkit.arrayEach(value, function(v) {
                    vm[name].push(v);
                });
            } else {
                vm[name](value);
            }
        };

        return o;


    });