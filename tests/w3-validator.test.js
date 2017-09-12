const test = require('tape');
const nock = require('nock');
const { getNumberOfErrors, getW3Validator } = require('../model/w3-validator');
const w3ValidatorSuccessData = require('./dummy-data/w3-validator-success.json');
const path = require('path');

test('W3 Validator getNumberOfErrors', (t) => {
  const actual = getNumberOfErrors(w3ValidatorSuccessData.messages);
  t.equal(typeof actual, 'number', 'should return a number');
  t.equal(actual, 9, 'should return 9');
  t.end();
});

test('W3 Validator: getW3Validator success', (t) => {
  nock('http://validator.w3.org/nu')
    .get('/?doc=http://www.astroash.com/&out=json')
    .reply(200, w3ValidatorSuccessData);

  getW3Validator('http://www.astroash.com')
    .then((actual) => {
      t.deepEqual(actual, {
        success: true,
        errors: 9,
        other: 0,
        url: 'http://validator.w3.org/nu/?doc=http://www.astroash.com',
      }, 'returns correct object');
      t.end();
    });
});
