vDataJSON.tpl.javascript1docu = `
//#################################################################
{{#ifcond data.reposinfo.static "!=" "yes"}}
//# Javascript Class: {{data.classname}}()
{{#ifcond data.superclassname "!=" " "}}
{{#ifcond data.superclassname "!=" ""}}
//#       SuperClass: {{data.superclassname}}
{{/ifcond}}
{{/ifcond}}
//#   Class Filename: {{filename data.classname}}.js
{{/ifcond}}
{{#ifcond data.reposinfo.static "==" "yes"}}
//# Javascript Module: {{data.classname}}
{{#ifcond data.superclassname "!=" " "}}
{{#ifcond data.superclassname "!=" ""}}
//#           Extends: {{data.superclassname}}
{{/ifcond}}
{{/ifcond}}
//#       Filename: {{filename data.classname}}.js
{{/ifcond}}
//#
//# Author of Class:      {{data.reposinfo.author}}
//# email:                {{data.reposinfo.email}}
//# Created:              {{data.reposinfo.created}}
//# Modified              {{data.reposinfo.modified}}
//# GNU Public License V3 - OpenSource
//#
//# created with JavaScript ClassEditorUML
//#     https://niebert.github.io/ClassEditorUML
//#################################################################

{{#ifcond data.reposinfo.require_classes "!=" "yes"}}
//---------------------------------------------------------------------
//---Store File in Subdirectory /js and import this Class in HTML-File with
// SCRIPT-Tag:  LANGUAGE="JavaScript" SRC="js/{{filename classname}}.js"
{{/ifcond}}
{{#ifcond data.reposinfo.require_classes "==" "yes"}}
//---------------------------------------------------------------------
{{#ifcond data.superclassname "!=" ""}}
{{#ifcond data.superclassname "!=" " "}}
//---------------------------------------------------------------------
// NodeJS: require the super class
const {{data.superclassname}} = require('{{filename data.superclassname}}');
{{/ifcond}}
{{/ifcond}}
//---- USED CLASSES: ----
// Used classes in parameters of methods, return values of methods and attributes
{{#requireclass data settings}}
// - {{variable}}
{{/requireclass}}

// NodeJS: Require additional Modules
{{#requirelibs data.reposinfo.requirelist}}
const {{variable}} = require('{{module}}'); // Module: {{module}}
{{/requirelibs}}

{{/ifcond}}
//---------------------------------------------------------------------
// Configuration Code:
{{{data.reposinfo.configcode}}}
{{#ifcond data.reposinfo.static "==" "yes"}}
//---------------------------------------------------------------------
//---Object: {{data.classname}}
// The static object {{data.classname}} has attributes and functions.
//--- Attributes: -------------------------------
{{#foreach data.attributes data}}
    // ------------------------------------------
    // {{visibility}}: {{name}}   Type: {{class}}
    // {{data.classname}}.{{name}} = {{{init}}};   // Class: {{class}}
{{/foreach}}
//--- Functions: -------------------------------
{{#foreach data.methods data}}
    // -----------------------------------------
    // {{visibility}}: {{name}}
    // {{data.classname}}.{{name}}({{#paramcall parameter}}{{/paramcall}});
{{/foreach}}
//----------------------------------------------
{{/ifcond}}
{{#ifcond data.reposinfo.static "!=" "yes"}}
//---------------------------------------------------------------------
//---Constructor of Class {{data.classname}}()
// Call of the Constructor of Class {{data.classname}}()
// var v{{data.classname}} = new {{data.classname}}();
//----Attributes-------------------------------------------------------
// this.aName = "Hello World";
//----Methods----------------------------------------------------------
// Methods are defined outside the constructor after Constructor call
//    {{data.classname}}.prototype.my_method = function (pPar1,pPar2)
//----Overwrite Methods in Object--------------------------------------
//    this.my_method = function (pPar1,pPar2)
// this approach allows to overwrite the method definition of single
// instances dynamically (if needed in specific cases).
//---------------------------------------------------------------------

{{#ifcond data.superclassname "!=" " "}}
{{#ifcond data.superclassname "!=" ""}}

//---Super Class---see http://phrogz.net/js/classes/OOPinJS2.html for explanation
{{data.classname}}.prototype = new {{data.superclassname}}();
{{data.classname}}.prototype.constructor={{data.classname}};
{{/ifcond}}
{{/ifcond}}


function {{data.classname}} () {
    //---------------------------------------------------------------------
    //---Attributes of Class "{{data.classname}}()"
    //---------------------------------------------------------------------

{{#foreach data.attributes data}}
    // ------------------------------------------
    // {{visibility}}: {{name}}   Class: {{class}}
{{#ifcond comment "!=" ""}}
{{indent comment "    // "}}
{{/ifcond}}
{{#ifcond visibility "==" "public"}}
    this.{{name}} = {{{init}}};   // Class: {{class}}
{{/ifcond}}
{{#ifcond visibility "==" "private"}}
    var {{name}} = {{{init}}};   // Class: {{class}}
{{/ifcond}}
{{/foreach}}
    //---------------------------------------------------------------------
    //---Methods of Class "{{data.classname}}()"
    //---------------------------------------------------------------------
{{#foreach data.methods data}}

    // #################################################################
    // # {{visibility}} Method: {{name}}()  Class: {{data.classname}}
    // # Parameter:
    // #    {{parameterlist parameter "    // #    "}}
    // # Comment:
{{indent comment "    // #    "}}
    // # {{{returncomment}}}
    // #################################################################
{{/foreach}}

}
//---------------------------------------------------------------------
//---END Constructor for Call  "new {{data.classname}}()"
//---------------------------------------------------------------------
{{#foreach data.methods data}}

    //#################################################################
    //# {{visibility}} Method: {{name}}()  Class: {{data.classname}}
    //# Parameter:
    //#    {{parameterlist parameter "    //#    "}}
    //# Comment:
{{indent comment "    //#    "}}
    //# {{{returncomment}}}
    //#################################################################

{{#ifcond visibility "==" "public"}}
    {{data.classname}}.prototype.{{name}} = function ({{#paramcall parameter}}{{/paramcall}}) {
{{#ifcond data.reposinfo.debugheader "==" "yes"}}
            // console.log("{{filename data.classname}}.js - Call: {{name}}({{#paramcall parameter}}{{/paramcall}})");
            // alert("{{filename data.classname}}.js - Call: {{name}}({{#paramcall parameter}}{{/paramcall}})");
{{/ifcond}}


{{/ifcond}}
{{#ifcond visibility "==" "private"}}
    function {{name}}({{#paramcall parameter}}{{/paramcall}}) {
{{#ifcond data.reposinfo.debugheader "==" "yes"}}
            // console.log("{{filename data.classname}}.js - Call: {{name}}({{#paramcall parameter}}{{/paramcall}})");
            // alert("{{filename data.classname}}.js - Call: {{name}}({{#paramcall parameter}}{{/paramcall}})");
{{/ifcond}}
{{/ifcond}}
{{indent code "      "}}
    }

{{/foreach}}
{{/ifcond}}
{{#ifcond data.reposinfo.static "==" "yes"}}
{{#ifcond data.superclassname "==" " "}}
//---Define Static Class - Export Variable ---
// A static class '{{data.classname}}' does not need a constructor 'new {{data.classname}}()'
var {{data.classname}} = {};
{{/ifcond}}
{{#ifcond data.superclassname "!=" " "}}
//---Extend Static Class---------------------
// Extend static class: '{{data.classname}}' inherits from static object '{{data.superclassname}}' by:
var {{data.classname}} = {{data.superclassname}};
// The following definitions extend/overwrite the existing attributes and methods of '{{data.superclassname}}'

{{/ifcond}}
//---Attributes: "{{data.classname}}"

{{#foreach data.attributes data}}
    // {{visibility}}: {{name}}   Class: {{class}}
{{#ifcond comment "!=" ""}}
{{indent comment "    // "}}
{{/ifcond}}
{{#ifcond visibility "==" "public"}}
    {{data.classname}}.{{name}} = {{{init}}};
{{/ifcond}}
{{#ifcond visibility "==" "private"}}
    var {{name}} = {{{init}}};
{{/ifcond}}
{{/foreach}}

//---Methods of Class "{{data.classname}}()"

{{#foreach data.methods data}}

    //#################################################################
    //# {{visibility}} Method: {{name}}()  Class: {{data.classname}}
    //# Parameter:
    //#    {{parameterlist parameter "    //#    "}}
    //# Comment:
{{indent comment "    //#    "}}
    //# {{{returncomment}}}
    //#################################################################

{{#ifcond visibility "==" "public"}}
    {{data.classname}}.{{name}} = function ({{#paramcall parameter}}{{/paramcall}}) {
{{#ifcond data.reposinfo.debugheader "==" "yes"}}
          // console.log("{{filename data.classname}}.js - Call: {{data.classname}}.{{name}}({{#paramcall parameter}}{{/paramcall}})");
{{/ifcond}}
{{/ifcond}}
{{#ifcond visibility "==" "private"}}
    function {{name}}({{#paramcall parameter}}{{/paramcall}}) {
{{#ifcond data.reposinfo.debugheader "==" "yes"}}
          // console.log("{{filename data.classname}}.js - Call: {{name}}({{#paramcall parameter}}{{/paramcall}})");
{{/ifcond}}
{{/ifcond}}

{{indent code indent="      "}}
    }
    // ---- Method: {{name}}() Class: {{data.classname}} ------
{{/foreach}}


{{/ifcond}}
{{#ifcond data.reposinfo.require_classes "==" "yes"}}

// NodeJS: export class constructor '{{data.classname}}' for module {{filename data.classname}}.js
// -------
module.exports = {{data.classname}};
{{/ifcond}}
`;

// NodeJS: uncomment modules.export in last line
// module.export = {{classname}};
