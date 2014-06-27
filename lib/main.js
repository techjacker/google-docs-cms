var fs = require('fs');
var _ = require('underscore');
var Tabletop = require('tabletop');
var Promise = require('bluebird');

/**
 * downloads google sheets data and writes to disk in JSON format
 *
 * @param {Object}   	options 					options object
 * @param {Array}   	options.id  			id of google spreadsheet to download (visible in the URL or share link)
 * @param {Array}   	options.outPath  	location of file to write spreadsheet data to
 * @param {Function} 	cb      					node style cb(null, jsonPayloadIfSuccessful)
 * @return {Promise}         						resolves with combined JSON payload of all tabs combined into a single object with tabnames as keys for each tab data
 */
var Main = function (options, cb) {

	if (!(this instanceof Main)) return new Main(options, cb);

	return this.downloadSpreadsheet(options.id)
		.bind(this)
		.spread(this.extractTabsJson)
		.spread(this.combine)
		.then(function (res) { return (this.result = res); })
		// .then(JSON.stringify).then(Promise.promisify(fs.writeFile).bind(fs, options.outPath))
		.then(function (res) {
			return (options.outPath == null) ? res : Promise.promisify(fs.writeFile).bind(fs, options.outPath)(JSON.stringify(res));
		})
		.then(function () { return this.result; })
		.nodeify(cb);
};

/**
 * download spreadhseet from google docs with toptable npm module
 *
 * @param  {string} 	sheetId 		id of google spreadsheet (visible in URL or share link)
 * @return {Promise}  						resolves with result [mainJson, tabletop] */
Main.prototype.downloadSpreadsheet = function (sheetId) {
  return new Promise(function (resolve, reject) {
	  Tabletop.init({
	  	key: this.generateGoogleSheetUrl(sheetId),
			callback: function () {
				resolve(Promise.all(Array.prototype.slice.call(arguments)));
			},
			parseNumbers: true,
			simpleSheet: true
			// wanted: true,
			// debug: true,
		});
  }.bind(this));
};

Main.prototype.extractTabsJson = function (data, tableTop) {
	var tabs = tableTop.model_names.sort();
	return [tabs, tabs.map(tableTop.sheets.bind(tableTop))];
};

/**
 * combines array of sheets JSON from tabletop into a single JSON object
 *
 * @param  {array} tabNames  array of google sheet names from manifest file
 * @param  {array} tabsJson  array of JSON payload from toptable taken from google docs
 * @return {Object}          single JSON object with all sheets merged into a single object - each sheet is a property on the object
 */
Main.prototype.combine = function (tabNames, tabsJson) {
	return tabsJson.reduce(function (memo, row, rowIndex) {
		var section = _(row.elements).map(this.filterRowName, this); // remove rowNumber props added by toptable
		memo[tabNames[rowIndex]] = section.length === 1 ? section[0] : section; // if only one object in array then take it out of array
		return memo;
	}.bind(this), {});
};

/*--------------------------------------
helper methods
---------------------------------------*/
Main.prototype.filterKeyName = function (badKeyName, objectDirty) {
	return _(objectDirty).reduce(function (mem, val, key) {
		(key !== badKeyName) && (mem[key] = val);
		return mem;
	}, {});
};
Main.prototype.filterRowName = Main.prototype.filterKeyName.bind(null, 'rowNumber');

Main.prototype.generateGoogleSheetUrl = function (sheetId) {
	return 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=' + sheetId + '&output=html';
};

module.exports = Main;