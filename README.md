# ClassEditorUML
JSON Editor for UML Class Definition with a Code Editor for the methods - based on the JSON editor of Jeremy Dorn.

* With [HandleBars](http://handlebarsjs.com/) the code generation in Javascript is implemented.


## Online Demo

https://niebert.github.io/ClassEditorUML

## Browserify and Watchify
Browserify and Watchify are used in this repository to control the WebApp-javascript development with the required Javascript libraries installed with [NPM Node.js](https://docs.npmjs.com/getting-started/installing-node) and similar framework world that greatly improve your javascript workflow: Using them, you no longer need to micro-manage your script tags but instead you just declare the libraries each of your client-side modules is using - or you can even create your own reusable modules! Also, installing (or updating) javascript libraries is as easy as running a single command!
* [Additional Information about Browserify and Watchify on GitHub](https://spapas.github.io/2015/05/27/using-browserify-watchify/)
* [Youtube Video about Browserify and Watchify by Kyle Robinson Young 2015/04/16](https://www.youtube.com/watch?v=CTAa8IcQh1U)
In this repository Browserify and Watchify are used for javascript code development with [NPM Node.js](https://docs.npmjs.com/getting-started/installing-node).

### Global Installation of Browserify and Watchify
Requirement: [NPM](https://docs.npmjs.com/getting-started/installing-node) is intalled. Now call for global installation of Browserfy and Watchify by:

___npm install -g browserify watchify___

This is recommended because your will not install Browserfy and Watchify for all your repositories separately.

### Package Installation of Browserify and Watchify - Alternative
If your prefer that  browserify and watchify is installed with your ___npm install___ command, save these to modules to your dev-dependecies in your ___package.json___ by calling

* (Install Browsersify) ___npm install browserify --save-dev___
* (Install Watchify) ___npm install watchify --save-dev___

The difference between ___--save___ and ___--save-dev___ is, that development dependencies are installed with ___npm install___ because they are required for the development process of the code but they are not added to the generated Javascript-bundle that are used in the WebApp ClassEditorUML. The ___--save-dev___ commands for ___browserify___ and ___watchify___ will install the two modules with all the the dependencies in ___node_modules___ and add the dev-dependencies to your ___package.json___.
```json
"devDependencies": {
  "browserify": "^14.5.0",
  "watchify": "^3.9.0"
}
```
In the current repository Browserfy and Watchify are expected to be installed globally, because the ___package.json___ does not contain the dev-dependencies mentioned above.

### Start Watching the Files with Watchify
Watchify will trigger the ___npm run build___ process if files were change due to alteration of code. To start watching the files, run the npm-watch script by ___npm run watch___, which is defined in ___package.json___ 

## Main Library for Handling the JSON Database

Main library to handle large arrays is ___docs/js/editor4json.js___
https://github.com/niebert/ClassEditorUML/tree/master/docs

## UML Diagram of Editor4JSON Class

![UML Diagram of JS Class Editor4JSON](https://niebert.github.io/ClassEditorUML/Editor4JSON_UML.png)

## JSON to Schema Generator

Used the following tool that creates a [JSON schema](http://json-schema.org/) for a provided JSON file. Used the given JSON file to create the JSON Schema with [JSON2schema.html](https://niebert.github.io/json-editor/plugins/json2schema.html).

## Acknowledgement
Special thanks to the following individual developers and teams of OpenSource JavaScript projects:
* [HandleBars](http://handlebarsjs.com/) the code generation in Javascript was implemented
* [JSON-Editor](https://github.com/jdorn/json-editor) by Jeremy Dorn. The JSON Editor takes a JSON Schema and uses it to generate an HTML form. The JSON-Editor is partially used to edit JSON file of the Javascript Project in ___JSCC___ . The schemes of the JSON subtree are stored in the folder ___/tpl___ of the JavascriptClassCreator. The full potential of the JSON-Editor was not used in ___JSCC___ . This can be approved in the future.
The JSON-Editor of Jeremy Dorn has full support for JSON Schema version 3 and 4 and can integrate with several popular CSS frameworks (bootstrap, foundation, and jQueryUI). This would lead to major code reduction of ___JSCC___ . Refactoring of ___JSCC___ would make more use of the JSON-Editor features. Check out an interactive demo (demo.html): http://jeremydorn.com/json-editor/
* Developer [Mihai Bazon](http://lisperator.net/) create UglifyJS, a great tool to handle and parse Javascript Code and minify the Javascript code (see [Source Code of UglifyJS](https://github.com/mishoo/UglifyJS2)).
* The wrapper for UglifyJS is written [Dan Wolff](http://danwolff.se/). His UglifyJS-Online example is used to minify/compress the exported Javascript code of generated JS Classes (For Online Example of the [UglifyJS-Wrapper](https://skalman.github.io/UglifyJS-online/) see source code on https://github.com/Skalman/UglifyJS-online for the Online-Version of the Wrapper.
* Developers of ACE Code Editor https://ace.c9.io (Javascript Editing uses the Editor in iFrames)
* [FileSaver.js](https://github.com/eligrey/FileSaver.js) Developer Eli Grey provided the ___FileSaver.js___ that is used to store created ___JSCC___ files to the local filesystem. ___JSCC___ uses the same mechanism of browsers, that allows a ___Save as...___ in the context menu of a web pages or image. So not uncontrolled write access to your file system is implemented, because users have to select the locations in which the user whats to store the file (e.g. JSON, Javascript or HTML).
* [JointJS](https://github.com/clientIO/joint) JointJS is a JavaScript diagramming library. It can be used to create either static diagrams. JointJS is used in this project to create UML-diagrams, that are interactive diagramming in conjunction and application builder in Javascript.
* [Inheritage for JavaScript with protoypes](http://phrogz.net/js/classes/OOPinJS2.html) by Gavin Kistner
* [3 ways to define a JavaScript class](https://www.phpied.com/3-ways-to-define-a-javascript-class/) by Stoyan Stefanov
* [JQuery](https://jqueryui.com) is used for the theme and standard operations in the Document Object Model (DOM) of HTML-pages. The [JQuery-Themeroller](https://jqueryui.com/themeroller/) was used to create a JQuery theme for JSCC.
