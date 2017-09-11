const tape = require("tape");
const { getKyu, getCodewars } = require('../model/codewars-api');
const codewarsSuccessData = require("./dummy-data/codewars-response-success.json");
const nock = require('nock');
const path = require('path');

tape('Codewars API: getKyu', (t) => {
  const actual = typeof getKyu(codewarsSuccessData);
  t.equal(actual, 'number', 'Kyu rank should be a number');
  t.end();
});

tape('Codewars API: getCodewars valid username', (t) => {
  nock('https://www.codewars.com/') 
  .get('/api/v1/users/astroash')
  .replyWithFile(200, path.join(__dirname, 'dummy-data', 'codewars-response-success.json'));
  getCodewars('astroash')
  .then((kyu) => {
    t.equal(kyu, 5, 'getCodewars for valid username returns correct kyu (5)');
    t.end();
  });
});

tape('Codewars API: getCodewars invalid username', (t) => {
  const username = 'astroashaaa';
  nock('https://www.codewars.com/') 
  .get('/api/v1/users/' + username)
  .replyWithFile(404, path.join(__dirname, 'dummy-data', 'codewars-response-fail.json'));
  getCodewars(username)
  .then((response) => {
    t.equal(response.toString(),
    'StatusCodeError: 404 - "{ success: false, reason: \'not found\' }"',
    'Returns 404 error');
    t.end();
  });
});