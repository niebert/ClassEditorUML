const pkg = require('./package');
// ------ Build Settings -----------------
var vExportVar = "JSONEditor4Code"; // defined in src/libs/exportmod.js
var vSrcPath = "./src/"; // Path to Source Libraries
var vDistPath = "./src/"; // Path to distribution
var vLibPath = vSrcPath + 'libs/';
var vLibDist = './dist/'+pkg.name+'.js';
var vLibOut = './docs/js/'+pkg.name+'.js';
// ----------------------------------------
// Process Chaining
// (1) create "npm_header.js" and "npm_tail.js" in src/libs
// (2) concat files export library to docs/js with prepend npm_header.js
// (3) create src/main.js for browserify and append "npm_tail.js"

var browserify = require('browserify');

var fs = require('fs');
var vHeader = "/* ---------------------------------------";
vHeader += "\n Exported Module Variable: "+vExportVar;
vHeader += "\n Package:  "+pkg.name;
vHeader += "\n Version:  "+pkg.version;
vHeader += "\n Homepage: "+pkg.homepage;
vHeader += "\n Author:   "+pkg.author;
vHeader += "\n License:  "+pkg.license;
vHeader += "\n Require Module with:";
vHeader += "\n    const "+vExportVar+" = require('" + pkg.name+ "');";
vHeader += "\n    var  v"+vExportVar+" = new "+vExportVar+"(document);";
vHeader += "\n ------------------------------------------ */";
vHeader += "\n";
vHeader += "\n/*jshint  laxcomma: true, asi: true, maxerr: 150 */";
vHeader += "\n/*global alert, confirm, console, prompt */";
vHeader += "\n";
fs.writeFile("./src/npm_header.js", vHeader, function(err) {
    if(err) {
        return console.log(err);
    };
    console.log("Module Header file 'src/npm_header.js' was saved!");
});
var vTail = "\n";
vTail += "\n// -------NPM Export Variable: " +vExportVar+ "---------------";
//vTail += "\nmodule.exports = "+vExportVar+";";
vTail += "\nmodule.exports = "+vExportVar+";";
fs.writeFile("./src/npm_tail.js", vTail, function(err) {
    if(err) {
        return console.log(err);
    };
    console.log("Module Header file 'src/npm_tail.js' was saved!");
});
var concat = require('concat-files');
console.log("Create Library '"+vLibOut+"'");
//require("./src/liblist")
  concat([
    './src/npm_header.js',
    vLibPath+'arrayhash.js',
    vLibPath+'blob.js',
    vLibPath+'bootstrap.js',
    vLibPath+'classeditor.js',
    vLibPath+'date.js',
    vLibPath+'filesaver.js',
    vLibPath+'handlebars.js',
    vLibPath+'handlebars_helper.js',
    vLibPath+'jsoneditor.js',
    vLibPath+'linkparam.js',
    //vLibPath+'localstorage.js',
    vLibPath+'exportmod.js'
  ], vLibOut, function(err) {
    if (err) {
      console.log("ERROR: generating '"+vLibOut+"'");
      throw err
    };
    console.log("File: '"+vLibOut+"' generated");
  });


  var vMainJS = "./"+pkg.main;
  console.log("Create Main NPM File: '"+vMainJS+"'");
  if (fs.existsSync(vLibOut)) {
      console.log("Library '"+vLibOut+"' exists - copy to '"+vLibDist+"'");
      concat([
            vLibOut
        ], vLibDist, function(err) {
          if (err) {
            console.log("ERROR: generating '"+vLibDist+"'\n"+err);
            throw err
          };
          console.log("File: '"+vLibOut+"' copied to '"+vLibDist+"' successfully!");
      });
      concat([
            vLibOut,
            './src/npm_tail.js'
        ], vMainJS, function(err) {
          if (err) {
            console.log("ERROR: generating '"+vMainJS+"'\n"+err);
            throw err
          };
          console.log("File: '"+vMainJS+"' generated");
      });
  } else {
      console.log("ERROR: Library '"+vLibOut+"' missing! Run build.js again!");
  };
