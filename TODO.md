DEVELOPMENT Performed jsoneditor4code not in ClassEditorUML

ClassEditorUML is just using jsoneditor4code with a specific JSON Schema

!!! DO NOT DEVELOP IN ClassEditorUML !!!
Just adapt Schema here e.g. for ReactJS

BUG: Handlebars Helper do not loop over Attributes and Methods
BUG: Does not update the classes list after alteration
SOLUTION: Update Classes not internally but by LinkParam insert new classes in JSON.
