 vDataJSON["class_schema"] = {
    "type": "object",
    "title": "UML Definition",
    "properties": {
      "type": "object",
      "title": "Class: MyClass",
      "headerTemplate": "Class: {{self.classname}}",
      "properties": {
        "classname": {
          "title": "Class:",
          "type": "string",
          "default": "MyClass"
        },
      },
      "type": "object",
      "title": "Settings UML Editor",
      "properties": {
        "classlist": {
          "type": "array",
          "title": "List of Classes",
          "format": 'table',
          "items": {
            "title":"Classes",
            "type": "string"
          },
          "default": [
              "",
              "App",
              "AppAbstract",
              "Array",
              "Boolean",
              "Document",
              "Float",
              "Function",
              "Hash",
              "Integer",
              "LinkParam",
              "Object",
              "RegularExp",
              "String"
            ],
          "options": {
            "collapsed": true,
            "hidden": true
          }
        },
      }
    }
    "type": "object",
    "title": "Class: MyClass",
    "headerTemplate": "Class: {{self.classname}}",
    "properties": {
        "superclassname": {
          "title": "Super Class",
          // "$ref": "#/definitions/selectclass",
          "enumSource": "possible_classes",
          "watch": {
            "possible_classes": "root.classlist"
          }
        },
        "comment": {
            "title": "Comment:",
            "type": "string",
            "$ref": "#/definitions/comment",
            "default": "What does the class do?",
            "description": "Decribe the purpose of the class, so that other developers know, why you implemented this class"
        },
        "reposinfo": {
            "title": "Repository Info",
            "type": "object",
            "format": "table",
            "properties": {
              "require_classes": {
                "title": "Require Classes NPM:",
                "default": "yes",
                "type": "string",
                "enum": [
                    "yes",
                    "no"
                ]
              },
              "author": {
                "title": "Author:",
                "type": "string",
                "default": "My Name"
              },
              "email": {
                "title": "e-Mail:",
                "type": "string",
                "default": "name@example.com"
              },
              "created": {
                "title": "Created:",
                "type": "string",
                "default": getDate()
              },
              "modified": {
                "title": "Modified:",
                "type": "string",
                "default": getDate()
              },
            },
            "options": {
              collapsed: true
            }
        },
        "attributes": {
            "title": "Attribute",
            "type": "array",
            "format": "table",
            "uniqueItems": true,
            "items": {
                "title": "Attrib",
                "type": "object",
                "uniqueItems": true,
                "headerTemplate": "{{self.name}}",
            	  "format": "table",
                "properties": {
                    "visibility": {
                        "title": "Visibility",
                        "$ref": "#/definitions/visibility"
                    },
                    "name": {
                        "type": "string",
                        "minLength": 2,
                        "default": "aMyAttrib"
                    },
                    "init": {
                        "type": "string",
                        "default": "null"
                    },
                    "class": {
                        "title": "Class",
                        "enumSource": "possible_classes",
                        "watch": {
                          "possible_classes": "root.config.classlist"
                        },
                        "default": ""
                        //"$ref": "#/definitions/selectclass"
                    },
                    "comment": {
                        "title": "Comment",
                        "$ref": "#/definitions/comment",
                        "default": "What do you stored in this attribute?"
                    }
                }
            }
        },
        "methods": {
            "title": "Methods",
            "type": "array",
            "format": "tabs",
            "uniqueItems": true,
            "items": {
                "headerTemplate": "{{self.name}}()",
                "type": "object",
                "title": "Method",
                "id": "method",
                "defaultProperties": [
                    "visibility",
                    "name",
                    "parameter",
                    "return",
                    "comment",
                    "code"
                ],
                "properties": {
                    "visibility": {
                        "title": "Visibility",
                        "$ref": "#/definitions/visibility"
                    },
                    "name": {
                        "type": "string",
                        "minLength": 1,
                        "default": "myMethod"
                    },
                    "parameter": {
                        "type": "array",
                        "title": "Parameter",
                        "format": "table",
                        "uniqueItems": true,
                        "items": {
                            "title":"Param",
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "title": "Parameter",
                                    "minLength": 1,
                                    "default": "pVar"
                                },
                                "class": {
                                    "type":"string",
                                    "title": "Class",
                                    "enumSource": "possible_classes",
                                    "watch": {
                                      "possible_classes": "root.config.classlist"
                                    },
                                    //"$ref": "#/definitions/selectclass"
                                },
                   				      "comment": {
                        			       "title": "Comment",
                        			       "$ref": "#/definitions/comment",
                        			       "default": "What is stored in this parameter?"
                    			      }
                            }
                        },
                        "options": {
                          "collapsed": true
                        },
                    },
                    "return": {
                        "title": "Return",
                        "enumSource": "possible_classes",
                        "watch": {
                          "possible_classes": "root.config.classlist"
                        },
                        //"$ref": "#/definitions/selectclass"
                        "default": ""
                    },
                    "comment": {
                        "title": "Comment",
                        "$ref": "#/definitions/comment",
                        "default": "What kind of process does this method perform?"
                    },
                    "code": {
                        "title": "Code",
                        "type": "string",
                        "format": vProgLanguage
                    }
                }
            }
        },
        "repository": {
          "title": "Repository (e.g. on GitHub):",
          "type": "string",
          "default": "https://www.github.com/author/MyClass"
        },
        "baseclasslist": {
          "type": "array",
          "title": "List of Base Classes",
          "format": 'table',
          "description": "The list of all base classes, that are provided by the programming language '"+vProgLanguage+"' itself.",
          "items": {
            "title":"Base Class",
            "type": "string"
          },
          "default": [
              "",
              "Array",
              "Boolean",
              "Document",
              "Float",
              "Function",
              "Hash",
              "Integer",
              "Object",
              "RegularExp",
              "String"
            ],
          "options": {
            "collapsed": true
          }
        },
        "extendedclasslist": {
          "type": "array",
          "title": "Extended List of Classes",
          "description": "The list of all extended classes, that are available locally as additional libraries/modules in the language '"+vProgLanguage+"'.",
          "format": 'table',
          "items": {
            "title":"Extended Class",
            "type": "string"
          },
          "default": [
              "App",
              "AppAbstract"
            ],
          "options": {
            "collapsed": true
          }
        },
        "remoteclasslist": {
          "type": "array",
          "title": "Remote List of Classes",
          "description": "The list of all remotely available classes, that are embedded from a package manager (like NPM) for the language '"+vProgLanguage+"'.",
          "format": 'table',
          "items": {
            "title":"Remote Class",
            "type": "string"
          },
          "default": [
              "LinkParam",
              "JSONEditor"
            ],
          "options": {
            "collapsed": true
          }
        }
    }
    */
    ,
    "definitions": {
        "selectclass": {
            "type": "string",
            "enum": [
                "",
                "App ",
                "AppAbstract ",
                "Array",
                "Boolean",
                "CheckBoxList ",
                "DOMVar ",
                "DOMVarList ",
                "Database ",
                "DatabaseList ",
                "Document",
                "Editor4JSON ",
                "Float",
                "Function",
                "FuzzyController ",
                "FuzzyLayer ",
                "Hash",
                "Integer",
                "LinkParam ",
                "Object",
                "ParserHTML ",
                "RegularExp",
                "Server ",
                "String",
                "WrapJSON "
            ]
        },
        "comment": {
            "title": "Comment:",
            "type": "string",
            "format": "textarea"
        },
        "visibility": {
            "type": "string",
            "enum": [
                "public",
                "private"
            ]
        }
    }
}