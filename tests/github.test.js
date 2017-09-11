const tape = require('tape');
const nock = require('nock');

const githubPageSuccess = require('./dummy-data/githubpage-success');
const { getGithubPage } = require('../model/github-page');

tape('Github page exists', (t) => {
    const url = 'https://dangerdak.github.io/effectivealtruisms/';
    nock('https://dangerdak.github.io')
    .get('/effectivealtruisms/')
    .reply(404);
    getGithubPage(url)
    .then((exists) => {
        t.notOk(false, 'getGithubPage returns false for 404 status code');
        t.end();
    });
});