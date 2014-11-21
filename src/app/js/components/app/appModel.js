define(["ko", "core/config"],
    function(ko, config) {

        var o = {};
        var vm = {};

        vm.title = ko.observable();

        console.log("apply bindings for app");

        o.initialize = function() {
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