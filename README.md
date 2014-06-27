# google-docs-cms

Google docs is your CMS!

- Creates a JSON object of your google spreadsheet.
- Combines all tabs together with the main sheet into a single json object with the tab names as keys.
- Writes data to disc (optional).


## Install

```Shell
npm install -g google-docs-cms
```

## Usage


### CLI

```Shell
# print data to STDOUT
google-docs-cms 'spreadsheet-id'

# include second argument if want to write data to a file
google-docs-cms 'spreadsheet-id' 'path-to-write-data.json'
```

### JavaScript

```JavaScript
var googleDocsCms = require('google-docs-cms');

googleDocsCms({
  id: 'your-google-spreadsheet-id',
  outPath: path.join(where', 'to', 'write', 'data')
}, function(err, res) {
  console.log(res); // {tabNameOne: [{...}], tabNameTwo: [{...}]}
  console.log(require(path.join(where', 'to', 'write', 'data'))); // {tabNameOne: [{...}], tabNameTwo: [{...}]}
});

// also has a promise API
googleDocsCms({...}).then(function(res) {}, function(err), {});
```

## API

### Options {object}

### Options.id {string} (Required)
Google spreadsheet id

### Options.outPath {string} (Optional)
Path to the file that you want the data to be written to.



--------------------------------------------------------------------

## Tests

```Shell
npm install && npm test
```