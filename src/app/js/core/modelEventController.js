/** 
 * This interface handles all events (clicks, mouseover) in the models *
 */
define(["core/config", "core/toolkitController", "components/app/appController",
    "components/map/mapController",
    "components/tools/toolsController"
], function(config, toolkit, appController, mapController, toolsController) {

    var o = {};
    debugger;
    o.handleClickGo = function(clickedItem) {

        toolsController.handleClickGo(clickedItem);
    }

    return o;
});