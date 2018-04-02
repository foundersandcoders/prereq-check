const rp = require('request-promise-native');

const {
  htmlCss,
  basicJavaScript,
  oOFunctionalProgramming,
  basicScripting,
} = require('./freecodecamp-arrays');

const fccSectionValidator = (htmlString, fccArray) => fccArray.every(element =>
  htmlString.indexOf(element) !== -1);

const getFccScore = (htmlString) => {
  const regEx = /text-primary">\[ (\d+)/;
  return regEx.exec(htmlString)[1];
};

const getFreeCodeCamp = (username) => {
  const options = {
    uri: `https://www.freecodecamp.org/${username}`,
  };
  return rp(options)
    .then((htmlString) => {
      const reg = new RegExp(username, 'gi');
      if (!htmlString.match(reg)) {
        throw Error('User not found');
      } else {
        const freeCodeCampObj = {
          success: true,
          score: getFccScore(htmlString),
          htmlCss: fccSectionValidator(htmlString, htmlCss),
          basicJavaScript: fccSectionValidator(htmlString, basicJavaScript),
          oOFunctionalProgramming: fccSectionValidator(htmlString, oOFunctionalProgramming),
          basicScripting: fccSectionValidator(htmlString, basicScripting),
          handle: username,
        };
        freeCodeCampObj.complete = freeCodeCampObj.htmlCss && freeCodeCampObj.basicJavaScript
          && freeCodeCampObj.oOFunctionalProgramming && freeCodeCampObj.basicScripting;
        return freeCodeCampObj;
      }
    })
    .catch((err) => {
      console.error('Fetching FreeCodeCamp crawl failed');
      console.error(err);
      return {
        success: false,
        message: 'User not found',
      };
    });
};

module.exports = {
  fccSectionValidator,
  getFreeCodeCamp,
  getFccScore,
};
