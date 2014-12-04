/** 
 * This interface handles all events (clicks, mouseover) in the models *
 */
define(["exports", "core/config", "core/toolkitController", "components/app/appController",
    "components/map/mapController", "components/tools/toolsController", "components/header/headerController"

], function(o, config, toolkit, appController, mapController, toolsController, headerController) {

    o.handleClickGo = function(clickedItem) {
        // ga('send', 'pageview');        
        toolsController.handleClickGo(clickedItem);

    };

    o.addMap = function(clickedItem) {

        mapController.incrementMap();

    }

    o.removeMap = function(clickedItem) {

        mapController.decrementMap();

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

    return o;
});