const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');
require('env2')('config.json');

const getMeetupCount = githubHandle => new Promise((resolve, reject) => {
  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_KEY);
  let sheet;
  async.series(
    [
      function setAuth(step) {
        const creds_json = {
          client_email: process.env.CLIENT_EMAIL,
          private_key: process.env.PRIVATE_KEY,
        };
        doc.useServiceAccountAuth(creds_json, step);
      },
      function getInfoAndWorksheets(step) {
        doc.getInfo((err, info) => {
          sheet = info.worksheets[0];
          step();
        });
      },
      function workingWithRows(step) {
        sheet.getRows(
          {
            query: `githubnameunique=${githubHandle}`,
          },
          (err, rows) => {
            resolve({
              success: true,
              count: rows[0] ? rows[0].countunique : 0,
              ghHandle: githubHandle,
            });
          },
        );
      },
    ],
    (err) => {
      if (err) {
        console.error('Error retrieving meetup data');
        // console.error(err);
        reject({
          success: false,
          message: 'Error retrieving meetup data',
        });
      }
    },
  );
});

module.exports = getMeetupCount;
