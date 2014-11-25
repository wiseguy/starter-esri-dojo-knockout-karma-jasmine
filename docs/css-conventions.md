# Blue Raster Style Conventions Guide
The following should be followed closely, if using this on a project, don't consider any established guidelines optional. 

** Important Distinction - Embeddable vs Standalone ** 
There are two sections to this guide: 
- [Embeddable Project Guidelines](#embeddable)
- [Standalone Project Guidelines](#standalone)

## Embeddable Project Guidlines <a id="embeddable"></a>

#### General Rules
- ** Write only in stylus files ** - important for nesting for readability and outputting a single compressed css file, the only exception is editing an external css file
- ** Use stylus @imports ** - only one internally developed css file should be loaded into the production code, this can be achieved by using stylus' precompiled @import to essentially concatenate files for the single production css file 
```
	STATcompiler - main.styl

	/*************************************************
	IMPORTS
	  Import other styl or css files here, syntax:
	  example: @import 'styl/widget'
	*************************************************/
	@import data
	@import map
	@import fullscreen
```
- ** Don't use native @imports ** - @imports in css files stops the browser's css evaluation to resolve the request, only use @imports in stylus files as they're precompiled and don't actually output native @imports
- ** Maintain app state in html tag / .brAppContainer (root of app) ** - Try to seperate logic and presentation with JS and CSS this . 

#### Naming
- ** Use hyphenated naming ** - use "header-logo" instead of "headerLogo"
- ** Don't use ids ** - ids are only appropriate for js identification/manipulation, never for style definitions, using ids encourages wasteful non-reusable classes and discourages you from styling in an object oriented manner
- ** Don't prefix or suffix elements in class names ** - if your classes are small and reusable then they should also be widely applicable, a ".tile" or ".blue" class should be easily applied to both a span or div the same, naming a class with an element ".footerDiv" introduces verbosity

#### Formatting
- ** Don't use unnecessary characters in stylus files ** - omitting colons & semicolons (":", ";") helps keep a consistent style and improve readability, using this convention you just separate your property and value by default with a space
- ** Use newlines to separate selectors ** - because we're using stylus using commas to separate selectors becomes unnecessary, it's better for readability and simplicity to just write one selector per line
- ** Scope styles appropriately ** - consider nesting as your base context for your styles, if developing a popup class with a popup.styl file, all your styles would theoretically be nested in the .popup class
- ** Nest appropriately ** - don't over-nest, try to keep your nesting at around 3 levels deep, however remember that if nesting with stylus' "&" parent selector, it's more of a convenience nest and shouldn't count as its own level
- ** Write small, reusable classes ** - if you make your classes too specific they won't be reusable, this will introduce redundant styles, a "tile" class for a button should just apply a flat look, but doesn't have to mess with font size or margins/padding, these should be controlled in more specific selectors by button
- ** Use descriptive documentation ** - while we aren't using extensive per class documentation, it's still very helpful to document sections using the standard block in main.styl
- ** Section off code ** - use a documentation block to signify changes in the focus of that particular section of classes
- ** Separate large sections into documented files ** - if the focus of a section of classes is very specific and extensive, it's recommended to bring the code into another file and add it as an @import at the bottom of main.styl, this helps with organization but also reduces conflicts and eases code merging
- ** Use soft tabs with two space indents ** - this is more important for stylus files as that is what is developed internally, you can ignore this for modifying external css
- ** Use single quotes for values ** - example: font-family 'open sans', arial, sans-serif
- ** Omit 0 before decimal period ** - example: opacity .7
- ** UNDECIDED Order rules ** - alphabetically? by function? leave to individual developers? 
- ** UNDECIDED Omit units when using 0 ** - example: border-width 0px vs border-width 0 

#### Colors3
- ** Use a color palette ** - using stylus we define all the colors we are provided in comps/styleguides as named variables, this is done in the main stylus file, you should strive to stay just within that palette and only use those variables, variances for unique colors can be inevitable but should be avoided if possible, this also helps in the case of having to change any colors

```
	STATcompiler - main.styl

	/*************************************************
	COLOR PALETTE
	  Generally agreed upon colors, should be found 
	  in the style guide or comps, try to refrain
	  from using colors outside the pallet, prefix
	  the variables with "p" for palete.
	*************************************************/

	$pGreen = #009267

	$pBlue = #0860A2
	$pBlueDark = #2B3E4E
	$pBlueLight = #738EB5
	$pBlueLight2 = #ACC5DA // lighter

	$pGreyLight = #F5F5F5
	$pGreyLight2 = #F8F9FB // lighter
```
- ** Add to the color palette ** - if you see a color specified (not color-picked by you, specifically documented) in a comp or style guide that's missing go ahead and add it to the main stylus file, it'll save you or someone else having to look it up again 

#### Fonts
- ** Use variable font stacks ** - similar to the color palette, common font stacks are defined as variables in the main stylus file, to prevent font on load flickering this is typically the first thing specified by the main stylus file

```
	STATcompiler - main.styl

	/*************************************************
	FONT
	  Load fonts immediately here to prevent load
	  flickering, either define font stacks here or 
	  import an appropriate file.
	*************************************************/
	@font-face
	  font-family: 'GillSansLight';
	  src: url("../font/GillSans_Bold/gillsans_bold.svg#GillSansBold");
	  src: url("../font/GillSans_Light/gillsans_light.eot?#iefix") format('embedded-opentype'), url("../font/GillSans_Light/gillsans_light.woff") format('woff'), url("../font/GillSans_Light/gillsans_light.ttf") format('truetype'), url("../font/GillSans_Light/gillsans_light.svg#GillSansLight") format('svg');

	@font-face
	  font-family: 'GillSansBold';
	  src: url("../font/GillSans_Bold/gillsans_bold.eot");
	  src: url("../font/GillSans_Bold/gillsans_bold.eot?#iefix") format('embedded-opentype'), url("../font/GillSans_Bold/gillsans_bold.woff") format('woff'), url("../font/GillSans_Bold/gillsans_bold.ttf") format('truetype'), url("../font/GillSans_Bold/gillsans_bold.svg#GillSansBold") format('svg');

	@font-face
	  font-family: 'GillSansRegular';
	  src: url("../font/GillSans_Regular/gillsans_regular.eot");
	  src: url("../font/GillSans_Regular/gillsans_regular.eot?#iefix") format('embedded-opentype'), url("../font/GillSans_Regular/gillsans_regular.woff") format('woff'), url("../font/GillSans_Regular/gillsans_regular.ttf") format('truetype'), url("../font/GillSans_Regular/gillsans_regular.svg#GillSansRegular") format('svg');

	@font-face
	  font-family: 'ProximaNova-Black';
	  src: url('../font/ProximaNova/ProximaNova-Black.otf');

	@font-face
	  font-family: 'ProximaNova-Bold';
	  src: url('../font/ProximaNovaProximaNova-Bold.otf');

	@font-face
	  font-family: 'ProximaNova-Extrabold';
	  src: url('../font/ProximaNova/ProximaNova-Extrabold.otf');

	@font-face
	  font-family: 'ProximaNova-Regular';
	  src: url('../font/ProximaNova/ProximaNova-Regular.otf');

	@font-face
	  font-family: 'ProximaNova-Semibold';
	  src: url('../font/ProximaNova/ProximaNova-Semibold.otf');

	$GillSansLight = 'GillSansLight', Verdana, Geneva, sans-serif
	$GillSansBold = 'GillSansBold', Verdana, Geneva, sans-serif
	$GillSans = 'GillSansRegular', Verdana, Geneva, sans-serif
	$VerdanaDefault = Verdana, sans-serif
```

#### Main Stylus file order
1. Fonts
2. Color Pallette
3. Misc. variable Declarations (z-index)
4. Element Rules
5. Class Rules
6. Imports for .styl/.css files

#### Partial Stylus file order
1. Class Rules
2. Media Queries

## Standalone Project Guidlines <a id="standalone"></a>
- ** Inline critical css ** - ideal for mobile to render page quickly
- ** Inline Normalize.css ** - a stylesheet to render elements more consistently across browsers, this is included by default in Bootstrap, it doesn't provide any helper classes it's just good to be aware it's there

#### References
References to skim, backup a lot of reasoning in these guildines

- http://www.phpied.com/css-and-the-critical-path/
- http://css-tricks.com/a-line-in-the-sand/
- http://learnboost.github.io/stylus/docs/selectors.html (the parent reference is particularly important)
- http://learnboost.github.io/stylus/docs/import.html
- http://getbootstrap.com/components/
- http://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css
- http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/
- http://www.feedthebot.com/pagespeed/optimize-css-delivery.html

