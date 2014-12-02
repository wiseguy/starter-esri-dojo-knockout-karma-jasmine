/** 
 * This interface handles all events that happen from dojo's on events *
 */
define(["exports", "core/config", "core/toolkitController", "core/hashController", "components/app/appController",
    "components/map/mapController", "components/tools/toolsController", "components/header/headerController"

], function(o, config, toolkit, hash, appController, mapController, toolsController, headerController) {

    o.extentChange = function(map) {

        var appCurrentState = config.appStateCurrent;
        var positionInView = map.positionInView;
        var center = map.extent.getCenter();
        var centerLL = toolkit.convertWM(center, 'wm'); //'ll'
        var level = map.getLevel();
        var updatedX = appCurrentState.x.split("!");
        updatedX[positionInView] = centerLL.x.toString();
        var updatedY = appCurrentState.y.split("!");
        updatedY[positionInView] = centerLL.y.toString();
        var updatedL = appCurrentState.l.split("!");
        updatedL[positionInView] = level.toString();

        hash.updateHashWithoutChangeDetect({
            x: updatedX.join("!"),
            y: updatedY.join("!"),
            l: updatedL.join("!")
        });

    };


    return o;
});