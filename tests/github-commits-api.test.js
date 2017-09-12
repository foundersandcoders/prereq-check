const tape = require('tape');
const nock = require('nock');
const { getGithubCommits, getRepoName } = require('../model/github-commits-api');
const githubResponseSuccess = require('./dummy-data/github-commits-api-success.json');

tape('getRepoName test', (t) => {
  const longUrl = 'https://bartbucknill.github.io/fac-application/';
  const shortUrl = 'https://bartbucknill.github.io';
  t.equal(getRepoName(longUrl), 'fac-application', 'Returns the repo name for non-user url');
  t.equal(getRepoName(shortUrl), 'bartbucknill.github.io', 'Returns the repo name for user url');
  t.end();
});

tape('getGithubCommits success', (t) => {
  nock('https://api.github.com/repos')
    .get('/bartbucknill/fac-application/commits')
    .reply(200, githubResponseSuccess);
  getGithubCommits('bartbucknill', 'https://bartbucknill.github.io/fac-application/')
    .then((actual) => {
      t.deepEqual(actual, { success: true, repos: 30 }, 'should return correct object');
      t.end();
    });
});

tape('getGithubCommits success', (t) => {
  nock('https://api.github.com/repos')
    .get('/bartbucknill/fac-applicationxxx/commits')
    .reply(404);
  getGithubCommits('bartbucknill', 'https://bartbucknill.github.io/fac-applicationxxx/')
    .then((actual) => {
      t.deepEqual(actual, { success: false, message: 'Fetching Github commit count failed' }, 'should return error object');
      t.end();
    });
});
