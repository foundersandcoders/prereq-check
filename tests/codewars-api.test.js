const tape = require("tape");
const { getKyu, getCodewars } = require('../model/codewars-api');
const codewarsSuccessData = require("./dummy-data/codewars-response-success.json");
//const codewarsFailData = require("./dummy-data/codewars-response-fail.json");

tape('Codewars API: getKyu', (t) => {
  const actual = typeof getKyu(codewarsSuccessData);
  t.equal(actual, 'number', 'Kyu rank should be a number');
  t.end();
});

//tape('Codewars API: getCodewars for unknown user', (t) => {
  //const actual = getCodewars(codewarsFailData).statusCode;
  //t.equal(actual, 404, 'Unknown user will return a 404 error code');
  //t.end();
//});
