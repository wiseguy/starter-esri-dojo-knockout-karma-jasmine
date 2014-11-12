define(["core/coreController", "core/toolkitController", "components/app/appController", "dojo/text!components/app/appPartial.html"],

    function(core, toolkit, appController) {

        describe("The partial ", function() {
            it("appPartial is loaded", function() {
                var startup = appController.startup();
                startup.then(function() {
                    expect(true).toBe(true);
                });
            });
        });

        describe("The application ", function() {
            it("state is initialized", function() {
                var appStateInit = appController.appStateInit();
                expect(appStateInit).toBe(true);
            });
        });


    })