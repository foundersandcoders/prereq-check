const test = require('tape');
const request = require('supertest');
const nock = require('nock');

const app = require('../app');

test('Test /scrape-links endpoint with invalid URL', (t) => {
  nock('http://faccer.github.io')
    .get('/')
    .reply(404, {
      status: 404,
      message: 'This is a mocked response',
    });

  request(app)
    .get('/scrape-links?githubPage=faccer.github.io&submit=Submit')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.same(res.statusCode, 200, 'Status code is 200 as Error is caught for unknown page');
      t.ok(res.text.includes('Sorry this URL could not be found'), 'Error message is displayed on the front end to show URL could not be found');
      t.end();
    });
});

test('Test /scrape-links endpoint with valid URL', (t) => {
  nock('http://validuser.github.io')
    .get('/')
    .reply(200, 'github.com/usernamegh freecodecamp.org/usernamefcc codewars.com/users/usernamecw');

  request(app)
    .get('/scrape-links?githubPage=validuser.github.io&submit=Submit')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.same(res.statusCode, 200, 'Status code is 200');
      t.ok(res.text.includes('value="http://validuser.github.io"'), 'Html form populates with Github page url value');
      t.ok(res.text.includes('value="usernamefcc"'), 'Html form populates with freeCodeCamp username value');
      t.ok(res.text.includes('value="usernamecw"'), 'Html form populates with Codewars username value');
      t.ok(res.text.includes('value="usernamegh"'), 'Html form populates with Github username value');
      t.end();
    });
});
