const GoogleSpreadsheet = require('google-spreadsheet');
require('env2')('config.json');

const getMeetupCount = (githubHandle) => {
  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_KEY);

  const setAuth = new Promise((resolve, reject) => {
    const credsJson = {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    };
    doc.useServiceAccountAuth(credsJson, (err) => {
      if (err) reject(Error('Couldnt set authentication'));
      resolve();
    });
  });

  const getAttendance = () => new Promise((resolve, reject) => {
    // query google sheets api to get row where github handle matches 'githubHandle' argument
    // githubnameunique is the column name in google sheets
    doc.getRows(
      process.env.WORKSHEET_ID,
      {
        query: `githubnameunique=${githubHandle}`,
      },
      (err, rows) => {
        if (err) reject(Error('Couldnt get rows'));
        resolve({
          success: true,
          // countunique is the name of the column in google sheets
          count: rows[0] ? rows[0].countunique : 0,
          ghHandle: githubHandle,
        });
      },
    );
  });

  return setAuth
    .then(getAttendance)
    .then(console.log)
    .catch((err) => {
      console.error(err);
      return err;
    });
};

module.exports = getMeetupCount;
