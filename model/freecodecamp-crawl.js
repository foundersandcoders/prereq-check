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

const getFreeCodeCamp = (username) => {
  username = 'astroashaaaa';
  const options = {
    uri: `https://www.freecodecamp.org/${username}`,
  }
  return rp(options)
    .then((htmlString) => {
      const reg = new RegExp(username, 'gi');
      if (htmlString.indexOf(reg) === -1) {
        throw Error('User not found');
      } else {
      const freeCodeCampObj = {};
      freeCodeCampObj.success = true;
      freeCodeCampObj.htmlCss = htmlCssValidator(htmlString);
      freeCodeCampObj.basicJavaScript = basicJavaScriptValidator(htmlString);
      freeCodeCampObj.oOFunctionalProgramming = oOFunctionalProgrammingValidator(htmlString);
      freeCodeCampObj.basicScripting = basicScriptingValidator(htmlString);
      freeCodeCampObj.complete = freeCodeCampObj.htmlCss && freeCodeCampObj.basicJavaScript && freeCodeCampObj.oOFunctionalProgramming && freeCodeCampObj.basicScripting;
      return freeCodeCampObj;
      }
    })
    .catch((err) => {
      console.error('Fetching FreeCodeCamp crawl failed');
      console.error(err);
      const freeCodeCampObj = {};
      freeCodeCampObj.success = false;
      freeCodeCampObj.statusCode = err.statusCode;
      if (err.statusCode === 404) {
        freeCodeCampObj.message = 'User not found';
      } else {
        freeCodeCampObj.message = 'Error retrieving data';
      }
      console.log(freeCodeCampObj)
      return freeCodeCampObj;
    });
}


module.exports = {
  // htmlCssValidator,
  // basicJavaScriptValidator,
  // oOFunctionalProgrammingValidator,
  // basicScriptingValidator,
  getFreeCodeCamp,
}
