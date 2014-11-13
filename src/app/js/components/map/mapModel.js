define(["ko", "core/config"],
    function(ko, config) {

        var o = {};
        var vm = {};

        vm.title = ko.observable();

        console.log("apply bindings for app");

        o.startup = function() {
            //set defaults
            vm.title("Aamir test");

        }


        o.bind = function(node) {
            ko.applyBindings(vm, node);
        }

        return o;


    });