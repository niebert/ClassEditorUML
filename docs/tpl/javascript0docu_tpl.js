vDataJSON.tpl.javascript0docu = `
{{#ifcond data.reposinfo.require_classes "==" "yes"}}
{{#ifcond data.superclassname "!=" ""}}
{{#ifcond data.superclassname "!=" " "}}
const {{data.superclassname}} = require('{{filename data.superclassname}}');
{{/ifcond}}
{{/ifcond}}
{{#requireclass data settings}}
{{/requireclass}}

{{#requirelibs data.reposinfo.requirelist}}
const {{variable}} = require('{{module}}');
{{/requirelibs}}

{{/ifcond}}
{{{data.reposinfo.configcode}}}
{{#ifcond data.reposinfo.static "==" "yes"}}
{{#foreach data.attributes data}}
{{#ifcond visibility "==" "public"}}
    this.{{name}} = {{{init}}};   // Class: {{class}}
{{/ifcond}}
{{#ifcond visibility "==" "private"}}
    var {{name}} = {{{init}}};   // Class: {{class}}
{{/ifcond}}
{{/foreach}}
{{#foreach data.methods data}}
{{/foreach}}
{{/ifcond}}
{{#ifcond data.reposinfo.static "!=" "yes"}}
{{#ifcond data.superclassname "!=" " "}}
{{#ifcond data.superclassname "!=" ""}}
{{data.classname}}.prototype = new {{data.superclassname}}();
{{data.classname}}.prototype.constructor={{data.classname}};
{{/ifcond}}
{{/ifcond}}

function {{data.classname}} () {

{{#foreach data.attributes data}}
{{#ifcond visibility "==" "public"}}
    this.{{name}} = {{{init}}};   // Class: {{class}}
{{/ifcond}}
{{#ifcond visibility "==" "private"}}
    var {{name}} = {{{init}}};   // Class: {{class}}
{{/ifcond}}
{{/foreach}}

}
{{#foreach data.methods data}}


{{#ifcond visibility "==" "public"}}
    {{data.classname}}.prototype.{{name}} = function ({{#paramcall parameter}}{{/paramcall}}) {
{{#ifcond data.reposinfo.debugheader "==" "yes"}}
            // console.log("{{filename data.classname}}.js - Call: {{name}}({{#paramcall parameter}}{{/paramcall}})");
{{/ifcond}}


{{/ifcond}}
{{#ifcond visibility "==" "private"}}
    function {{name}}({{#paramcall parameter}}{{/paramcall}}) {
{{/ifcond}}
{{indent code "      "}}
    }

{{/foreach}}
{{/ifcond}}
{{#ifcond data.reposinfo.static "==" "yes"}}
{{#ifcond data.superclassname "==" " "}}
var {{data.classname}} = {};
{{/ifcond}}
{{#ifcond data.superclassname "!=" ""}}
{{#ifcond data.superclassname "!=" " "}}
var {{data.classname}} = {{data.superclassname}};
{{/ifcond}}
{{/ifcond}}

{{#foreach data.attributes data}}
{{#ifcond visibility "==" "public"}}
    {{data.classname}}.{{name}} = {{{init}}};
{{/ifcond}}
{{#ifcond visibility "==" "private"}}
    var {{name}} = {{{init}}};
{{/ifcond}}
{{/foreach}}

{{#foreach data.methods data}}
{{#ifcond visibility "==" "public"}}
    {{data.classname}}.{{name}} = function ({{#paramcall parameter}}{{/paramcall}}) {
{{/ifcond}}
{{#ifcond visibility "==" "private"}}
    function {{name}}({{#paramcall parameter}}{{/paramcall}}) {
{{/ifcond}}
{{indent code indent="      "}}
    };
{{/foreach}}
{{/ifcond}}

{{#ifcond data.reposinfo.require_classes "==" "yes"}}
module.exports = {{data.classname}};
{{/ifcond}}
`;

// NodeJS: uncomment modules.export in last line
// module.export = {{classname}};
