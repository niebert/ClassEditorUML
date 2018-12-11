
function update_filename (pJSONEditor) {
  if (pJSONEditor) {
    var vNode = pJSONEditor.el(pJSONEditor.aOptions["filename_id"]); // e.g. filename_id = "load_filename";
    if (vNode) {
        var vJSON = pJSONEditor.getValue();
        if (vJSON.data) {
          if (vJSON.data.hasOwnProperty(pJSONEditor.aOptions["filename_key"])) {
            vNode.innerHTML = class2filename(vJSON.data.classname)+vJSON.reposinfo.extension4code;
          }
        };
    } else {
        console.log("DOM node ["+pJSONEditor.aOptions["filename_id"]+"] not found");
    };
  } else {
    console.log("update_filename()-Call pJSONEditor not defined");
  }
}


function add_watch(pJSONEditor) {
  if (pJSONEditor) {
    var e = pJSONEditor.aEditor;
    if (e) {
      var vJSON = e.getValue();
      e.watch('root.baseclasslist',function() {
        update_classlist(pJSONEditor);
      });
      e.watch('root.localclasslist',function() {
        update_classlist(pJSONEditor);
      });
      e.watch('root.remoteclasslist',function() {
        update_classlist(pJSONEditor);
      });
      // set the current filename of the class in init_watch() method
      // later any load() call will update the filename in DOM tree
      if (vJSON.data.hasOwnProperty(pJSONEditor.aOptions["filename_key"])) {
        vNode.innerHTML = class2filename(vJSON.data.classname)+vJSON.reposinfo.extension4code;
      }
    } else {
      console.log("ERROR: init_watch() - pJSONEditor.aEditor not defined!");
    }
  } else {
    console.log("init_watch()-Call pJSONEditor not defined");
  }
}

function cloneJSON(pJSON) {
  var vJSON = {};
  if (pJSON) {
    vJSON = JSON.parse(JSON.stringify(pJSON));
  } else {
    console.log("ERROR: cloneJSON(pJSON) - pJSON undefined!");
  };
  return vJSON
};

function update_classlist (pJSONEditor) {
  if (pJSONEditor) {
    if (pJSONEditor.aEditor) {
      var e = pJSONEditor.aEditor;
      var d =  pJSONEditor.aDefaultJSON;
      var ed; // temporary editor
      // Sources for the classlist
      var baseclasslist = [];
      var localclasslist = [];
      var remoteclasslist = [];
      if (d) {
        baseclasslist = d.baseclasslist || [];
        localclasslist = d.localclasslist || [];
        remoteclasslist = d.remoteclasslist || [];
      } else {
        console.log("WARNING: classuml.js:75 - pJSONEditor.aDefaultJSON undefined");
      };
      if (e) {
        // BaseClassList
        ed = e.getEditor('root.baseclasslist');
        if (ed) {
           baseclasslist =  ed.getValue() || [];
        } else {
          console.log("WARNING: classuml.js:83  - baseclasslist undefined");
          baseclasslist = pJSONEditor.aDefaultJSON.baseclasslist || [];
        };
        ed = e.getEditor('root.localclasslist');
        if (ed) {
           localclasslist =  ed.getValue() || [];
        } else {
          console.log("WARNING: classuml.js:83  - localclasslist undefined");
          localclasslist = pJSONEditor.aDefaultJSON.localclasslist || [];
        };
        ed = e.getEditor('root.remoteclasslist');
        if (ed) {
           remoteclasslist =  ed.getValue() || [];
        } else {
          console.log("WARNING: classuml.js:96  - remoteclasslist undefined");
          remoteclasslist = pJSONEditor.aDefaultJSON.remoteclasslist || [];
        };
        // write a joint list of all classes to classlist
        // (1) get the editor that will update
        ed =  e.getEditor('root.classlist');
        // (2) concat all source array of classnames
        var classlist = localclasslist.concat(remoteclasslist);
        classlist.sort();
        // inject the base classes (Integer,String, Array, Boolean, Float, ...) before remote and local classes
        classlist = baseclasslist.concat(classlist);
        // insert "no class defined" as first option for unclassified variables
        if ((classlist.length > 0) && classlist[0] != "") {
          // add "no class" as first element in class list.
          var no_class = [""];
          classlist = no_class.concat(classlist);
        }
        // (3) update editor of the classlist with array for editor with id "root.classlist"
        if (ed) {
           ed.setValue(classlist);
        } else {
          console.log("WARNING: classuml.js:111  -  write to classlist cancelled - editor undefined");
        };
        update_baseclasslist(pJSONEditor);
      } else {
        console.log("WARNING: update_classlist(pJSONEditor) pJSONEditor.aEditor undefined");
      }
    }
  } else {
    console.log("Editor in update_classlist(pEditor) was not defined!");
  };
}

function update_baseclasslist (pJSONEditor) {
  console.log("update_baseclasslist()");
  if (pJSONEditor) {
    if (pJSONEditor.aEditor) {
      var e = pJSONEditor.aEditor;
      // Sources for the classlist
      var ed =  e.getEditor('root.baseclasses');
      var baseclasses = [];
      if (ed) {
        baseclasses = ed.getValue() || [];
      } else {
        console.log("classuml.js:137 - baseclasses undefined");
      }
      // write a joint list of all classes to classlist
      // (1) get the editor that will update
      // (2) concat all source array of classnames
      var baseclasslist = [];
      for (var i = 0; i < baseclasses.length; i++) {
        baseclasslist.push(baseclasses[i].name);
      };
      // (3) update the baseclasslist array to the editor "ed" for "baseclasslist"
      ed.setValue(baseclasslist);
    }
  } else {
    console.log("Editor in update_classlist(pEditor) was not defined!");
  }
}
