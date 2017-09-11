const rp = require('request-promise-native')

const getKyu = (body) => {
  const codewarsRank = body.ranks.languages.javascript.rank;
  return Math.abs(codewarsRank);
};

const hasAuthored = (body) => {
  return body.codeChallenges.totalAuthored >= 1;
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
      codewarsObj.hasAuthored = hasAuthored(apiRes);
      return codewarsObj;
    })
    .catch((err) => {
      console.error('Fetching codewars info failed');
      //console.error(err);
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
  hasAuthored,
  getKyu,
  getCodewars,
};
