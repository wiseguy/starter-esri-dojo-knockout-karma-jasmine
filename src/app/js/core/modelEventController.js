/** 
 * This interface handles all events (clicks, mouseover) in the models *
 */
define(["exports", "core/config", "core/toolkitController", "components/app/appController",
    "components/map/mapController", "components/tools/toolsController"

], function(o, config, toolkit, appController, mapController, toolsController) {

    o.handleClickGo = function(clickedItem) {
        // TODO : Get rid of require. Circular dependency?

        toolsController.handleClickGo(clickedItem);

    }

    return o;
});