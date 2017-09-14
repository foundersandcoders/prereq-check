const test = require('tape');
const request = require('supertest');
const nock = require('nock');

const app = require('../app');

test('Tape works test', (t) => {
  t.equal(1, 1, '1 should equal 1');
  t.end();
});

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
