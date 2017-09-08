const request = require('request');
const rp = require('request-promise-native');

const fccArrays = require('./freecodecamp-arrays');

const htmlCssValidator = (htmlString) => {
  for (i = 0; i < fccArrays.htmlCss.length; i++) {
    if (htmlString.indexOf(fccArrays.htmlCss[i]) === -1) {
      return false;
      break;
    }
  }
  return true;
}

rp('https://www.freecodecamp.org/fcce3abbd74-b40e-4e5d-96a8-c7e1992dcfe1')
  .then()
  .catch(function (err) {
    console.log("failed");
    });

module.exports = {
  htmlCssValidator,
}
