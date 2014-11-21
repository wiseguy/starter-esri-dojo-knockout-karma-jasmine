/** 
 * This interface handles all events (clicks, mouseover) in the models *
 */
define(["exports", "core/config", "core/toolkitController", "components/app/appController",
    "components/map/mapController", "components/tools/toolsController", "components/header/headerController"

], function(o, config, toolkit, appController, mapController, toolsController, headerController) {

    o.handleClickGo = function(clickedItem) {

        toolsController.handleClickGo(clickedItem);

    };

    o.addMap = function(clickedItem) {

        mapController.addMap(); //hardcoded to test

    }

    o.removeMap = function(clickedItem) {

        mapController.removeMap(); //hardcoded to test

    }

    o.selectView = function(view) {

        headerController.selectView(view);

    }

    return o;
});