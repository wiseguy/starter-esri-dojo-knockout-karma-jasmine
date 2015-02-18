define(["exports", "ko", "core/config", "core/modelEventController", "core/toolkitController"],
    function(o, ko, config, modelEventController, toolkit) {

        //var o = {};
        var vm = {};

        vm.title = ko.observable();
        vm.isActive = ko.observable();
        vm.userRating = ko.observable('like');
        vm.visibleMapCount = ko.observable(1);
        vm.activeMapIndex = ko.observable(0);

        vm.zoomToCurrentLocation = function(model, evt) {
            var mapIndex = vm.activeMapIndex();
            modelEventController.zoomToCurrentLocation(mapIndex);
        }

        vm.syncMaps = function(model, evt) {
            var mapIndex = vm.activeMapIndex();
            modelEventController.syncMaps(mapIndex);
        }

        vm.shareButton = function(model, evt) {


        }

        vm.geocode = function(model, evt) {


        }

        vm.setActiveMap = function(model, evt) {

            console.log("mapModel setActiveMap");

            var mapIndex = toolkit.arrayIndex(toolkit.getNodeList(".map.main"), evt.currentTarget);


            modelEventController.setActiveMap(evt.currentTarget, mapIndex);

            return true;

        };


        /**
         * set defaults
         */
        o.initialize = function() {
            //set defaults
            vm.title("Map");
            vm.isActive(true);

            ko.components.register('zoom-to-place-widget', {
                viewModel: {
                    require: 'components/map/component-dropdown'
                },
                template: {
                    require: 'dojo/text!components/map/component-dropdown.html'
                }
            });

            ko.components.register('theme-widget', {
                viewModel: {
                    require: 'components/map/component-theme'
                },
                template: {
                    require: 'dojo/text!components/map/component-theme.html'
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