define(["ko", "core/config", "core/modelEventController", "core/toolkitController"],
    function(ko, config, modelEventController, toolkit) {

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