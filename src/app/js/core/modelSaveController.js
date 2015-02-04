/** 
 * This interface decides which model will save data
 * to keep it in sync
 * All model sets should be done only in this file
 */
define(["exports", "core/config", "core/toolkitController", "components/app/appModel", "components/map/mapModel",
    "components/tools/toolsModel", "components/header/headerModel", "components/dashboard/dashboardModel"
], function(o, config, toolkit, appModel, mapModel, toolsModel, headerModel, dashboardModel) {


    o.updateView = function(viewsList) {


        headerModel.set("viewLinks", viewsList);
        // debugger;
        toolkit.arrayEach(viewsList, function(view) {
            var model = eval(view.id + "Model");
            model.set("isActive", view.selected);
        });

    }

    o.setActiveMap = function(mapIndex) {

        mapModel.set("activeMapIndex", mapIndex);

    }

    return o;

});