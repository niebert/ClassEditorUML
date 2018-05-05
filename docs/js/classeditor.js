function saveFile2HDD(pFilename,pContent) {
  var file = new File([pContent], {type: "text/plain;charset=utf-8"});
  saveAs(file,pFilename);
}

function deleteClass() {
  editor.setValue(vDataJSON["UML_DEFAULT"]);
}

function validate_errors() {
  // Get an array of errors from the validator
  var errors = editor.validate();

  var indicator = document.getElementById('valid_indicator');

  // Not valid
  if(errors.length) {
    indicator.style.color = 'red';
    indicator.textContent = "not valid";
  }
  // Valid
  else {
    indicator.style.color = 'green';
    indicator.textContent = "valid";
  };
  var vErrors = "";
  var vCR = "";
  for (var i = 0; i < errors.length; i++) {
    vErrors +=  vCR + errors[i].path + " - " +errors[i].property +" - "+errors[i].message;
    vCR = "\n";
  };
  document.getElementById("tErrors").value = vErrors;
}

function update_editor(pJSON) {
  var vJSON = pJSON || editor.getValue();
  $('#load_filename').html(class2filename(vJSON.data.classname,".json"));
  var c = vJSON.settings;
  var vRequired_Classes = concat_array(c.remoteclasslist,c.localclasslist);
  //console.log("vRequired_Classes: "+vRequired_Classes.join(","));
  c.classlist = concat_array(c.baseclasslist,vRequired_Classes);
  console.log("vRequired_Classes: ('"+c.classlist.join("','")+"')");
  //vRequired_Classes.sort();
  c.classlist.sort();
  var vEditNode = editor.getEditor('root.settings');
  // `getEditor` will return null if the path is invalid
  if(vEditNode) {
    vEditNode.setValue(c);
  } else {
    console.log("Update 'root.settings' undefined");
  };
  vEditNode = editor.getEditor('root.data');
  if(vEditNode) {
    vEditNode.setValue(vJSON.data);
  } else {
    console.log("Update 'root.data' undefined");
  };
  editor.setValue(vJSON);
}

function saver4JSON(pFile) {
  var vFile = pFile || vFileBase+".json";
  exporter4JSON();
  alert("File: '"+vFile+"' saved!");
};

function exporter4Schema() {
    // Get the value from the editor
    console.log("BEFORE editor.schema:\n"+JSON.stringify(editor.schema,null,4));
    var vJSON = editor.schema;
    var vContent = JSON.stringify(vJSON,null,4);
    var vFile = "uml_schema.json";
    console.log("JSON Schema output '"+vFile+"':\n"+vContent);
    saveFile2HDD(vFile,vContent);
}

function exporter4JSON(pFile) {
 // Get the value from the editor
 var vJSON = editor.getValue();
 var vFile = class2filename(vJSON.data.classname,".json");
// set modified date in reposinfo.modified
 updateModified(vJSON);
 var vContent = JSON.stringify(vJSON,null,4);
 saveFile2HDD(vFile,vContent);
 console.log("JSON output '"+vFile+"':\n"+vContent);
};

function updateModified(pJSON) {
  if (pJSON) {
    if (pJSON.reposinfo) {
      pJSON.reposinfo.modified = getDateTime();
      console.log("reposinfo.modified updated: '"+pJSON.reposinfo.modified+"'");
    }
  };

};

function class2filename(pClassName,pExt) {
  var vExt = pExt || "";
  var vFilename = pClassName || "Undefined Class";
  vFilename = vFilename.toLowerCase();
  vFilename = vFilename.replace(/[^a-z0-9]/g,"_");
  vFilename = vFilename.replace(/_[_]+/g,"_");
  return vFilename+vExt;
}

function exportCode() {
  //-- Javascript Class Output --
  //-- Template: tpl/javascript_class_tpl.js
  var vJSON = editor.getValue();
  updateModified(vJSON);
  //-- HandleBars: Compile with javascript-template ---
  // vDataJSON["out"]["javascript"] is HandleBars compiler function
  // Compile functions was generated from "tpl/javascript_class_tpl.js"
  var vContent = vDataJSON["out"]["javascript"](vJSON);
  //--Textarea Output----------------
  var vOutNode = document.getElementById("tOutput");
  vOutNode.value = vContent;
  //--JSON Output----------------
  var vFile = class2filename(vJSON.data.classname,vJSON.settings.extension4code);
  saveFile2HDD(vFile,vContent);
  alert("Export Code for Class to '"+vFile+"'");
};

function exportDocumentation() {
  //-- GitHub Class Documentation Output in GitHub Markdown--
  //-- Template: tpl/docu4github_tpl.js
  var vJSON = editor.getValue();
  updateModified(vJSON);
  //-- HandleBars: Compile with javascript-template ---
  // vDataJSON["out"]["javascript"] is HandleBars compiler function
  // Compile functions was generated from "tpl/docu4github_tpl.js"
  var vContent = vDataJSON["out"]["docugithub"](vJSON);
  //--Textarea Output----------------
  var vOutNode = document.getElementById("tOutput");
  vOutNode.value = vContent;
  //--JSON Output----------------
  var vFile = "README_"+class2filename(vJSON.classname,".md");
  saveFile2HDD(vFile,vContent);
  alert("Export GitHub Documentation for Class to '"+vFile+"'");
};

function loader4JSON(pFileID4DOM) {
  var fileToLoad = document.getElementById(pFileID4DOM).files[0]; //for input type=file
  if (fileToLoad) {
    console.log("loader4JSON() - File '"+fileToLoad.name+"' exists.");
    $('#load_filename').html(fileToLoad.name); // this.value.replace(/.*[\/\\]/, '')
    var fileReader = new FileReader();
    // set the onload handler
    fileReader.onload = function(fileLoadedEvent){
        var vTextFromFileLoaded = fileLoadedEvent.target.result;
        //document.getElementById("inputTextToSave").value = textFromFileLoaded;
        //alert("textFromFileLoaded="+textFromFileLoaded);
        try {
          editor.setValue(JSON.parse(vTextFromFileLoaded));
          alert("File JSON '"+fileToLoad.name+"' loaded successfully!");
          validate_errors();
        } catch(e) {
          editor.setValue([]); // Init with an empty class
          alert(e); // error in the above string (in this case, yes)!
        };
      };
    //onload handler set now start loading the file
    fileReader.readAsText(fileToLoad, "UTF-8");
  } else {
    alert("File is missing");
  };
  saveLS(fileToLoad.name);
};
