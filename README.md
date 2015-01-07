## Purpose 

This is a starter template app. It is source to begin any new application. It contains style conventions in the [docs folder](docs) .

##TODO

- add a data loader - esri request
- add docs for specs
- add more tests

## Libraries / Dependencies

1. Esri JavaScript API
2. Dojo
3. KnockoutJS
4. Jasmine
5. Karma
6. NodeJS
7. Bootstrap and Jquery
8. Zurb Joyride

## How to Use

1. Install NodeJS
2. Run the following commands from the root folder
	npm install
	npm install -g gulp
	npm install -g coffee-script
	npm install -g karma-cli
3. Open src/app/main.js and set the baseUrl to http URL to the src folder
4. Run the command 'gulp dist' to have your code optimized in the dist folder

## What do you get?

1. Share, using AddThis
2. Browser Check for Compatibility
3. Google Analytics
	https://developers.google.com/analytics/devguides/collection/analyticsjs/events
4. Multiple Views
5. Multiple Maps with ability to add, remove and Sync maps
6. A notification API
	core.showMessageDialog(messageHTML);
	core.hideMessageDialog();
7. A blocking API
	core.blockComponent(node or ID);
	core.resumeComponent();
8. A URL update API - hash.updateURL and hash.updateApp
9. Theme Selector
10. Responsive Layout - Bootstrap
11. Appcache for offline capabilities
12. Knockout Components Example
13. A Feature Tour of the application

## What goes where? Folder Structure
1. src/app/js/components - UI components. May be part of the View linked to the menu
2. src/app/js/core
	config.js
	coreController.js - All esri/xxxx and dojo/xxxx modules should be required here
	modelEventController - All events triggered by knockout binding must be channeled here
	onEventController - All events triggered by dojo/on must be channeled here
	modelSaveController - all model.set should be done here

## Adding a new component
1. Make a copy of the template folder
2. A component could be part of a view.

## Rules to keep the Application scalable and inline with user expectation
1. All updates to Models happen in ModelSaveController.js
2. All events binded to models gets channelled through ModelEventCOntroller.js
3. All dojo/on events get channelled through onEventController.js
4. Do NOT write topic.publish / topic.subscribe
5. Use 'exports' to avoid circular dependency. Example hashController.js
	(Warning: using circular dependency makes it hard to do the requirejs optimizer)
6. Keep your styl file in its own component folder but include it in app.styl
7. The folder name of component and prefix should match. 
8. Use combination on and touch events

## How to Test
1. Write Tests in CoffeeScript
2. Run karma start
3. Write tests in *Spec.js file

## Flow
main.js --> coreController.js --> appController.js --> current view





