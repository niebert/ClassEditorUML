var concat = require('concat-files');
var vLibPath = './docs/js/';
var vLibOut = './dist/class_editor_uml.js';
console.log("Create Library '"+vLibOut+"'");
  concat([
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
    vLibPath+'localstorage.js'
  ], vLibOut, function(err) {
    if (err) throw err
    console.log('done');
  });
