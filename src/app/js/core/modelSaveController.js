/** 
 * This interface decides which model will save the data
 * to keep it in sync
 */
define(["core/config", "core/toolkitController", "components/app/appModel", "components/map/mapModel",
    "components/tools/toolsModel", "components/header/headerModel"
], function(config, toolkit, appModel, mapModel, toolsModel, headerModel) {

    var o = {};

    o.updateView = function(viewsList) {
        // debugger;
        // headerModel.set("viewLinks", []);
        // headerModel.setArray("viewLinks", viewsList);
        headerModel.set("viewLinks", viewsList);
    }

    return o;

});