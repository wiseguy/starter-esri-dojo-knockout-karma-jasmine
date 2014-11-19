define(["core/coreController", "core/toolkitController", "components/app/appController", "dojo/text!components/app/appPartial.html"],

    function(core, toolkit, appController) {

        describe("App Async ", function() {
            var appPartialDeferred;

            beforeEach(function(done) {
                appPartialDeferred = toolkit.loadPartial("components/app/appPartial.html");
                appPartialDeferred.then(function(html) {
                    done(); // if this runs then its successful
                });
            });

            it("should support async execution to get appPartial.html", function(done) {
                expect(true).toBe(true);
                done();
            });

        });

    });