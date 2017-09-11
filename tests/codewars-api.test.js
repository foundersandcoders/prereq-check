const tape = require("tape");
const { getKyu, hasAuthored, getCodewars } = require('../model/codewars-api');
const codewarsSuccessData = require("./dummy-data/codewars-response-success.json");
const nock = require('nock');
const path = require('path');

tape('Codewars API: getKyu', (t) => {
  const actual = typeof getKyu(codewarsSuccessData);
  t.equal(actual, 'number', 'Kyu rank should be a number');
  t.end();
});

tape('Codewars API: hasAuthored', (t) => {
  const noKata = {
    "codeChallenges": {
      "totalAuthored": 0
    }
  };
  t.ok(hasAuthored(codewarsSuccessData), 'hasAuthored returns true if user has authored 1 kata');
  t.notOk(hasAuthored(noKata), 'hasAuthored returns false if user has authored 0 kata');
  t.end();
});

tape('Codewars API: getCodewars valid username', (t) => {
  nock('https://www.codewars.com/')
    .get('/api/v1/users/astroash')
    .replyWithFile(200, path.join(__dirname, 'dummy-data', 'codewars-response-success.json'));
  getCodewars('astroash')
    .then((actual) => {
      t.deepEqual(actual, {
        success: true,
        kyu: 5,
        achieved5Kyu: true,
        hasAuthored: true,
      }, 'getCodewars for valid username returns correct object');
      t.end();
    });
});

tape('Codewars API: getCodewars invalid username', (t) => {
  const username = 'astroashaaa';
  nock('https://www.codewars.com/')
    .get(`/api/v1/users/${username}`)
    .replyWithFile(404, path.join(__dirname, 'dummy-data', 'codewars-response-fail.json'));
  getCodewars(username)
    .then((response) => {
      t.deepEqual(response, {
        success: false,
        statusCode: 404,
        message: 'User not found',
      }, 'getCodewars for invalid username returns correct object');
      t.end();
    });
});
