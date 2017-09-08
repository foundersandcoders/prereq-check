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

const getFreeCodeCamp = () => {
  return rp('https://www.freecodecamp.org/astroash')
    .then((htmlString) => {
      const freeCodeCampObj = {};
      freeCodeCampObj.htmlCss = htmlCssValidator(htmlString);
      freeCodeCampObj.basicJavaScript = basicJavaScriptValidator(htmlString);
      freeCodeCampObj.oOFunctionalProgramming = oOFunctionalProgrammingValidator(htmlString);
      freeCodeCampObj.basicScripting = basicScriptingValidator(htmlString);
      freeCodeCampObj.complete = freeCodeCampObj.htmlCss && freeCodeCampObj.basicJavaScript && freeCodeCampObj.oOFunctionalProgramming && freeCodeCampObj.basicScripting
      return freeCodeCampObj;
    })
    .catch((err) => {
      console.error('Fetching FreeCodeCamp crawl failed');
      console.error(err);
      return err;
    });
}


module.exports = {
  htmlCssValidator,
  basicJavaScriptValidator,
  oOFunctionalProgrammingValidator,
  basicScriptingValidator,
  getFreeCodeCamp,
}
