const rp = require('request-promise-native');

const fccArrays = require('./freecodecamp-arrays');

const htmlCssValidator = (htmlString) => {
  return fccArrays.htmlCss.every(element => htmlString.indexOf(element) !== -1);
};

const basicJavaScriptValidator = (htmlString) => {
  return fccArrays.basicJavaScript.every(element => htmlString.indexOf(element) !== -1);
};

const oOFunctionalProgrammingValidator = (htmlString) => {
  return fccArrays.oOFunctionalProgramming.every(element => htmlString.indexOf(element) !== -1);
};

const basicScriptingValidator = (htmlString) => {
  return fccArrays.basicScripting.every(element => htmlString.indexOf(element) !== -1);
};

const getFccScore = (htmlString) => {
  const regEx = /text-primary\">\[ (\d+)/;
  return regEx.exec(htmlString)[1];
};

const getFreeCodeCamp = (username) => {
  const options = {
    uri: `https://www.freecodecamp.org/${username}`,
  }
  return rp(options)
    .then((htmlString) => {
      const reg = new RegExp(username, 'gi');
      if (!htmlString.match(reg)) {
        throw Error('User not found');
      } else {
        const freeCodeCampObj = {};
        freeCodeCampObj.success = true;
        freeCodeCampObj.score = getFccScore(htmlString);
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
      // console.error(err);
      const freeCodeCampObj = {};
      freeCodeCampObj.success = false;
      freeCodeCampObj.message = 'User not found';
      return freeCodeCampObj;
    });
};

module.exports = {
  htmlCssValidator,
  basicJavaScriptValidator,
  oOFunctionalProgrammingValidator,
  basicScriptingValidator,
  getFreeCodeCamp,
};
