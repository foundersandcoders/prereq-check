const tape = require('tape');
const nock = require('nock');
const request = require('supertest');
const app = require('../app');
const { isInTeam } = require('../routes/github-auth');

const notInTeamData = [
  {
    name: 'test-team-1',
    id: 9898,
  },
  {
    name: 'test-team-2',
    id: 878783,
  },
];
const isInTeamData = [
  {
    name: 'test-team-1',
    id: 9898,
  },
  {
    name: process.env.AUTHORISED_TEAM_NAME,
    id: JSON.parse(process.env.AUTHORISED_TEAM_ID),
  },
];

tape('Test isInTeam pure function', (t) => {
  t.equal(isInTeam(isInTeamData), true, 'If user is in the team should return true');
  t.equal(isInTeam(notInTeamData), false, 'If user is not in the team should return false');
  t.end();
});

tape('Test githubAuth: success case', (t) => {
  nock('https://github.com/login/oauth/access_token')
    .get(/.*/)
    .reply(200, { access_token: 'token' });

  nock('https://api.github.com/user')
    .get(/.*/)
    .reply(200, { login: 'astroash' });

  nock('https://api.github.com/teams')
    .get(/.*/)
    .reply(200, [{ name: 'wrong-team', id: 0000, }]);

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
