vDataJSON["tpl"]["javascript"] = `
//#################################################################
//# Javascript Class: {{classname}}()
//#       SuperClass: {{superclassname}}
//#   Class Filename: {{filename classname}}.js
//#
//# Author of Class:      {{reposinfo.author}}
//# email:                {{reposinfo.email}}
//# Created:              {{reposinfo.created}}
//# Modified              {{reposinfo.modified}}
//# GNU Public License V3 - OpenSource
//#
//# created with JavaScript Class Creator JSCC
//#     https://niebert.github.io/JavascriptClassGenerator
//#################################################################

{{#ifcond reposinfo.require_classes "==" "no"}}
//---------------------------------------------------------------------
//---Store File in Subdirectory /js and import this Class in HTML-File with
// SCRIPT-Tag:  LANGUAGE="JavaScript" SRC="js/{{filename classname}}.js"
{{/ifcond}}
{{#ifcond reposinfo.require_classes "==" "yes"}}
{{#ifcond superclassname "!=" ""}}
//---------------------------------------------------------------------
// NodeJS: require the super class
const {{superclassname}} = require('{{filename superclassname}}');
{{/ifcond}}
{{{require_class_list attributes methods baseclasslist extendedclasslist reposinfo.require_path}}}
{{/ifcond}}
//---------------------------------------------------------------------
//---Constructor of Class {{classname}}()
// Call the constructor for creating an instance of class {{classname}}
// by the following command in HTML-file that imports this class
// var v{{classname}} = new {{classname}}();
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
//---------------------------------------------------------------------
// If you want to access the attributes of {{classname}} in the code for methods, use
// the attribute name with a leading "this." in the definition of method of {{classname}}, e.g.
// this.aName = "Hello World";
//---------------------------------------------------------------------
//----Methods----------------------------------------------------------
//---------------------------------------------------------------------
// (1) If you want to assign definitions of methods for single instance of the class '{{classname}}'
// they are defined with
//    this.my_method = function (pPar1,pPar2)
// this approach allows to overwrite the method definition of single instances dynamically.
//---------------------------------------------------------------------
// (2) A prototype definition of methods for '{{classname}}' will be set by
// use the method's name and extend it with '{{classname}}'.
//    {{classname}}.prototype.my_method = function (pPar1,pPar2)
// This approach consumes less memory for instances.
//---------------------------------------------------------------------

{{#ifcond superclassname "==" ""}}
    // superclass undefined
{{/ifcond}}
{{#ifcond superclassname "!=" ""}}
//--------------------------------------
//---Super Class------------------------
// Inheritance: '{{classname}}' inherits from '{{superclassname}}'
{{classname}}.prototype = new {{superclassname}}();
// Constructor for instances of {{classname}} has to updated.
// Otherwise constructor of '{{superclassname}}' is called
{{classname}}.prototype.constructor={{classname}};
// see http://phrogz.net/js/classes/OOPinJS2.html for explanation
//--------------------------------------
{{/ifcond}}


function {{classname}} () {
    //---------------------------------------------------------------------
    //---Attributes of Class "{{classname}}()"
    //---------------------------------------------------------------------
{{#each attributes}}
    // ------------------------------------------
    // {{visibility}}: {{name}} ({{class}})
    {{#codeindent comment indent="    // "}}
    {{/codeindent}}
    this.{{name}} = {{init}}; // Class: {{class}}
{{/each}}
    //---------------------------------------------------------------------
    //---Methods of Class "{{classname}}()"
    //---------------------------------------------------------------------

{{#each methods}}

    //#################################################################
    //# {{visibility}} Method: {{name}}()
    //#    used in Class: {{../classname}}
    //# Parameter:
    //#    {{parameterlist parameter "    //#    "}}
    //# Comment:
    //#    {{{comment}}}
    //# {{{returncomment}}}
    //# created with ClassEditorUML {{../reposinfo.created}}
    //# last modifications          {{../reposinfo.modified}}
    //#################################################################

    {{../classname}}.prototype.{{name}} = function ({{#paramcall parameter}}{{/paramcall}}) {
      //----Debugging------------------------------------------
      // console.log("{{filename ../classname}}.js - Call: {{name}}({{#paramcall parameter}}{{/paramcall}})");
      // alert("{{filename ../classname}}.js - Call: {{name}}({{#paramcall parameter}}{{/paramcall}})");
      //----Create Object/Instance of {{name}}----
      //    var v{{../classname}} = new {{../classname}}();
      //    v{{../classname}}.{{name}}({{#paramcall parameter}}{{/paramcall}});
      //-------------------------------------------------------
      {{#codeindent code indent="      "}}
      {{/codeindent}}
{{/each}}
}
//-------------------------------------------------------------------------
//---END Constructor of Class "{{classname}}()"
//-------------------------------------------------------------------------

{{#ifcond reposinfo.require_classes "==" "yes"}}

// NodeJS: export class constructor '{{classname}}' for module {{filename classname}}.js
// -------
module.exports = {{classname}};
{{/ifcond}}
`;

// NodeJS: uncomment modules.export in last line
// module.export = {{classname}};
