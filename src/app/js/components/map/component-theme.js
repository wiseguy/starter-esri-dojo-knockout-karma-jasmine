define(["ko", "core/modelEventController", "core/toolkitController", "core/config"], function(ko, modelEventController, toolkit, Config) {

    function ThemeWidgetVM(params) {
        //this.chosenValue = ko.observable(params.value);
        var themes = Config.themes;
        /*var themes = [{
            name: "Poverty",
            layer: "https://gisdev.sanacloud.com/arcgis/rest/services/ED_storymaps/Edu_attainment/MapServer/0"
        }, {
            name: "Population",
            layer: "https://gisdev.sanacloud.com/arcgis/rest/services/ED_storymaps/Edu_attainment/MapServer/0"
        }, {
            name: "Crime",
            layer: "https://gisdev.sanacloud.com/arcgis/rest/services/ED_storymaps/Edu_attainment/MapServer/0"
        }];*/


        this.themes = ko.observableArray(themes);

        this.chosenTheme = ko.observable();

        this.themeSelectHandler = function(theme) {

            this.chosenTheme(theme);
            //modelEventController.selectTheme(theme);
        }.bind(this);

        this.selectedMapIndex = function(index) {

            modelEventController.selectTheme(this.chosenTheme(), index);

        }.bind(this);
    }


    /*LikeWidgetViewModel.prototype.like = function() {
        console.log("like");
        this.chosenValue('like');
    };*/

    /*LikeWidgetViewModel.prototype.dislike = function() {
        console.log("dislike");
        this.chosenValue('dislike');
    };*/

    return ThemeWidgetVM;

});