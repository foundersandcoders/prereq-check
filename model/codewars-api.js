const request = require('request');
const rp = require('request-promise-native')

const getKyu = (body) => {
  const codewarsRank = body.ranks.languages.javascript.rank;
  return Math.abs(codewarsRank);
};

const getCodewars = (username) => {
  const options = {
    uri: 'https://www.codewars.com/api/v1/users/',
    json: true, // Automatically parses the JSON string in the response
  };
  options.uri += username;
  return rp(options)
    .then((apiRes) => {
      const codewarsObj = {};
      codewarsObj.success = true;
      codewarsObj.kyu = getKyu(apiRes);
      codewarsObj.achieved5Kyu = getKyu(apiRes) <= 5;
      return codewarsObj;
    })
    .catch((err) => {
      console.error('Fetching codewars kyu failed');
      console.error(err);
      const codewarsObj = {};
      codewarsObj.success = false;
      codewarsObj.statusCode = err.statusCode;
      if (err.statusCode === 404) {
        codewarsObj.message = 'User not found';
      } else {
        codewarsObj.message = 'Error retrieving data';
      }
      return codewarsObj;
    });
};

module.exports = {
  getKyu,
  getCodewars,
};
