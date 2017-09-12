const rp = require('request-promise-native');

const getRepoName = (url) => {
  const newUrl = url.replace('https://', '');
  const reg = /[\w.]+\/([\w-]+)/;
  const repo = reg.exec(url);
  return repo ? repo[1] : newUrl;
};

const getGithubCommits = (githubHandle, url) => {
  const repo = getRepoName(url);
  const options = {
    uri: `https://api.github.com/repos/${githubHandle}/${repo}/commits`,
    headers: {
      'User-Agent': 'prereq-check',
    },
    json: true, // Automatically parses the JSON string in the response
  };
  return rp(options)
    .then((apiRes) => {
      return {
        success: true,
        commits: apiRes.length,
      };
    })
    .catch((err) => {
      console.error('Get Github commit count failed');
      console.error(err);
      return {
        success: false,
        message: 'Fetching Github commit count failed',
      };
    });
};

module.exports = {
  getRepoName,
  getGithubCommits,
};
