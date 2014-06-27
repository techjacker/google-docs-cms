var indexManifest = require('./../fixtures/src/index.json'); // ["icons","biography","projects","clients","achievements","contact"]

var tableTop = {};

tableTop.init = function (options) {
  options.callback({}, tableTop);
};

tableTop.sheets = function (tabName) {
  return {elements: require('./../fixtures/src/tabs/' + tabName + '.json')};
};

tableTop.model_names = indexManifest.tabs;

module.exports = tableTop;