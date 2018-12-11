function saveJSON4Class() {
  console.log("Saver the JSON for Class");
  vJSONEditor.saveJSON();
  var vJSON = vJSONEditor.getValue();
  write2editor("Output",JSON.stringify(vJSON,null,4))
}

function saveCode4Class() {
  console.log("Saver the Code for Class");
  var vTplID = 'javascript';
  var vMode = "ace/mode/javascript";
  vJSONEditor.save4Template(vTplID,'.js','Javascript Code for Class');
  var vContent = vJSONEditor.getOutput4Template(vTplID);
  write2editor("Output",vContent,vMode)
}

function saveDocu4Class() {
  console.log("Saver the Github Documentation for Class");
  var vTplID = 'docu4github';
  var vMode = "ace/mode/markdown";
  vJSONEditor.save4Template(vTplID,'_github.md','Github Documentation for Class');
  var vContent = vJSONEditor.getOutput4Template(vTplID);
  write2editor("Output",vContent,vMode)
}


function saveTemplate2Editor(pID,pTemplateID) {
  // (1) Get the template content as string
  var vContent = vDataJSON.tpl[pTemplateID] || "Template undefined";
  var vEditorMode = "ace/mode/javascript";
  switch (pTemplateID) {
    case "docu4github":
        vEditorMode = "ace/mode/markdown"
    break;
    default:
      vEditorMode = "ace/mode/javascript"
  };
  write2editor(pID,vContent);
};

function onChangeACE(pID,pContent) {
        // handles the onchange events called ACE Editors in the iFrame
        // (1) onchange event updates in general an invisible textarea in
        //     parent document of the iframe.
        // (2) the id "pID" in the onChangeACE() parameter was send before
        //     as "domid" link parameter to the ACE editor
        //     via URL of the iFrame, e.g. "ace/ace.html?domid=myinput"  pID="myinput"
        // Remark: the pID is especially important, when different ACE editors
        //     in iFrames fire "onchange" events
        top.write2value(pID,pContent);
        // this function is called from ACE inside the iFrame to "top." was
        // added to refer to the function write2value in the top document object.
        // write the content of ACE in the iFrame to the DOM value with the id pID;
};

function write2editor(pID,pValue,pMode) {
  write2value("t"+pID,pValue);
  if (pMode) {
    // e.g. editor.session.setMode("ace/mode/javascript");
    setEditorMode("i"+pID,pMode);
  };
  setEditorValue("i"+pID,pValue);
};

function insert2editor(pID,pValue) {
  var vEditor = getIFrameEditor("i"+pID);
  vEditor.insert(pValue);
  var vOutput = getEditorValue("i"+pID);
  write2value("t"+pID,pValue);
};

function getIFrameDocument(pIFrameName) {
  var vIFrame = document.getElementById(pIFrameName);
  var vDoc = null;
  if (vIFrame) {
    vDoc = vIFrame.contentWindow.document;
  } else {
    console.log("getIFrameDocument('"+pIFrameName+"') iFrame UNDEFINED");
  };
  return vDoc;
};

function getIFrameWindow(pIFrameName) {
  var vIFrame = document.getElementById(pIFrameName);
  var vWin = null;
  if (vIFrame) {
    vWin = vIFrame.contentWindow;
  } else {
    console.log("getIFrameWindow('"+pIFrameName+"') iFrame UNDEFINED");
  };
  return vWin;
};

function getCompressorWin() {
  return getIFrameWindow("iCompressor");
};

function getIFrameEditor(pIFrameName) {
  //var vDoc = getIFrameDocument(pIFrameName);
  var vWin = getIFrameWindow(pIFrameName);
  var vEditor = null;
  if (vWin) {
    console.log("Window of iFrame '"+pIFrameName+"' found");
    if (vWin.editor) {
      vEditor = vWin.editor;
      console.log("iFrameEditor in Frame '"+pIFrameName+"' exists!");
    } else {
      console.log("ERROR: iFrameEditor in Frame '"+pIFrameName+"' missing!");
    }
  } else {
    console.log("ERROR: getIFrameEditor('"+pIFrameName+"') no contentWindow object exists");
  };
  return vEditor;
};

function initEditorContent(pEditorID) {
  console.log("initEditorContent('"+pEditorID+"') - Call");
};


function setEditorMode(pIFrameName,pMode) {
  if (pMode) {
    var vEditor = getIFrameEditor(pIFrameName);
    // e.g. vEditor.session.setMode("ace/mode/javascript");
    if (vEditor) {
      if (vEditor.session) {
        console.log("setEditorMode('"+pIFrameName+"','"+pMode+"')");
        vEditor.session.setMode(pMode);
      } else {
        console.log("WARNING: vEditor['"+pIFrameName+"'].session undefined");
      }
    } else {
      console.log("WARNING: vEditor['"+pIFrameName+"']");
    };
  };
};


function setEditorValue(pIFrameName,pValue) {
  var vEditor = getIFrameEditor(pIFrameName);
  //vEditor.setValue(vEditor.getValue(), 1);
  if (vEditor) {
    if (typeof vEditor.setValue === "function") {
      vEditor.setValue(pValue, -1);
      console.log("Setting Text of ACE-Editor in iFrame '"+pIFrameName+"' DONE!");
    } else {
      console.log("WARNING: vEditor.setValue() undefined");
    }
    //vEditor.setValue(pValue, 1);
  } else {
    console.log("ERROR: Setting Text of ACE-Editor in iFrame '"+pIFrameName+"' was not successful!");
  }
}

function getEditorValue(pIFrameName) {
  var vEditor = getIFrameEditor(pIFrameName);
  var vReturn = "";
  if (vEditor) {
    if (typeof(vEditor.getValue) !== "undefined") {
      // safe to use the function
      vReturn = vEditor.getValue();
      console.log("get Text of ACE-Editor in iFrame '"+pIFrameName+"' DONE!");
    } else {
      console.log("WARNING: Call vEditor.getValue() undefined");
    }
  } else {
    console.log("ERROR: Getting Text of ACE-Editor in iFrame '"+pIFrameName+"' was not successful!");
  };
  return vReturn;
};
