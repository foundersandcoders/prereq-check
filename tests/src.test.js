const test = require('tape');
const request = require('supertest');
const nock = require('nock');
const getCookies = require('./get-cookies.helper');

const app = require('../app');

test('Test home route', (t) => {
  request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.same(res.statusCode, 200, 'Status code is 200');
      t.error(err.Error, 'No error');
      t.end();
    });
});


test('Test /links', (t) => {
  request(app)
    .get('/links')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.same(res.statusCode, 200, 'Status code is 200');
      t.error(err.Error, 'No error');
      t.end();
    });
});

test('Test /links-validate', (t) => {
  request(app)
    .get('/links-validate')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.same(res.statusCode, 200, 'Status code is 200');
      t.error(err.Error, 'No error');
      t.end();
    });
});

test('Test /scrape-links', (t) => {
  request(app)
    .get('/scrape-links?githubPage=astroash.github.io')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.same(res.statusCode, 200, 'Status code is 200');
      t.error(err.Error, 'No error');
      t.end();
    });
});

test('Test /report', (t) => {
  request(app)
    .get('/report')
    .expect(302)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.same(res.statusCode, 302, '/report without querystring redirects');
      t.error(err.Error, 'No error');
      t.end();
    });
});

test('Test /report', (t) => {
  nock('https://api.github.com/users')
    .get('/astroash')
    .reply(200);

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

  getCookies((cookies) => {
    request(app)
      .get('/report?githubPage=astroash.github.io&fccHandle=astroash&cwHandle=astroash&ghHandle=astroash')
      .set('Cookie', cookies)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        t.same(res.statusCode, 200, '/report with querystring returns 200');
        t.error(err.Error, 'No error');
        t.end();
      });
  });
});

test('Page not found error route', (t) => {
  request(app)
    .get('/wigwammyzzz')
    .expect(404)
    .expect('Content-Type', /text\/html/)
    .end((err, res) => {
      t.same(res.statusCode, 404, 'Status code is 404');
      t.ok(res.text.includes(res.statusCode), 'Rendered page contains status code');
      t.end();
    });
});
