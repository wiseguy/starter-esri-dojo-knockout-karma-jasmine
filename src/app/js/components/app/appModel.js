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
            vm[name](value);
        };

        o.setArray = function(name, arrayList) {
            toolkit.arrayEach(arrayList, function(value) {
                vm[name].push(value);
            });
        };

        return o;


    });