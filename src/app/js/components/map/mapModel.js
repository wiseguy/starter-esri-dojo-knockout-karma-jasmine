define(["exports", "ko", "core/config", "core/modelEventController", "core/toolkitController"],
    function(o, ko, config, modelEventController, toolkit) {

        //var o = {};
        var vm = {};

        vm.title = ko.observable();
        vm.isActive = ko.observable();
        vm.userRating = ko.observable('like');




        vm.setActiveMap = function(model, evt) {
            console.log("mapModel setActiveMap");

            var mapIndex = toolkit.arrayIndex(toolkit.getNodeList(".map"), evt.currentTarget);

            modelEventController.setActiveMap(evt.currentTarget, mapIndex);

        };


        /**
         * set defaults
         */
        o.initialize = function() {
            //set defaults
            vm.title("Map");
            vm.isActive(true);

            ko.components.register('like-widget', {
                viewModel: {
                    require: 'components/map/component-like-widget'
                },
                template: {
                    require: 'dojo/text!components/map/component-like-widget.html'
                }
            });

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