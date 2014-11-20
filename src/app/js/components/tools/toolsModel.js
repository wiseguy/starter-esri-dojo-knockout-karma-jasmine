define(["ko", "core/config", "core/modelEventController"],
    function(ko, config, modelEventController) {

        var o = {};
        var vm = {};

        vm.title = ko.observable();

        vm.clickButton = function(clickedItem) {
            modelEventController.handleClickGo(clickedItem);
        };

        vm.addMap = function() {
            modelEventController.addMap();
        }

        console.log("apply bindings for app");

        o.startup = function() {
            //set defaults
            vm.title("Aamir test");

        };


        o.bind = function(node) {
            ko.applyBindings(vm, node);
        };

        o.getModel = function() {
            return vm;
        };

        o.setModel = function(name, value) {
            vm[name](value);
        };

        return o;


    });