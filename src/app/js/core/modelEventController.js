/** 
 * This interface handles all events (clicks, mouseover) in the models *
 */
define(["core/config", "core/toolkitController", "components/app/appController",
    "components/map/mapController"

], function(config, toolkit, appController, mapController) {

    var o = {};

    o.handleClickGo = function(clickedItem) {
        // TODO : Get rid of require. Circular dependency?
        require(["components/tools/toolsController"], function(toolsController) {
            toolsController.handleClickGo(clickedItem);
        });
    }

    return o;
});