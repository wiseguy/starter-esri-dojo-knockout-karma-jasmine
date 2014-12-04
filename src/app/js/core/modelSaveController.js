/** 
 * This interface decides which model will save data
 * to keep it in sync
 * All model sets should be done only in this file
 */
define(["core/config", "core/toolkitController", "components/app/appModel", "components/map/mapModel",
    "components/tools/toolsModel", "components/header/headerModel", "components/dashboard/dashboardModel", "components/map/mapModel"
], function(config, toolkit, appModel, mapModel, toolsModel, headerModel, dashboardModel, mapModel) {

    var o = {};

    o.updateView = function(viewsList) {

        //headerModel.set("viewLinks", []);
        headerModel.set("viewLinks", viewsList);

        toolkit.arrayEach(viewsList, function(view) {
            eval(view.id + "Model").set("isActive", view.selected);
        });

    }

    return o;

});