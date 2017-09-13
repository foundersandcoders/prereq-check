//docs: https://github.com/theoephraim/node-google-spreadsheet
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
require('env2')('config.json');

// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet(process.env.SPREADSHEET_KEY);
var sheet;

async.series([
  function setAuth(step) {
    var creds_json = {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    };
    doc.useServiceAccountAuth(creds_json, step);
  },
  function getInfoAndWorksheets(step) {
    doc.getInfo(function(err, info) {
      console.log('Loaded doc: '+info.title+' by '+info.author.email);
      sheet = info.worksheets[0];
      console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
      console.log(info.worksheets)
      step();
    });
  },
  function workingWithRows(step) {
    // google provides some query options
    sheet.getRows({
      // offset: 1,
      // limit: 20,
      // orderby: 'col2'
    }, function( err, rows ){
      console.log('Read '+rows.length+' rows');
      console.log(rows)
  
      // the row is an object with keys set by the column headers
      // rows[0].colname = 'new val';
      // rows[0].save(); // this is async

      // // deleting a row
      // rows[0].del();  // this is async

      // step();
    });
  },
], function(err){
    if( err ) {
      console.log('Error: '+err);
    }
});