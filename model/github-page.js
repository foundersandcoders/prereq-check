const rp = require('request-promise-native');

const getGithubPage = (url) => {
  const options = {
    uri: url,
    resolveWithFullResponse: true,
  };
  return rp(options)
  .then((response) => {
    return response.statusCode === 200;
  })
  .catch((err) => {
    console.error('Fetching GitHub page failed');
    console.error(err);
    return err;
  });
};

module.exports = { getGithubPage };