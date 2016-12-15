{
  "parser"  : "babel-eslint",
  "extends" : [
    "standard",
    "standard-react",
    "airbnb/base"
  ],
  "plugins" : [
    "flow-vars"
  ],
  "env"     : {
    "browser" : true
  },
  "globals" : {
    "Action"       : false,
    "__DEV__"      : false,
    "__PROD__"     : false,
    "__DEBUG__"    : false,
    "__DEBUG_NEW_WINDOW__" : false,
    "__BASENAME__" : false
  },
  "rules": {
    "semi" : [2, "never"],
    "max-len": [2, 120, 2],
    "flow-vars/define-flow-type": 1,
    "flow-vars/use-flow-type": 1
  }
}
