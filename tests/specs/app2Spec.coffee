define [
  "core/coreController"
  "core/toolkitController"
  "components/app/appController"
  "dojo/text!components/app/appPartial.html"
], (core, toolkit, appController) ->
  describe "App Async ", ->
    appPartialDeferred = undefined
    beforeEach (done) ->
      appPartialDeferred = toolkit.loadPartial("components/app/appPartial.html")
      appPartialDeferred.then (html) ->
        done() # if this runs then its successful
        return

      return

    it "should support async execution to get appPartial.html", (done) ->
      expect(true).toBe true
      done()
      return

    return

  return
