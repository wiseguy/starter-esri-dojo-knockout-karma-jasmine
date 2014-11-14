define(["core/coreController", "core/toolkitController", "components/app/appController",
        "components/map/mapController", "esri/map"
    ],

    function(core, toolkit, appController, mapController, Map) {

        describe("Map Async ", function() {
            var mapPartialDeferred;

            beforeEach(function(done) {
                mapPartialDeferred = toolkit.loadPartial("components/map/mapPartial.html");
                mapPartialDeferred.then(function(html) {
                    done(); // if this runs then its successful
                });
            });

            it("should support async execution to get mapPartial.html", function(done) {
                expect(true).toBe(true);
                done();
            });

        });

        describe("Map Spyon", function() {
            var mapPartialDeferred;
            var testHtml = "<h1>Hello World</h1>";
            beforeEach(function() {
                spyOn(mapController, 'createMap');
                mapController.createUI(testHtml);

            });

            it("createMap should be called when createUI is called", function() {
                expect(mapController.createMap).toHaveBeenCalled();
            });

        });



    })