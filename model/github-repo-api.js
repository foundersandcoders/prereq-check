const rp = require('request-promise-native');

const getGithubRepos = (username, token) => {
  const options = {
    uri: `https://api.github.com/users/${username}`,
    headers: {
      'User-Agent': 'prereqCheck',
    },
    json: true, // Automatically parses the JSON string in the response
  };
  options.uri += token ? `?access_token=${token}` : '';
  return rp(options)
    .then((apiRes) => {
      return {
        success: true,
        repos: apiRes.public_repos,
      };
    })
    .catch((err) => {
      console.error('Get Github Repos failed');
      console.error(err);
      return {
        success: false,
        message: 'Fetching Github repo count failed',
      };
    });
};

module.exports = {
  getGithubRepos,
};
