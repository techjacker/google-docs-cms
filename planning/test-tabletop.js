// 1HvEMxPVMfUml-tGgaaD0xjyKnpKykGY3gxGgBxSlaM8
var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1HvEMxPVMfUml-tGgaaD0xjyKnpKykGY3gxGgBxSlaM8&output=html';
var Tabletop = require('tabletop');

function init() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   simpleSheet: true } )
}

function showInfo(data, tabletop) {
  console.log(data);
  // [ { title: 'Andrew Griffiths',
  //   sections: 'home, biography, projects, clients, achievements, contact',
  //   showcase: '3, 2, 0',
  //   rowNumber: 1 } ]




  var icons = tabletop.sheets('icons');
  console.log("icons", icons);
// icons { column_names: [ 'name', 'link', 'photourl' ],
//   name: 'icons',
//   elements:
//    [ { name: 'email',
//        link: 'mailto:mail@andrewgriffithsonline.com',
//        photourl: '',
//        rowNumber: 1 },
//      { name: 'twitter',
//        link: 'http://twitter.com/techjacker',
//        photourl: '',
//        rowNumber: 2 } ],
//   raw:
//    { version: '1.0',
//      encoding: 'UTF-8',
//      feed:
//       { xmlns: 'http://www.w3.org/2005/Atom',
//         'xmlns$openSearch': 'http://a9.com/-/spec/opensearchrss/1.0/',
//         'xmlns$gsx': 'http://schemas.google.com/spreadsheets/2006/extended',
//         id: [Object],
//         updated: [Object],
//         category: [Object],
//         title: [Object],
//         link: [Object],
//         author: [Object],
//         'openSearch$totalResults': [Object],
//         'openSearch$startIndex': [Object],
//         entry: [Object] } } }



// }




init();