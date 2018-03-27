const tape = require("tape");
const nock = require('nock');
const path = require('path');
const codewarsSuccessData = require("./dummy-data/codewars-response-success.json");
const kataOverview = require('./dummy-data/authored-kata-overview.json');

const {
  getKyu,
  hasAuthored,
  getCodewars,
  getAuthoredKatas,
  appendKataCompletions,
} = require('../model/codewars-api');

tape('Codewars API: getKyu', (t) => {
  const actual = typeof getKyu(codewarsSuccessData);
  t.equal(actual, 'number', 'Kyu rank should be a number');
  t.end();
});

tape('Codewars API: hasAuthored', (t) => {
  const kataArray = [kataOverview.data];
  const noKata = [];
  t.ok(hasAuthored(kataArray), 'hasAuthored returns true if user has authored 1 kata');
  t.notOk(hasAuthored(noKata), 'hasAuthored returns false if user has authored 0 kata');
  t.end();
});

tape('Codewars API: getAuthoredKatas', (t) => {
  const expected = [{
    success: true,
    id: '5884b6550785f7c58f000047',
    name: 'Organise duplicate numbers in list',
    rank: 6,
    beta: false,
    link: 'https://www.codewars.com/kata/5884b6550785f7c58f000047',
  }, {
    success: true,
    id: '58d64c8d14286ca558000083',
    name: 'Join command (simplified)',
    rank: 0,
    beta: true,
    link: 'https://www.codewars.com/kata/58d64c8d14286ca558000083',
  }];
  const username = 'testuser';
  nock('https://www.codewars.com/')
    .get(`/api/v1/users/${username}/code-challenges/authored/`)
    .replyWithFile(200, path.join(__dirname, 'dummy-data', 'authored-kata-overview.json'));
  getAuthoredKatas(username)
    .then((katas) => {
      t.deepEqual(katas, expected, 'Returns array of relevant kata data from api response');
      t.end();
    });
});

tape('Codewars API: appendKataCompletions', (t) => {
  const input = [{
    success: true,
    id: '5884b6550785f7c58f000047',
    name: 'Organise duplicate numbers in list',
    rank: 6,
    beta: false,
    link: 'https://www.codewars.com/kata/5884b6550785f7c58f000047',
  }];
  const expected = [{
    success: true,
    id: '5884b6550785f7c58f000047',
    name: 'Organise duplicate numbers in list',
    rank: 6,
    beta: false,
    link: 'https://www.codewars.com/kata/5884b6550785f7c58f000047',
    completions: 434,
  }];
  nock('https://www.codewars.com/')
    .get('/api/v1/code-challenges/5884b6550785f7c58f000047')
    .replyWithFile(200, path.join(__dirname, 'dummy-data', 'authored-kata-detail.json'));
  appendKataCompletions(input)
    .then((katas) => {
      t.deepEqual(katas, expected, 'Returns array of kata with completions key');
      t.end();
    });
});

tape('Codewars API: getCodewars valid username', (t) => {
  const username = 'astroash';
  const expected = {
    success: true,
    kyu: 5,
    achieved5Kyu: true,
    honor: 352,
    username,
  };
  nock('https://www.codewars.com/')
    .get(`/api/v1/users/${username}`)
    .replyWithFile(200, path.join(__dirname, 'dummy-data', 'codewars-response-success.json'))
    .get(`/api/v1/users/${username}/code-challenges/authored/`)
    .replyWithFile(200, path.join(__dirname, 'dummy-data', 'authored-kata-overview.json'));
  getCodewars(username)
    .then((actual) => {
      t.deepEqual(actual, expected, 'getCodewars for valid username returns correct object');
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
      t.deepEqual(
        response,
        {
          success: false,
          statusCode: 404,
          message: 'User not found',
        },
        'getCodewars for invalid username returns correct object',
      );
      t.end();
    });
});
