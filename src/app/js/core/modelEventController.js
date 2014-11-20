/** 
 * This interface handles all events (clicks, mouseover) in the models *
 */
define(["exports", "core/config", "core/toolkitController", "components/app/appController",
    "components/map/mapController", "components/tools/toolsController"

], function(o, config, toolkit, appController, mapController, toolsController) {

    o.handleClickGo = function(clickedItem) {
        toolsController.handleClickGo(clickedItem);

    };

    o.addMap = function(clickedItem) {
        mapController.addMap(); //hardcoded to test

    }

    return o;
});