/** 
 * This interface handles all events that happen from dojo's on events *
 */
define(["exports", "core/config", "core/toolkitController", "core/hashController", "components/app/appController",
    "components/map/mapController", "components/tools/toolsController", "components/header/headerController"

], function(o, config, toolkit, hash, appController, mapController, toolsController, headerController) {

    o.extentChange = function(map) {

        var center = map.extent.getCenter();
        var centerLL = toolkit.convertWM(center, 'wm'); //'ll'
        var level = map.getLevel();

        hash.updateHashWithoutChangeDetect({
            x: centerLL.x,
            y: centerLL.y,
            l: level
        });

    };


    return o;
});