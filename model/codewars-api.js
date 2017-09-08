const request = require('request');
const rp = require('request-promise-native')

const options = {
  uri: 'https://www.codewars.com/api/v1/users/',
  json: true, // Automatically parses the JSON string in the response
};

const getKyu = (body) => {
  console.log(JSON.stringify(body))
  const codewarsRank = body.ranks.languages.javascript.rank;
  return Math.abs(codewarsRank);
};

const getCodewars = (username) => {
  options.uri += 'astroash';
  return rp(options)
    .then(getKyu)
    .catch((err) => {
      throw err;
    });
};

module.exports = { getKyu, getCodewars };
