define(["exports", "ko", "core/config", "core/modelEventController"],
    function(o, ko, config, modelEventController) {

        // var o = {};
        var vm = {};

        vm.text = ko.observable();
        vm.isActive = ko.observable();
        /**
         * set defaults
         */
        o.initialize = function() {

            vm.text("This is the Dashboard page");
            vm.isActive(true);

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