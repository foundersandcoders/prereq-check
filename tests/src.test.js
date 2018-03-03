const test = require('tape');
const request = require('supertest');
const nock = require('nock');
const getCookies = require('./get-cookies.helper');

const app = require('../app');

test('Test home route', (t) => {
  request(app)
    .get('/')
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.same(res.statusCode, 200, 'Status code is 200');
      t.error(err, 'No error');
      t.end();
    });
});


test('Test /links', (t) => {
  request(app)
    .get('/links')
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.same(res.statusCode, 200, 'Status code is 200');
      t.error(err, 'No error');
      t.end();
    });
});

test('Test /links-validate', (t) => {
  request(app)
    .get('/links-validate')
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.same(res.statusCode, 200, 'Status code is 200');
      t.error(err, 'No error');
      t.end();
    });
});

test('Test /scrape-links', (t) => {
  request(app)
    .get('/scrape-links?githubPage=astroash.github.io')
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.same(res.statusCode, 200, 'Status code is 200');
      t.error(err, 'No error');
      t.end();
    });
});

test('Test /report without querystring', (t) => {
  request(app)
    .get('/report')
    .expect('Content-Type', /text\/plain/)
    .end((err, res) => {
      t.same(res.statusCode, 302, 'Redirects');
      t.error(err, 'No error');
      t.end();
    });
});

test('Test /report with querystring, non team member requesting own report', (t) => {

  nock('https://api.github.com/repos')
    .get('/astroash.github.io')
    .reply(200);

  nock('https://www.codewars.com/')
    .get('/api/v1/users/astroash/code-challenges/authored/')
    .reply(200);

  nock('https://www.freecodecamp.org/')
    .get('/astroash')
    .reply(200);

  nock('https://api.github.com/repos')
    .get('/astroash.github.io/commits')
    .reply(200);

  nock('https://spreadsheets.google.com')
    .get('/feeds/list/1_GpdOSpwivXZRZcMzJvz25K6u4j9B7SuWgvqeSwB6tk/o1az7e0/private/full?sq=githubnameunique=astroash')
    .reply(404);

  getCookies('astroash', false, (cookies) => {
    request(app)
      .get('/report?githubPage=astroash.github.io&fccHandle=astroash&cwHandle=astroash&ghHandle=astroash')
      .set('Cookie', cookies)
      .expect('Content-Type', /text\/html/)
      .end((err, res) => {
        t.same(res.statusCode, 200, 'Responds with 200');
        t.error(err, 'No error');
        t.end();
      });
  });
});

test('Test /report with querystring, team member requesting other user\'s report', (t) => {

  nock('https://api.github.com/repos')
    .get('/astroash.github.io')
    .reply(200);

  nock('https://www.codewars.com/')
    .get('/api/v1/users/astroash/code-challenges/authored/')
    .reply(200);

  nock('https://www.freecodecamp.org/')
    .get('/astroash')
    .reply(200);

  nock('https://api.github.com/repos')
    .get('/astroash.github.io/commits')
    .reply(200);

  nock('https://spreadsheets.google.com')
    .get('/feeds/list/1_GpdOSpwivXZRZcMzJvz25K6u4j9B7SuWgvqeSwB6tk/o1az7e0/private/full?sq=githubnameunique=astroash')
    .reply(404);

  getCookies('dan', true, (cookies) => {
    request(app)
      .get('/report?githubPage=astroash.github.io&fccHandle=astroash&cwHandle=astroash&ghHandle=astroash')
      .set('Cookie', cookies)
      .expect('Content-Type', /text\/html/)
      .end((err, res) => {
        t.same(res.statusCode, 200, 'Responds with 200');
        t.error(err, 'No error');
        t.end();
      });
  });
});

test('Test /report with querystring, non-team member requesting other user\'s report', (t) => {

  getCookies('lucy', false, (cookies) => {
    request(app)
      .get('/report?githubPage=astroash.github.io&fccHandle=astroash&cwHandle=astroash&ghHandle=astroash')
      .set('Cookie', cookies)
      .end((err, res) => {
        t.same(res.statusCode, 302, 'Responds with 302');
        t.error(err, 'No error');
        t.end();
      });
  });
});

test('Page not found error route', (t) => {
  request(app)
    .get('/wigwammyzzz')
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.same(res.statusCode, 404, 'Status code is 404');
      t.ok(res.text.includes(res.statusCode), 'Rendered page contains status code');
      t.end();
    });
});
