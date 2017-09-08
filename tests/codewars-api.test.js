const tape = require("tape");
const { getKyu, getCodewars } = require('../model/codewars-api');
const codewarsSuccessData = require("./dummy-data/codewars-response-success.json");
const nock = require('nock');
const path = require('path');
const supertest = require('supertest');
const app = require('../app');
//const codewarsFailData = require("./dummy-data/codewars-response-fail.json");


tape('Codewars API: getKyu', (t) => {
  const actual = typeof getKyu(codewarsSuccessData);
  t.equal(actual, 'number', 'Kyu rank should be a number');
  t.end();
});

tape('Codewars API: getCodewars', (t) => {
  nock('https://www.codewars.com/') 
  .get('/api/v1/users/astroash')
  .replyWithFile(200, path.join(__dirname, 'dummy-data', 'codewars-response-success.json'));
  getCodewars('astroash')
  .then((kyu) => {
    t.equal(kyu, 5, 'getCodewars for valid username returns correct kyu (5)');
    t.end();
  });
});