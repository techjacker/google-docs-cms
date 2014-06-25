var indexManifest = require('./../fixtures/src/index.json'); // ["icons","biography","projects","clients","achievements","contact"]
var mainSheet = require('./../fixtures/src/main-sheet.json'); // ["icons","biography","projects","clients","achievements","contact"]

var tableTop = {};

tableTop.init = function (options) {
  options.callback(mainSheet, tableTop);
};

tableTop.sheets = function (tabName) {
  return require('./../fixtures/src/tabs/' + tabName + '.json');
};

tableTop.model_names = indexManifest.tabs;

module.exports = tableTop;