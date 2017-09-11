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
    .then(getKyu)
    .catch((err) => {
      console.error('Fetching codewars kyu failed');
      console.error(err);
      return err;
    });
};

module.exports = {
  getKyu,
  getCodewars,
};
