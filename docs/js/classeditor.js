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

function update_editor() {
  var vJSON = editor.getValue();
  $('#load_filename').html(class2filename(vJSON.classname));
  vJSON.classlist = concat_array(vJSON.baseclasslist,vJSON.extendedclasslist);
  editor.setValue(vJSON);

}

function saver4JSON(pFile) {
  var vFile = pFile || vFileBase+".json";
  exporter4JSON();
  alert("File: '"+vFile+"' saved!");
};


function exporter4JSON(pFile) {
 // Get the value from the editor
 var vJSON = editor.getValue();
 var vFile = class2filename(vJSON.classname);
// set modified date in reposinfo.modified
 updateModified(vJSON);
 var vContent = JSON.stringify(vJSON,null,4);
 saveFile2HDD(vFile,vContent)
        console.log("JSON output '"+vFile+"':\n"+vContent);
};

function updateModified(pJSON) {
  if (pJSON) {
    if (pJSON.reposinfo) {
      pJSON.reposinfo.modified = getDateTime();
    }
  };

};

function class2filename(pClassName) {
  var vFilename = pClassName.toLowerCase();
  vFilename = vFilename.replace(/[^a-z0-9]/g,"_");
  vFilename = vFilename.replace(/_[_]+/g,"_");
  return vFilename+".json";
}

function exportJavascript() {
  alert("Export Javascript");
  //-- Javascript Class Output --
  var vOutNode = document.getElementById("tOutput");
  var vJSON = editor.getValue();
  updateModified(vJSON);
  vOutNode.value = vDataJSON["out"]["javascript"](vJSON);
  //--JSON Output----------------
  vOutNode = document.getElementById("tOutJSON");
  vOutNode.value = JSON.stringify(vJSON,null,4);
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
