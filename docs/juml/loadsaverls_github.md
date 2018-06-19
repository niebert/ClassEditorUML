
## Javascript Class: `LoadSaverLS`

The class provides an constructor for a JSON Editor for Code Generation. The work is based on Jeremy Dorns great JSON editor. This class adds the HandleBars template engine for generation of source based on a UML class definition. 
* created with [ClassEditorUML](https://niebert.github.io/ClassEditorUML) - Date: 23.04.2018
* last modifications at 01.05.2018
* URL Class Editor for UML: https://niebert.github.io/ClassEditorUML
* File: `js/loadsaverls.js`
* Superclass: `Hash` - code generation in `ClassEditorUML` can insert the require-commands automatically. For the settings expand the `Repository Info` in ClassEditorUML. You can set `Require Classes NPM:` to `Yes` and `ClassEditorUML` will include require command for super class. ClassEditorUML assumes, that the super class is a locally available.
```javascript
const Hash = require('./hash');
```
The require command assumes the file `loadsaverls.js` in the same directory as `hash.js`.

### Diagram
The class  `LoadSaverLS` inherits all attributes and methods from superclass: `Hash` please require NPM module for super class if it is not available locally by:
```javascript
const Hash = require('hash');
```

|  LoadSaverLS               |
| ---------------------------- |
|  + aEditor:<br> + aJSON:Hash<br> + aSchema:Hash<br> + aOptions:Hash |
|  + init(pJSON:Hash,pOptions:Hash,pSchema:Hash,pEditorID:String,pFilenameID:String)<br> + update_schema():Boolean<br> + create_editor()<br> + set_event_handler()    |

### Create Instance of Class
Instances of the class `LoadSaverLS` can be generated with:
```javascript
    var vLoadSaverLS = new LoadSaverLS();
```

### Definition Methods - 2 Approaches
* If you want to assign definitions of methods for single instances individually, defined the method the following way. This approach allows to overwrite the method definition of single instances dynamically.
```javascript
    this.my_method = function (pPar1,pPar2)
```
* A prototype definition of methods for `LoadSaverLS` will be set the definition as prototye for all instances of the class. Alteration of the prototye definition with change the method definition of all instances of  `LoadSaverLS`. Use the following prototype definition for methods name for 'LoadSaverLS'.
```javascript
    LoadSaverLS.prototype.my_method = function (pPar1,pPar2)
```
The prototype definition for methods consumes less memory for instances.

### Attributes: `LoadSaverLS`
For class `LoadSaverLS` the following attributes are defined:

#### Attribute `aEditor : `
Contains the JSON Editor for handling the UML model for the class
* Visibility: `public`
* Class: ``
* Default Init: `new JSONEditor()` set by `my_instance.aEditor = new JSONEditor();`
* Access of attribute in the code of methods by `this.aEditor = new JSONEditor();`

#### Attribute `aJSON : Hash`
contains the data submitted to the JSON Editor (via URL parameter/query string  which includes the list of classes that can be used in this class definition
* Visibility: `public`
* Class: `Hash`
* Default Init: `null` set by `my_instance.aJSON = null;`
* Access of attribute in the code of methods by `this.aJSON = null;`

#### Attribute `aSchema : Hash`
This attribute contains the JSON Schema for the JSON Editor
* Visibility: `public`
* Class: `Hash`
* Default Init: `null` set by `my_instance.aSchema = null;`
* Access of attribute in the code of methods by `this.aSchema = null;`

#### Attribute `aOptions : Hash`
This attribute stores the options of the editor, e.g. the DOM id in which ethe editor will be injected in the DOM, the filename id, validator result, ....
* Visibility: `public`
* Class: `Hash`
* Default Init: `{}` set by `my_instance.aOptions = {};`
* Access of attribute in the code of methods by `this.aOptions = {};`

### Methods: `LoadSaverLS`
For class `LoadSaverLS` the following methods are defined:

#### Method `init(pJSON,pOptions,pSchema,pEditorID,pFilenameID)`
the method initializes the JSON editor with the defined schema, updates the class selector in the schema with the classlist in JSON data. 
* Visibility: `public`
* Call: `vLoadSaverLS.init(pJSON,pOptions,pSchema,pEditorID,pFilenameID);` where `vLoadSaverLS = new LoadSaverLS()` is an instance of the class `LoadSaverLS`.
* Parameter List:
   * `pJSON:Hash` the parameter stores JSON definition for the class
   * `pOptions:Hash` the parameter stores the options for the JSON editor (developed by Jeremy Dorn)
   * `pSchema:Hash` the parameter contains the JSON Schema for JSON Editor
   * `pEditorID:String` the parameter provide DOM ID in which the JSON editor will be injected.
   * `pFilenameID:String` the parameter provide the ID of a DOM element in which the JSON Editor will write the file name of the loaded UML Class. 

#### Method `update_schema()`
User has update the list of classes and then the selector for classes in the editor must be updated. 
This requires an update of the JSON editor and therefore a restart of the editor.
* Visibility: `public`
* Returns: `Boolean`
* Call: `var vBooleanRet = vLoadSaverLS.update_schema();` where `vLoadSaverLS = new LoadSaverLS()` is an instance of the class `= LoadSaverLS`.
* Parameter List:

#### Method `create_editor()`
the method performs ...
* Visibility: `public`
* Call: `vLoadSaverLS.create_editor();` where `vLoadSaverLS = new LoadSaverLS()` is an instance of the class `LoadSaverLS`.
* Parameter List:

#### Method `set_event_handler()`
the method sets the event handler for the onchange events and watch certain activities in the editor
* Visibility: `public`
* Call: `vLoadSaverLS.set_event_handler();` where `vLoadSaverLS = new LoadSaverLS()` is an instance of the class `LoadSaverLS`.
* Parameter List:
