## Purpose 
This is a starter app that follows conventions documented in the docs folder. 

## Libraries / Dependencies
1. Esri JavaScript API
2. Dojo
3. KnockoutJS
4. Jasmine
5. Karma
6. NodeJS

## How to Use
1. Install NodeJS
2. Run the following commands from the root folder
	npm install
	npm install -g gulp
	npm install -g coffee-script
	npm install -g karma-cli
3. Open src/app/main.js and set the baseUrl to http URL to the src folder
4. Run the command 'gulp build' to have your code optimized in the build folder

## What do you get?
1. Share, using AddThis
2. Browser Check
3. Google Analytics
4. Multiple Views
5. Multiple Maps
6. A notification API
	core.showMessageDialog(messageHTML);
	core.hideMessageDialog(messageHTML);
7. A blocking API
	core.blockModule(node or ID);
	core.resumeModule(node or ID);
8. A URL update API

## What goes where? Folder Structure
1. src/app/js/components - UI components. May be part of the View linked to the menu
2. src/app/js/core
	config.js
	coreController.js - All esri/xxxx and dojo/xxxx modules should be required here

## How to add new modules
1. Make a copy of the template folder
2. 

## Rules to keep the Application scalable
1. All updates to Models happen in ModelSaveController.js
2. All events binded to models gets channelled through ModelEventCOntroller.js
3. All dojo/on events get channelled through onEventController.js
4. Do NOT write topic.publish / topic.subscribe
5. Use 'exports' to avoid circular dependency. Example hashController.js
6. Keep your styl file in the module folder but include it in app.styl
7. The folder name of module and prefix should match. 

## How to Test
1. Write Tests in CoffeeScript
2. Run karma start
3. Write tests in *Spec.js file






