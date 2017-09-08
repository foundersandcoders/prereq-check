const request = require('request');
const rp = require('request-promise-native')

const options = {
  uri: 'https://www.codewars.com/api/v1/users/astroash',
  json: true, // Automatically parses the JSON string in the response
  resolveWithFullResponse: true,
};

const getKyu = (response) => {
  const codewarsRank = response.body.ranks.languages.javascript.rank;
  return Math.abs(codewarsRank);
};

const getCodewars = () => {
  return rp(options)
    .then(getKyu)
    .catch((err) => {
      throw err;
    });
};

module.exports = { getKyu, getCodewars };
