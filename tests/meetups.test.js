const nock = require('nock');
const tape = require('tape');
const getMeetupCount = require('../model/meetups');
const { responseData, responseHeaders } = require('./dummy-data/meetups-googlesheet-success');

tape('getMeetupCount: failure case', (t) => {
  nock('https://spreadsheets.google.com')
    .get('/feeds/list/1_GpdOSpwivXZRZcMzJvz25K6u4j9B7SuWgvqeSwB6tk/o1az7e0/private/full?sq=githubnameunique=bartbucknill')
    .reply(404);
  getMeetupCount('bartbucknill')
    .then((actual) => {
      t.deepEqual(actual, { success: false, message: 'Unable to retrieve meetup data' }, 'should return correct object');
      t.end();
    });
});
