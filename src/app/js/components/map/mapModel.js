define(["ko", "core/config"],
    function(ko, config) {

        var o = {};
        var vm = {};

        vm.title = ko.observable();



        /**
         * set defaults
         */
        o.initialize = function() {
            //set defaults
            vm.title("Aamir test");

        };


        /**
         * bind to DOM
         */
        o.bind = function(node) {
            console.log("apply bindings for map");
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