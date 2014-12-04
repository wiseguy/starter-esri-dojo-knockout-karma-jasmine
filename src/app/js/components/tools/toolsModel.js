define(["ko", "core/config", "core/modelEventController"],
    function(ko, config, modelEventController) {

        var o = {};
        var vm = {};

        vm.title = ko.observable();

        /**
         * set defaults
         */
        o.initialize = function() {

            vm.title("Aamir test");

        };

        /**
         * handle events
         */
        vm.clickButton = function(clickedItem) {
            modelEventController.handleClickGo(clickedItem);
        };

        vm.addMap = function() {
            modelEventController.addMap();
        };

        vm.removeMap = function() {
            modelEventController.removeMap();
        };



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