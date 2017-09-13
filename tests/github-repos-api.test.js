const tape = require('tape');
const nock = require('nock');
const { getGithubRepos } = require('../model/github-repo-api');
const githubResponseSuccess = require('./dummy-data/github-repos-api-success.json');

tape('getGithubRepos success', (t) => {
  nock('https://api.github.com/users')
    .get('/astroash')
    .reply(200, githubResponseSuccess);
  getGithubRepos('astroash')
    .then((actual) => {
      t.deepEqual(actual, { success: true, repos: 12 }, 'should return correct object');
      t.end();
    });
});

tape('getGithubRepos fail', (t) => {
  nock('https://api.github.com/users')
    .get('/astroashaaa')
    .reply(404);
  getGithubRepos('astroashaaa')
    .then((actual) => {
      t.deepEqual(actual, { success: false, message: 'Fetching Github repo count failed' }, 'should return correct object');
      t.end();
    });
});
