// docs: https://github.com/theoephraim/node-google-spreadsheet
const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');
require('env2')('config.json');

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_KEY);
let sheet;
let sheet_id;
//GET https://spreadsheets.google.com/feeds/list/key/worksheetId/private/full?sq=age>25%20and%20height<175

async.series([
  function setAuth(step) {
    const creds_json = {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    };
    doc.useServiceAccountAuth(creds_json, step);
  },
  function getInfoAndWorksheets(step) {
    doc.getInfo((err, info) => {
      // console.log(info)
      sheet = info.worksheets[0];
      // console.log(info.worksheets);
      step();
    });
  },
  function workingWithRows(step) {
    // google provides some query options
    sheet.getRows({
      // offset: 1,
      // limit: 20,
      // orderby: 'col2'
      query: 'githubnameunique=Jamiecoe'
    }, (err, rows) => {
      // console.log(`Read ${rows.length} rows`);
      console.log(rows[0].countunique, rows[0].githubnameunique);

      // the row is an object with keys set by the column headers
      // rows[0].colname = 'new val';
      // rows[0].save(); // this is async

      // // deleting a row
      // rows[0].del();  // this is async

      // step();
    });
  },
], (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  }
});
