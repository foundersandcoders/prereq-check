const tape = require('tape');
const nock = require('nock');

const { getGithubPage } = require('../model/github-page');

tape('getGithubPage with status code 404', (t) => {
  const url = 'https://dangerdak.github.io/effectivealtruisms/';
  nock('https://dangerdak.github.io')
    .get('/effectivealtruisms')
    .reply(404);
  getGithubPage(url)
    .then((githubObj) => {
      t.notOk(githubObj.success, 'Returns object with success false');
      t.equal(githubObj.statusCode, 404, 'Returns object with correct statusCode');
      t.end();
    });
});

tape('getGithubPage with status code 200', (t) => {
  const url = 'https://dangerdak.github.io/effectivealtruism';
  nock('https://dangerdak.github.io')
    .get('/effectivealtruism')
    .reply(200);
  getGithubPage(url)
    .then((githubObj) => {
      t.equal(githubObj.url, url,  'Returns object with correct url value');
      t.ok(githubObj.success, 'Returns object with success true');
      t.end();
    });
});

tape('getGithubPage not entered', (t) => {
  const url = '';
  getGithubPage(url)
    .then((githubObj) => {
      t.notOk(githubObj.success, 'Returns object with success false');
      t.equal(githubObj.message, 'No page entered', 'Returns object with correct message');
      t.end();
    });
});
