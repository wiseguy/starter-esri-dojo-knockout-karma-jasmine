/** 
 * This interface handles all events (clicks, mouseover) in the models *
 */
define(["exports", "core/config", "core/toolkitController", "components/app/appController",
    "components/map/mapController", "components/tools/toolsController", "components/header/headerController",
    "core/hashController"

], function(o, config, toolkit, appController, mapController, toolsController, headerController, hash) {

    o.syncExtents = function(clickedItem) {
        // ga('send', 'pageview');        
        mapController.syncExtents(clickedItem);

    };

    o.addMap = function(clickedItem) {

        mapController.incrementMap();

    }

    o.showMaps = function(count) {

        // mapController.changeTotalMaps(count);
        hash.updateApp({
            m: count
        });

    }


    o.removeMap = function(clickedItem) {

        mapController.decrementMap();

    }

    o.showHelp = function(clickedItem) {

        toolsController.showHelp();

    }

    o.selectView = function(view) {
        ga('send', {
            'hitType': 'pageview', // Required.
            'eventCategory': 'link', // Required.
            'eventAction': 'click', // Required.
            'eventLabel': view.label,
            'eventValue': 1
        });

        headerController.selectView(view.id);

    }

    o.setActiveMap = function(node, mapIndex) {

        hash.updateApp({
            a: mapIndex
        });

    }

    o.zoomToPlace = function(place) {
        //alert(place.name);
        mapController.zoomToXY(place);
    }

    o.selectTheme = function(theme, mapIndex) {
        //alert(place.name);
        mapController.selectTheme(theme, mapIndex);
    }

    o.showMapOptions = function(theme, evt) {
        debugger;
    }

    o.zoomToCurrentLocation = function(mapIndex) {

        mapController.zoomToCurrentLocation(mapIndex);

    }

    o.syncMaps = function(mapIndex) {

        mapController.syncMaps(mapIndex);

    }


    return o;
});