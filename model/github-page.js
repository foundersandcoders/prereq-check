const rp = require('request-promise-native');
const normalizeUrl = require('normalize-url');

const getGithubPage = (url) => {
  const options = {
    uri: url ? normalizeUrl(url) : '',
    resolveWithFullResponse: true,
  };

  return rp(options)
    .then(() => {
      return {
        success: true,
        url: options.uri,
      };
    })
    .catch((err) => {
      console.error('Fetching GitHub page failed');
      console.error(err);
      const githubObj = {
        success: false,
        statusCode: err.statusCode,
      };
      if (err.statusCode === 404) {
        githubObj.message = 'Page not found';
      } else if (!err.url) {
        githubObj.message = 'No page entered';
      } else {
        githubObj.message = 'Error retrieving page';
      }
      return githubObj;
    });
};

module.exports = { getGithubPage };
