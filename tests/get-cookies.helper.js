const request = require('supertest');
const nock = require('nock');
const app = require('../app');

// getCookies uses the github-auth module to get a valid session/cookie.
// Steps:
// request to /auth:  /auth?code=3aa491426dc2f4130a6b
// intercept outgoing call to:    https://github.com/login/oauth/access_token
// respond with { access_token: 'token'}
// intercept outgoing call to:   https://api.github.com/user
// respond with object { login: 'ghusername' }
// intercept outgoing call to: https://api.github.com/teams/*
// respond with respond with 200 and array of team members containing the ghHandle arg (to grant this user team member privileges) if isInTeam === true, else respond with 400
// grab cookie and set on request to restricted route

const getCookies = (ghHandle, isInTeam, cb) => {
  nock('https://github.com/login/oauth/access_token')
    .get(/.*/)
    .reply(200, { access_token: 'token' });

  nock('https://api.github.com/user')
    .get(/.*/)
    .reply(200, { login: ghHandle });

  nock('https://api.github.com/teams')
    .get(/.*/)
    .reply(() => {
      if (isInTeam) {
        return [
          200,
          [
            {
              login: ghHandle,
            },
          ],
        ];
      }
      return [400];
    });

  request(app)
    .get('/auth?code=3aa491426dc2f4130a6b')
    .end((err, res) => {
      if (err) {
        console.error('error in getCookies: ', err);
        return;
      }
      cb(res.headers['set-cookie']); //
    });
};

module.exports = getCookies;
