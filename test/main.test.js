describe('main', function () {
  var sortObject = require('./helpers/helpers.js').sortObject;
  var fs = require('fs');
  var path = require('path');
  var should = require('should');
  var glob = require('glob');
  var rewire = require("rewire");

  // file to test
  var main = rewire('../lib/main.js');

  // mocks
  var tableTopMock = require('./mocks/tabletop.js');
  main.__set__("Tabletop", tableTopMock);

  // fixtures
  var targetOutputFile = path.join(__dirname, 'fixtures', 'tmp', 'index.json');
  var indexManifest = require('./fixtures/src/index.json'); // ["icons","biography","projects","clients","achievements","contact"]
  var mainSheet = require('./fixtures/src/main-sheet.json');
  var expected = sortObject(require('./fixtures/src/combined.json'));
  var tableTopMock = require('./mocks/tabletop.js');
  var arrTabsJson;

  before(function(done) {
    glob(__dirname + '/fixtures/src/tabs/*', function (err, arrFileNames) {
      arrTabsJson = arrFileNames.map(require);
      arrTabsJson = arrFileNames.map(function(name) {
        return {elements: require(name)};
      });
      done();
    })
  });

  beforeEach(function () {
    if (fs.existsSync(targetOutputFile)) fs.unlinkSync(targetOutputFile);
  });

  afterEach(function () {
    if (fs.existsSync(targetOutputFile)) fs.unlinkSync(targetOutputFile);
  });

  it('should export all needed API methods', function () {
    main.should.be.a.function;
  });

  it('should generate the google sheet url for tabletop', function () {
    var sheetId = 'sdfdsf2234';
    var expectedUrl = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=' + sheetId + '&output=html';
    main.prototype.generateGoogleSheetUrl.call(main.prototype, sheetId).should.equal(expectedUrl);
  });

  var opts = {
    id: '1HvEMxPVMfUml-tGgaaD0xjyKnpKykGY3gxGgBxSlaM8',
    outPath: targetOutputFile
  };

  it('should combine all the tabs from a google spreadseet into a single json object with the tab names as keys and write it to disk', function (done) {
    main(opts, function(err, res) {
      sortObject(res).should.eql(expected, 'it should write the results to disk');
      sortObject(require(opts.outPath)).should.eql(expected, 'it should write the results to disk');
      done(err);
    });
  });

  it('should have a promise API', function (done) {
    main(opts).then(function(res) {
      sortObject(res).should.eql(expected, 'it should write the results to disk');
      sortObject(require(opts.outPath)).should.eql(expected, 'it should write the results to disk');
      done();
    }, done);
  });



  it('should be optional to write data to disk', function () {
    main.bind(null, {id: 'sdfdsf'}).should.not.throw();
  });


  it('should combine all the tabs JSON a single object with the tab names as keys', function () {
    var res = sortObject(main.prototype.combine.call(main.prototype, indexManifest.tabs.sort(), mainSheet, arrTabsJson));
    res.should.eql(expected, 'it should combine the tabs from the spreadsheet into a single json file');
    // res.achievements.should.eql(expected.achievements, 'it should combine the tabs from the spreadsheet into a single json file');
    // res.biography.should.eql(expected.biography, 'it should combine the tabs from the spreadsheet into a single json file');
    // res.clients.should.eql(expected.clients, 'it should combine the tabs from the spreadsheet into a single json file');
    // res.contact.should.eql(expected.contact, 'it should combine the tabs from the spreadsheet into a single json file');
    // res.icons.should.eql(expected.icons, 'it should combine the tabs from the spreadsheet into a single json file');
    // res.projects.should.eql(expected.projects, 'it should combine the tabs from the spreadsheet into a single json file');
    // fs.writeFileSync('res.json', JSON.stringify(res));
    // fs.writeFileSync('expected.json', JSON.stringify(expected));
  });



});