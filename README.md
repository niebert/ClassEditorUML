# ClassEditorUML
JSON Editor for UML Class Definition with a Code Editor for the methods - based on the JSON editor of Jeremy Dorn.

* With [HandleBars](http://handlebarsjs.com/) the code generation in Javascript is implemented.


## Online Demo

https://niebert.github.io/ClassEditorUML

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Browserify and Watchify](#browserify-and-watchify)
  - [Global Installation of Browserify, Watchify, UglifyJS and DocToc](#global-installation-of-browserify-watchify-uglifyjs-and-doctoc)
  - [Package Installation of Browserify and Watchify - Alternative](#package-installation-of-browserify-and-watchify---alternative)
  - [Start Watching the Files with Watchify](#start-watching-the-files-with-watchify)
- [Main Library for Handling the JSON Database](#main-library-for-handling-the-json-database)
- [UML Diagram of Editor4JSON Class](#uml-diagram-of-editor4json-class)
- [JSON to Schema Generator](#json-to-schema-generator)
- [Acknowledgement](#acknowledgement)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Quick Start for Developers
* The source library are stored in `/src/libs`
* Build the library with `node build.js` started in directory of the repository.
* The build command  creates the file `docs/js/class_editor_uml.js`, which is imported with a script tag in `docs/index.html`. This is helpful because the `ClassEditorUML` can be accessed directly through the web via the URL https://niebert.github.io/ClassEditorUML
* If you want to use the `ClassEditorUML` for another programming language, checkout


## Files, Folders and Structure of Repository
The following enumeration explains the structure of the repository and folders.
* `dist/` folder contains the used `jsoneditor4menu` and the adaptions of the JSON editor for an UML editor with `class_editor_uml.js`.
* `docs/` folder contains all the web content that you can access via https://niebert.github.io/ClassEditorUML
  * `docs/ace` folder contains files for the editor ACE, that is used in JSON-Editor to edit source code.
  * `docs/db` folder contains JSON database which initializes the JSON-Editor with the default JSON data. If the user saves the file, the current JSON data is stored in the LocalStorage of the browser.
  * `docs/css` folder contains all style sheet for the [ClassEditorUML](https://niebert.github.io/ClassEditorUML)
  * `docs/fonts` folder contains the fonts for the FontAwesome.
  * `docs/jquery` folder contains the JQuery implementation so that a downloade [ClassEditorUML](https://niebert.github.io/ClassEditorUML) runs offline.
  * `docs/js` folder contains all Javascript libraries used for the [ClassEditorUML](https://niebert.github.io/ClassEditorUML)
  * `docs/schema` folder contains JSON schema for the [ClassEditorUML](https://niebert.github.io/ClassEditorUML), defining the input user interface for editing the JSON file
  * `docs/tpl` folder contains the HandleBars template generating the source code from the [UML definition](https://en.wikipedia.org/wiki/Unified_Modeling_Language).
  * `docs/index.html` files starts the JSON-Editor  [ClassEditorUML](https://niebert.github.io/ClassEditorUML) also offline, when the repository was [downloaded](https://github.com/niebert/ClassEditorUML/archive/master.zip) to your device and started locally in your browser.
* `jscc/` folder contains the [JavascriptClassCreator](https://niebert.github.io/JavascriptClassCreator) files that are used to create object-oriented Javascript class files.  
* `src/` folder contains the file `main.js` and other source files in the future, to create a the library in the folder `dist/` with `browsersify` and `watchify`.
* `update_libs.sh` is a shell script that works on Linux and MacOSX to perform some library updates from the web.

## Structure of the UML JSON

Say we want a listing for all attributes for the UML-design of the class in programming language `Javascript`. The JSON file generated by ClassEditorUML has the following structure:
```javascript
var vJSON_UML{
  "data": {},
  "settings":{}
};
```
* `data` contains the UML structure of the class,
* `settings` contains the settings for the editor, e.g. which classes, local classes or remote classes can be selected as attribute types.

```javascript
vJSON_UML.data = {
    "classname": "MyClass",
    "superclass": "",
    "comment": "What does the class do?",
    "attributes": [
        {
            "visibility": "public",
            "name": "name",
            "init": "null",
            "class": "String",
            "comment": "Stores the name of the animal"
        },
        {
            "visibility": "public",
            "name": "age",
            "init": "null",
            "class": "Integer",
            "comment": "stores the age of the animal"
        }
    ],
    "methods": [
        {
            "visibility": "public",
            "name": "getOlder",
            "parameter": [
                {
                    "name": "pYears",
                    "class": "Integer",
                    "comment": "Increases the age with pYears"
                }
            ],
            "return": "",
            "comment": "Increases the age of the modelled animal",
            "jscode": ""
        }
    ],
    "possibleClasses": [
        "",
        "App ",
        "AppAbstract ",
        "Array",
        "Boolean",
        "Document",
        "Float",
        "Function",
        "Hash",
        "Integer",
        "LinkParam ",
        "Object",
        "RegularExp",
        "String"
    ]
}
```
## Update Editor and Watching Class Lists
The list of classes for defining the type of attributes and parameters of methods can be extended by the user-defined activity (see `src/libs/classeditor.js`)

## Template Engine and Code Generation
[HandleBars4Code]() is used as Template Engine for generating the code in `JSONEditor4Code`. The are currently two available templates in `ClassEditorUML`:
* **(Class Javascript)** Code Generation for the programming language in `Javascript` (Template `docs/tpl/javascript_tpl.js`).
* **(Documentation for Class)** `ClassEditorUML` is able to generate a `README.md` in the GitHub markdown language (Template `docs/tpl/docu4github_tpl.js`).

### Storage of Templates
The templates are stored and imported as Javascript libraries in the file `docs/index.html`, which is the file to launch locally in your browser even without internet access.
* The template for code generation is stored in the folder `docs/tpl`.
* In the file `docs/index.html` the template will be accessible via the hash `vDocJSON.tpl`.
* The folder `docs/tpl` contains two Handlebars templates.
* **(Class Source Code)** One for the generation of the Javascript source code of the class `vDataJSON.tpl.["docu4github"]` and
* **(Class Documentation)** the other creates the GitHub markdown as documentation `vDataJSON.tpl.["javascript"]`

## Handlebars4Code
`Handlebars4Code` extends the templates engine of `Handlebars` with additional helper functions tailored for code generation.
The following section explains how to access each item by index in the Handlebars template.

### each Iteration
#### JSON
```javascript
var myclasslist = [
  ["first_var","first_type"],
  ["second_var","seconf_type"],
  ["third_var","third_type"],
];
```
#### Handlebar4Code notation
We will use the dot-bracket notation
```html
<ul>
{{#each myclasslist as |item|}}
  <li>
    Variable <tt>{{item.[0]}}</tt> has the type <tt>{{item.[1]}}</tt>
  </li>
{{/each}}
</ul>
```
#### Output
Which will output in a code e.g. documentation file in HTML:

```html
<ul>
  <li>
    Variable <tt>first_var</tt> has the <tt>first_type</tt>
  </li>
  <li>
    Variable <tt>second_var</tt> has the <tt>second_type</tt>
  </li>
  <li>
    Variable <tt>third_var</tt> has the <tt>third_type</tt>
  </li>
</ul>
```
When the array items are objects, we can drop the brackets and simply write:
```html
<ul>
{{#each myclasslist as |item|}}
  <li>
    {{item.0.text}}: {{item.1.text}}
  </li>
{{/each}}
</ul>
```
If we need to know the index of the current iteration (e.g. for the enumeration of )

To get the index within an #each helper loop, we use:
```html
{{#each myclasslist as |item index|}}
  Index is: {{index}}
{{/each}}
```

## Browserify and Watchify
Browserify and Watchify are used in this repository to control the WebApp-javascript development with the required Javascript libraries installed with [NPM Node.js](https://docs.npmjs.com/getting-started/installing-node) and similar framework world that greatly improve your javascript workflow: Using them, you no longer need to micro-manage your script tags but instead you just declare the libraries each of your client-side modules is using - or you can even create your own reusable modules! Also, installing (or updating) javascript libraries is as easy as running a single command!
* [Additional Information about Browserify and Watchify on GitHub](https://spapas.github.io/2015/05/27/using-browserify-watchify/)
* [Youtube Video about Browserify and Watchify by Kyle Robinson Young 2015/04/16](https://www.youtube.com/watch?v=CTAa8IcQh1U)
In this repository Browserify and Watchify are used for javascript code development with [NPM Node.js](https://docs.npmjs.com/getting-started/installing-node).

### Global Installation of Browserify, Watchify, UglifyJS and DocToc
Requirement: [NPM](https://docs.npmjs.com/getting-started/installing-node) is intalled. Now call for global installation of Browserfy, Watchify, UglifyJS and DocToc by:

`npm install -g browserify watchify uglify-js doctoc`

This is recommended because your will not install Browserfy, Watchify and UglifyJS for all your repositories separately.
* ***Browserfy*** converts `node_modules` in a single library, that can be imported in WebApp. Browserify resolves dependencies and included the required libraries into the bundled javascript code.
* ***Watchify*** watches changes in the source code and runs the build process whenever it detects changes in the your source code.
* ***UglifyJS*** compresses the source code of `dist/class_editor_uml.js` into ```class_editor_uml.min.js``` to reduce download time and WebApp performance during load.
* ***DocToc*** is used to create a helpful table of contents in the README (see [DocToc-Installation]https://github.com/thlorenz/doctoc#installation) for further details on [NPM DocToc](https://www.npmjs.com/package/doctoc) ). Run `doctoc README.md` for updating the table of contents.
* ***jsLint*** is used to check the Javascript code, quality of code can be improved by application of jsLint

### Package Installation of Browserify and Watchify - Alternative
If your prefer that  browserify and watchify is installed with your `npm install` command, save these to modules to your dev-dependecies in your `package.json` by calling

* (Install Browsersify) `npm install browserify --save-dev`
* (Install Watchify) `npm install watchify --save-dev`
* (Install UglifyJS) `npm install uglify-js --save-dev`
* (Install DocToc) `npm install doctoc -g`
* (Install jshint) `npm install jslint -g`

The difference between `--save` and `--save-dev` is, that development dependencies are installed with `npm install` because they are required for the development process of the code but they are not added to the generated Javascript-bundle that are used in the WebApp ClassEditorUML. The `--save-dev` commands for `browserify` and `watchify` will install the two modules with all the the dependencies in `node_modules` and add the dev-dependencies to your `package.json`.
```json
"devDependencies": {
  "browserify": "^14.5.0",
  "watchify": "^3.9.0",
  "uglify-js": "^2.6.2",
  "doctoc":"^1.3.0",
  "lint": "^1.1.2"  
}
```
In the current repository `Browserfy` and `Watchify` are expected to be installed globally, because the `package.json` does not contain the dev-dependencies mentioned above.

### Start Watching the Files with Watchify
Watchify will trigger the `npm run build` process if files were change due to alteration of code. To start watching the files, run the npm-watch script by `npm run watch`, which is defined in `package.json`

## Source JS file and development bundle output
The main JS source file for the build process is `src/main.js`. The ouput library (resp. output file of build process) is stored in distrubtion library for browser based web-development in `dist/bundle.js`. Compressed code is generated with `UglifyJS`. It takes the `dist/bundle.js` as input file and creates the compressed file `dist/bundle.min.js`.
The compression of `dist/bundle.js` into `dist/bundle.min.js` can be started by

  `npm run compress`


## Main Library for Handling the JSON Database

Main library to handle large arrays is `docs/js/editor4json.js`
https://github.com/niebert/ClassEditorUML/tree/master/docs

## UML Diagram of Editor4JSON Class

![UML Diagram of JS Class Editor4JSON](https://niebert.github.io/ClassEditorUML/Editor4JSON_UML.png)

## JSON to Schema Generator

Used the following tool that creates a [JSON schema](http://json-schema.org/) for a provided JSON file. Used the given JSON file to create the JSON Schema with [JSON2Schema](https://niebert.github.io/JSON2Schema).

## Additional Modules created/used for this Repository
Some code may be useful for other developers and so the following packages are create on GitHub and as NPM module:
* [LinkParam](https://www.github.com/niebert/LinkParam) [NPM-Module](https://www.npmjs.com/package/linkparam)
* [LoadSaverLS](https://www.github.com/niebert/LoadSaverLS) [NPM-Module](https://www.npmjs.com/package/loadsaverls) (ToDO)
* [Handlebars4Code](https://www.github.com/niebert/Handlebars4Code) [NPM-Module](https://www.npmjs.com/package/handlebars4code)
* [Javascript2UML](https://www.github.com/niebert/Javascript2UML) [NPM-Module](https://www.npmjs.com/package/javascript2uml)
* [JSON2SChema](https://www.github.com/niebert/JSON2Schema) [Demo Link](https://niebert.github.io/JSON2Schema)

## Acknowledgement
Special thanks to the following individual developers and teams of OpenSource JavaScript projects:
* [HandleBars](http://handlebarsjs.com/) the code generation in Javascript was developed by Yehuda Katz.
* [JSON-Editor](https://github.com/jdorn/json-editor) by Jeremy Dorn. The JSON Editor takes a JSON Schema and uses it to generate an HTML form. The JSON-Editor is partially used to edit JSON file of the [JavascriptClassCreator Project](https://niebert.github.io/JavascriptClassCreator) `JSCC`.
The JSON-Editor of Jeremy Dorn has full support for JSON Schema version 3 and 4 and can integrate with several popular CSS frameworks (bootstrap, foundation, and jQueryUI). This would lead to major code reduction of `JSCC` . Refactoring of `JSCC` would make more use of the JSON-Editor features. Check out an interactive demo (demo.html): http://jeremydorn.com/json-editor/
* [Font Awesome Icons - 4.7.0](https://fontawesome.com/v4.7.0/icons/) thanks to [fontawesome.com](https://fontawesome.com) for providing the [free 4.7.0 version](https://fontawesome.com/v4.7.0/icons/) for local application for this WebApp. The [fonts in version 4.7.0](https://fontawesome.com/v4.7.0/icons/) are created by ***[Font Awesome](https://fontawesome.com)*** and
licensed under [SIL OFL 1.1](http://scripts.sil.org/OFL). The javascript-code for injecting the icon into the DOM licensed under [MIT License](http://opensource.org/licenses/mit-license.html). The
[Documentation](https://fontawesome.com/v4.7.0/examples/) for [Font Awesome - 4.7.0](https://fontawesome.com/v4.7.0/icons/) licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/). The [Font-Awesome GitHub-repository](https://github.com/FortAwesome/Font-Awesome) can be used for forking and adapting the javascript code to individual requirements and constraints.
* Developer [Mihai Bazon](http://lisperator.net/) create UglifyJS, a great tool to handle and parse Javascript Code and minify the Javascript code (see [Source Code of UglifyJS](https://github.com/mishoo/UglifyJS2)).
* The wrapper for UglifyJS is written [Dan Wolff](http://danwolff.se/). His UglifyJS-Online example is used to minify/compress the exported Javascript code of generated JS Classes (For Online Example of the [UglifyJS-Wrapper](https://skalman.github.io/UglifyJS-online/) see source code on https://github.com/Skalman/UglifyJS-online for the Online-Version of the Wrapper.
* Developers of ACE Code Editor https://ace.c9.io (Javascript Editing uses the Editor in iFrames)
* `[LoadFile4DOM](https://www.gitlab.com/niehausbert/loadfile4dom)` is a library that allows to load files into an application that run completely in a browser without the need to submit data to a server for processing. With this library the users are able load files into your browser application and process the data in the browser and provide the output to the user, without submitting any data to a server. **[Demo LoadFile4DOM](https://niehausbert.gitlab.io/loadfile4dom)**
* [FileSaver.js](https://github.com/eligrey/FileSaver.js) Developer Eli Grey provided the `FileSaver.js` that is used to store created `JSCC` files to the local filesystem. `JSCC` uses the same mechanism of browsers, that allows a `Save as...` in the context menu of a web pages or image. So not uncontrolled write access to your file system is implemented, because users have to select the locations in which the user whats to store the file (e.g. JSON, Javascript or HTML).
* [JointJS](https://github.com/clientIO/joint) JointJS is a JavaScript diagramming library. It can be used to create either static diagrams. JointJS is used in this project to create UML-diagrams, that are interactive diagramming in conjunction and application builder in Javascript.
* [Inheritage for JavaScript with protoypes](http://phrogz.net/js/classes/OOPinJS2.html) by Gavin Kistner
* [3 ways to define a JavaScript class](https://www.phpied.com/3-ways-to-define-a-javascript-class/) by Stoyan Stefanov
* [JQuery](https://jqueryui.com) is used for the theme and standard operations in the Document Object Model (DOM) of HTML-pages. The [JQuery-Themeroller](https://jqueryui.com/themeroller/) was used to create a JQuery theme for JSCC.
* [JSZip](http://stuartk.com/jszip) - LibreOffice files, Geogebra files (Open Source applications) have file extensions that are actually ZIP files. To handle, change and generate those documents in a browser is possible the library JSZIP. Even a small file system for WebApps that can be stored with a folder structure in a ZIP file can be generated in a browser. So [JSZip](http://stuartk.com/jszip) is a multi-functional JavaScript class for generating and reading ZIP files. Thank you for sharing this great library with the Open Source community.
