const tape = require('tape');
const nock = require('nock');
const request = require('supertest');
const app = require('../app');

tape('Test githubAuth: success case', (t) => {
  nock('https://github.com/login/oauth/access_token')
    .get(/.*/)
    .reply(200, { access_token: 'token' });

  nock('https://api.github.com/user')
    .get(/.*/)
    .reply(200, { login: 'astroash' });

  request(app)
    .get('/auth?code=3aa491426dc2f4130a6b')
    .end((err, res) => {
      t.equal(res.statusCode, 302, 'Status code should be 302');
      t.equal(res.headers['set-cookie'].length, 2, 'Should have 2 cookies');
      t.end();
    });
});


tape('Test githubAuth: failure case', (t) => {

  request(app)
    .get('/auth')
    .end((err, res) => {
      t.equal(res.statusCode, 302, 'Status code should be 302');
      t.ok(!res.headers['set-cookie'], 'Should not have cookies');
      t.end();
    });
});
