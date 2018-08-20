const puppeteer = require('puppeteer');

const {
  html, css, responsive, flexbox, javascript, es6, basicDataStructures, basicAlgorithmScripting,
} = require('./freecodecamp-arrays');

const fccSectionValidator = (htmlString, fccArray) =>
  fccArray.every(element => htmlString.match(new RegExp(element, 'i')));

const getFccScore = (htmlString) => {
  const regEx = /points">([^\s]+)/;
  return regEx.exec(htmlString)[1];
};

const createFreeCodeCampObject = (htmlString, username) => {
  const reg = new RegExp(username, 'gi');
  if (!htmlString.match(reg)) {
    return {
      success: false,
      message: 'User not found',
    };
  }
  const freeCodeCampObj = {
    success: true,
    complete: true,
    score: getFccScore(htmlString),
    html: fccSectionValidator(htmlString, html),
    css: fccSectionValidator(htmlString, css),
    responsive: fccSectionValidator(htmlString, responsive),
    flexbox: fccSectionValidator(htmlString, flexbox),
    javascript: fccSectionValidator(htmlString, javascript),
    es6: fccSectionValidator(htmlString, es6),
    basicDataStructures: fccSectionValidator(htmlString, basicDataStructures),
    basicAlgorithmScripting: fccSectionValidator(htmlString, basicAlgorithmScripting),
    handle: username,
  };
  freeCodeCampObj.complete = freeCodeCampObj.html && freeCodeCampObj.css
    && freeCodeCampObj.responsive && freeCodeCampObj.flexbox
    && freeCodeCampObj.javascript && freeCodeCampObj.es6
    && freeCodeCampObj.basicDataStructures && freeCodeCampObj.basicAlgorithmScripting;
  return freeCodeCampObj;
};

const getFreeCodeCamp = async (username) => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.goto(`https://www.freecodecamp.org/${username}`, { waitUntil: 'networkidle0' });
    const htmlString = await page.content();
    browser.close();
    return createFreeCodeCampObject(htmlString, username);
  } catch (err) {
    browser.close();
    console.error('Fetching FreeCodeCamp crawl failed');
    console.error(err);
    const freeCodeCampObj = {};
    freeCodeCampObj.success = false;
    freeCodeCampObj.message = 'User not found';
    return freeCodeCampObj;
  }
};

module.exports = {
  fccSectionValidator,
  getFreeCodeCamp,
  getFccScore,
  createFreeCodeCampObject,
};
