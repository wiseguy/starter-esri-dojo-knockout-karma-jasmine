This Project should do the following:

1. Follow Conventions made at the company
2. Keep Tests in mind, write tests first using Jasmine, and Run using Karma
3. Be built in the MVVM Library KnockoutJS
4. Set Standards for Folder structures
5. Support the App state in URL
6. Use Jade
7. Use Stylus
8. Use Gulp


## App Workflow

1. Renders page with inline styl
2. Reads current URL


## Modules

1. Main.js - Loads CSS, Jquery & Require / Dojo
2. ToolkitController.js - gets 
3. MappingController.js - gets 


## Folder Structure

build
src
	app
		

		images
			logo.jpg
		css
		js
			libs
				knockout.js
			core
				config.js - defines all app URL, messages, Layers, outFields
				main.js - Bootup the library, requireloadCSS, check browser version, proceed if browser version is good else stop
				ToolKitController.js - Implementation of Toolkit stuff should be done here
				MappingController.js - Implementation of map stuff should be done here, new Map, new Layer, addLayer, knows what the map is

				AppController.js - Start a module, Close a Module, showNotification, hideNotification, getAppState, setAppState, getBrowserVersion, 					syncViewModels
				Start a module will set defaults for the module, initialize the model, load css, load the html to the body, 

			components
				compname1
					compname1Partial.html
					compname1Controller.js - quries a layer and gets graphics on map
					compname1Model.js - has the model and events
					compname1.css
				compname2
					compname2Partial.html
					compname2Controller.js - hooks on to the change event of layer and updates the graphics list
					compname2Model.js - has the model and events, clicking on button 
					compname2.css

	html
		index.htm
	tests
		xxxSpec.js
