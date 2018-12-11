vDataJSON["class_schema"] = {
          type: "object",
          title: "Text",
          required: ["fontSize","color","font","weight","tags","possibleFonts"],
          properties: {
            fontSize: {
              type: "integer",
              enum: [10,11,12,14,16,18,20,22,24,36,48,60,72,100],
              default: 24,
              options: {
                // Override defaullt options
                select2_options: {
                  width: 'off'
                }
              }
            },
            color: {
              type: "string",
              enum: ["black","red","green","blue","yellow","orange","purple","brown","white","cyan","maagenta"]
            },
            font: {
              type: "string",
              enumSource: "possible_fonts",
              watch: {
                "possible_fonts": "root.possibleFonts"
              },
            },
            weight: {
              type: "string",
              enum: ["normal","bold","bolder","lighter"],
              options: {
                enum_titles: ["Normal (400)","Bold (700)","Bolder (900)","Lighter (200)"]
              }
            },
            tags: {
              type: "array",
              uniqueItems: true,
              format: "select",
              items: {
                type: "string",
                enum: ["bold","italic","smallcaps"]
              }
            },
            possibleFonts: {
              type: "array",
              format: 'table',
              items: {
                type: "string"
              },
              default: ["Arial","Times","Helvetica","Comic Sans"],
              options: {
                collapsed: true
              }
            }
          }
        }
