vDataJSON["tpl"]["javascript"] = `
//#################################################################
//# Javascript Class: {{classame}}()
//#       SuperClass: ___SUPERCLASSNAME___
//#   Class Filename: ___CLASSFILENAME___
//#
//# Author of Class:      ___AUTHOR___
//# email:                ___EMAIL___
//# Date:                 ___MODDATE___
//# GNU Public License V3 - OpenSource
//#
//# created with JavaScript Class Creator JSCC
//#     https://niebert.github.io/JavascriptClassGenerator
//#################################################################

//---------------------------------------------------------------------
//---Store File in Subdirectory /js and import this Class in HTML-File with
// SCRIPT-Tag:  LANGUAGE="JavaScript" SRC="js/___CLASSFILENAME___"
//---------------------------------------------------------------------
//---Constructor of Class {{classame}}()
// Call the constructor for creating an instance of class {{classame}}
// by the following command in HTML-file that imports this class
// var vMyInstance = new {{classame}}();
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
//---------------------------------------------------------------------
// If you want to access the attributes of {{classame}}, use
// the attribute name with a leading "this." in the definition of method of {{classame}}, e.g.
// this.aName = "Hello World";
//---------------------------------------------------------------------
//----Methods----------------------------------------------------------
//---------------------------------------------------------------------
// (1) If you want to assign definitions of methods for single instance of the class '{{classame}}'
// they are defined with
//    this.my_method = function (pPar1,pPar2)
// this approach allows to overwrite the method definition of single instances dynamically.
//---------------------------------------------------------------------
// (2) A prototype definition of methods for '{{classame}}' will be set by
// use the method's name and extend it with '{{classame}}'.
//    {{classame}}.prototype.my_method = function (pPar1,pPar2)
// This approach consumes less memory for instances.
//---------------------------------------------------------------------

// NodeJS: require the super class by removing '//' before 'const'
// -------
//const {{superclass}} = require('{{filename superclass}}');

{{#if superclass}}
    // superclass undefined
{{else}}
//--------------------------------------
//---Super Class------------------------
// Inheritance: '{{classame}}' inherits from '{{superclass}}'
{{classame}}.prototype = new {{superclass}}();
// Constructor for instances of {{classame}} has to updated.
// Otherwise constructor of {{superclass}} is called
{{classame}}.prototype.constructor={{classame}};
// see http://phrogz.net/js/classes/OOPinJS2.html for explanation
//--------------------------------------
{{/if}}


function {{classame}} () {
    //---------------------------------------------------------------------
    //---Attributes of Class "{{classame}}()"
    //---------------------------------------------------------------------
{{each attributes}}
    /* {{visibility}}: {{name}} ({{class}}): {{comment}} */
    this.{{name}} = {{init}}; // Class: {{class}}
{{/each}}
    //---------------------------------------------------------------------
    //---Methods of Class "{{classame}}()"
    //---------------------------------------------------------------------
{{each methods}}
    /* {{visibility}} Method: {{classname}}.{{name}}-----
    Call: {{name}}({{#each parameter}}
    {{#if @index}},{{/if}}{{name}}
    {{/each}})
    {{#if return}} {{{else}} : {{return}} {{/if}}
    Comment: {{comment}} */
{{/each}}
___METHODSPRIVATE___
___METHODSPUBLIC___
}
//-------------------------------------------------------------------------
//---END Constructor of Class "{{classame}}()"
//-------------------------------------------------------------------------

// NodeJS: export class constructor from module by removing '//' before 'module...'
// -------
// module.exports = {{classame}};
`;

// NodeJS: uncomment modules.export in last line
// module.export = {{classname}};
