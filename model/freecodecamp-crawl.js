const request = require('request');
const rp = require('request-promise-native');

const fccArrays = require('./freecodecamp-arrays');

const htmlCssValidator = (htmlString) => {
  for (let i = 0; i < fccArrays.htmlCss.length; i++) {
    if (htmlString.indexOf(fccArrays.htmlCss[i]) === -1) {
      return false;
    }
  }
  return true;
};

const basicJavaScriptValidator = (htmlString) => {
  for (let i = 0; i < fccArrays.basicJavaScript.length; i++) {
    if (htmlString.indexOf(fccArrays.basicJavaScript[i]) === -1) {
      return false;
    }
  }
  return true;
};

const oOFunctionalProgrammingValidator = (htmlString) => {
  for (let i = 0; i < fccArrays.oOFunctionalProgramming.length; i++) {
    if (htmlString.indexOf(fccArrays.oOFunctionalProgramming[i]) === -1) {
      return false;
    }
  }
  return true;
};

const basicScriptingValidator = (htmlString) => {
  for (let i = 0; i < fccArrays.basicScripting.length; i++) {
    if (htmlString.indexOf(fccArrays.basicScripting[i]) === -1) {
      return false;
    }
  }
  return true;
};

rp('https://www.freecodecamp.org/fcce3abbd74-b40e-4e5d-96a8-c7e1992dcfe1')
  .then()
  .catch(function (err) {
    console.log("failed");
    });

module.exports = {
  htmlCssValidator,
  basicJavaScriptValidator,
  oOFunctionalProgrammingValidator,
  basicScriptingValidator,
}
