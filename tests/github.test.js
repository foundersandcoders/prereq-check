const tape = require('tape');
const nock = require('nock');

const githubPageSuccess = require('./dummy-data/githubpage-success');
const { getGithubPage } = require('../model/github-page');

tape('getGithubPage with status code 404', (t) => {
    const url = 'https://dangerdak.github.io/effectivealtruisms/';
    nock('https://dangerdak.github.io')
    .get('/effectivealtruisms/')
    .reply(404);
    getGithubPage(url)
    .then((githubObj) => {
        t.notOk(githubObj.success, 'Returns object with success false');
        t.equals(githubObj.message, 'Page not found', 'Returns object with correct message');
        t.end();
    });
});

tape('getGithubPage with status code 200', (t) => {
    const url = 'https://dangerdak.github.io/effectivealtruism/';
    nock('https://dangerdak.github.io')
    .get('/effectivealtruism/')
    .reply(200);
    getGithubPage(url)
    .then((githubObj) => {
        t.ok(githubObj.success, 'Returns object with success true');
        t.end();
    });
});