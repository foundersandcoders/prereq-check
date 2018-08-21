const fs = require('fs');
const _ = require('lodash');
const rp = require('request-promise-native');

//extracted from response to GET request to url:
//https://www.freecodecamp.org/services/map-ui
//see also how this is used on new FCC profile pages
// const fccChallenges = require('./freecodecamp-uimodel.json');

//these arrays specify FAC prereqs
const {
  html,
  css,
  responsive,
  flexbox,
  javascript,
  es6,
  basicDataStructures,
  basicAlgorithmScripting,
} = require('../model/freecodecamp-arrays');

const fccArray = [
  ...html,
  ...css,
  ...responsive,
  ...flexbox,
  ...javascript,
  ...es6,
  ...basicDataStructures,
  ...basicAlgorithmScripting,
];

/**
 * [HACK]
 * This script is to create a data structure that can be used in conjunction with
 * a request to https://www.freecodecamp.org/api/users/get-public-profile?username=[name]
 * in order to calculate how many of the FAC FCC prereqs a user has completed.
 * It is intended to be used to create a data structure which can then be stored.
 * If you are maintaining this, bear in mind that the api used is not public and so
 * may change without warning. Yes, this is all very hacky.
 *
 * It queries fcc api to obtain the list of challenges and data.
 * The reducer:
 * - Filters out challenges not included in FAC prereqs from input data (see above).
 * - Extracts useful info from those that are included to aid in figuring out which
 * FAC FCC prereq sections a user has completed.
 * Result is then written as JSON to a file.
 */
const iteratee = (result, value, key) => {
  if (_.includes(fccArray, value.title)) {
    const challengeId = value.id;
    result[challengeId] = {
      title: value.title,
      section: value.block,
    };
  }
  return result;
};

const runScript = async () => {
  const fccUiMap = await rp({
    uri: 'https://www.freecodecamp.org/services/map-ui',
    json: true
  });
  const fccChallenges = _.get(fccUiMap, 'entities.challenge');
  const idMap = _.reduce(fccChallenges, iteratee, {});
  fs.writeFileSync(`${__dirname}/result-id-map.json`, JSON.stringify(idMap));
  process.exit();
};

runScript();

