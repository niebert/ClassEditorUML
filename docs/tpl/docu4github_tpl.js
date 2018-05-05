vDataJSON["tpl"]["docugithub"] = `
## Javascript Class: \`{{classname}}\`

{{comment}}
* created with [ClassEditorUML](https://niebert.github.io/ClassEditorUML) - Date: {{reposinfo.created}}
* last modifications at {{reposinfo.modified}}
* URL Class Editor for UML: https://niebert.github.io/ClassEditorUML
* File: \`js/{{filename classname}}.js\`
{{#ifcond superclassname "!=" ""}}
* Superclass: \`{{superclassname}}\` - code generation in \`ClassEditorUML\` can insert the require-commands automatically. For the settings expand the \`Repository Info\` in ClassEditorUML. You can set \`Require Classes NPM:\` to \`Yes\` and \`ClassEditorUML\` will include require command for super class. ClassEditorUML assumes, that the super class is a locally available.
\`\`\`javascript
const {{superclassname}} = require('./{{filename superclassname}}');
\`\`\`
The require command assumes the file \`{{filename classname}}.js\` in the same directory as \`{{filename superclassname}}.js\`.
{{/ifcond}}

### Diagram
{{#ifcond superclassname "!=" ""}}
The class  \`{{classname}}\` inherits all attributes and methods from superclass: \`{{superclassname}}\` please require NPM module for super class if it is not available locally by:
\`\`\`javascript
const {{superclassname}} = require('{{filename superclassname}}');
\`\`\`
{{/ifcond}}

|  {{classname}}               |
| ---------------------------- |
| {{{attribs_uml attributes}}} |
| {{{methods_uml methods}}}    |

### Create Instance of Class
Instances of the class \`{{classname}}\` can be generated with:
\`\`\`javascript
    var v{{classname}} = new {{classname}}();
\`\`\`

### Definition Methods - 2 Approaches
* If you want to assign definitions of methods for single instances individually, defined the method the following way. This approach allows to overwrite the method definition of single instances dynamically.
\`\`\`javascript
    this.my_method = function (pPar1,pPar2)
\`\`\`
* A prototype definition of methods for \`{{classname}}\` will be set the definition as prototye for all instances of the class. Alteration of the prototye definition with change the method definition of all instances of  \`{{classname}}\`. Use the following prototype definition for methods name for '{{classname}}'.
\`\`\`javascript
    {{classname}}.prototype.my_method = function (pPar1,pPar2)
\`\`\`
The prototype definition for methods consumes less memory for instances.

### Attributes: \`{{classname}}\`
For class \`{{classname}}\` the following attributes are defined:
{{#each attributes}}

#### Attribute \`{{name}} : {{class}}\`
{{comment}}
* Visibility: \`{{visibility}}\`
* Class: \`{{class}}\`
* Default Init: \`{{init}}\` set by \`v{{classname}}.{{name}} = {{init}};\`
* Access of attribute in the code of methods by \`this.{{name}} = {{init}};\`
{{/each}}

### Methods: \`{{classname}}\`
For class \`{{classname}}\` the following methods are defined:
{{#each methods}}

#### Method \`{{name}}({{#paramcall parameter}}{{/paramcall}})\`
{{comment}}
* Visibility: \`{{visibility}}\`
{{#ifcond return "!=" ""}}
* Returns: \`{{return}}\`
* Call: \`var v{{return}}Ret = {{name}}({{#paramcall parameter}}{{/paramcall}});\`
{{/ifcond}}
{{#ifcond return "==" ""}}
* Call: \`v{{../classname}}.{{name}}({{#paramcall parameter}}{{/paramcall}});\` where \`v{{../classname}}\` is an instance of the class \`{{../classname}}\`;
{{/ifcond}}
* Parameter List:
{{#each parameter}}
   * \`{{name}}:{{class}}\` {{removereturn comment}}
{{/each}}
{{/each}}
`;

// NodeJS: uncomment modules.export in last line
// module.export = {{classname}};
