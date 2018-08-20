const tape = require('tape');

const {
  html, css, responsive, flexbox, javascript, es6, basicDataStructures, basicAlgorithmScripting,
} = require('../model/freecodecamp-arrays');
const { fccSectionValidator, createFreeCodeCampObject, getFccScore } = require('../model/freecodecamp-crawl');
const fccCompleteHtmlString = require('./dummy-data/freecodecamp-html-success');
const fccIncompleteHtmlString = require('./dummy-data/freecodecamp-html-fail');

tape('Get FCC Score', (t) => {
  const actual = getFccScore(fccCompleteHtmlString);
  t.equal(actual, '293', 'Function should return the FCC score from page scrape');
  t.end();
});

tape('FCC Validation on HTML Page Crawls', (t) => {
  let actual = fccSectionValidator(fccCompleteHtmlString, html);
  t.ok(actual, 'Returns true when html section is done on dummy success data');
  actual = fccSectionValidator(fccIncompleteHtmlString, html);
  t.notok(actual, 'Returns false when html section is done on dummy fail data');

  actual = fccSectionValidator(fccCompleteHtmlString, css);
  t.ok(actual, 'Returns true when CSS section is done on dummy success data');
  actual = fccSectionValidator(fccIncompleteHtmlString, css);
  t.notok(actual, 'Returns false when CSS section is done on dummy fail data');

  actual = fccSectionValidator(fccCompleteHtmlString, responsive);
  t.ok(actual, 'Returns true when responsive section is done on dummy success data');
  actual = fccSectionValidator(fccIncompleteHtmlString, responsive);
  t.notok(actual, 'Returns false when responsive section is done on dummy fail data');

  actual = fccSectionValidator(fccCompleteHtmlString, flexbox);
  t.ok(actual, 'Returns true when flexbox section is done on dummy success data');
  actual = fccSectionValidator(fccIncompleteHtmlString, flexbox);
  t.notok(actual, 'Returns false when flexbox section is done on dummy fail data');

  actual = fccSectionValidator(fccCompleteHtmlString, javascript);
  t.ok(actual, 'Returns true when javascript section is done on dummy success data');
  actual = fccSectionValidator(fccIncompleteHtmlString, javascript);
  t.notok(actual, 'Returns false when javascript section is done on dummy fail data');

  actual = fccSectionValidator(fccCompleteHtmlString, es6);
  t.ok(actual, 'Returns true when es6 section is done on dummy success data');
  actual = fccSectionValidator(fccIncompleteHtmlString, es6);
  t.notok(actual, 'Returns false when es6 section is done on dummy fail data');

  actual = fccSectionValidator(fccCompleteHtmlString, basicAlgorithmScripting);
  t.ok(actual, 'Returns true when Basic Algorithm Scripting section is done on dummy success data');
  actual = fccSectionValidator(fccIncompleteHtmlString, basicAlgorithmScripting);
  t.notok(actual, 'Returns false when Basic Algorithm Scripting section is done on dummy fail data');

  actual = fccSectionValidator(fccCompleteHtmlString, basicDataStructures);
  t.ok(actual, 'Returns true when Basic Data Structures section is done on dummy success data');
  actual = fccSectionValidator(fccIncompleteHtmlString, basicDataStructures);
  t.notok(actual, 'Returns false when Basic Data Structures section is done on dummy fail data');
  t.end();
});

tape('FCC Crawl: getFreeCodeCamp valid username', (t) => {
  const actual = createFreeCodeCampObject(fccCompleteHtmlString, 'astroash');
  t.deepEqual(actual, {
    success: true,
    complete: true,
    score: '293',
    html: true,
    css: true,
    responsive: true,
    flexbox: true,
    javascript: true,
    es6: true,
    basicDataStructures: true,
    basicAlgorithmScripting: true,
    handle: 'astroash',
  }, 'getFreeCodeCamp returns an obect for a valid username');
  t.end();
});

tape('FCC Crawl: getFreeCodeCamp invalid username', (t) => {
  const actual = createFreeCodeCampObject(fccIncompleteHtmlString, 'matthewdking');
  t.deepEqual(actual, {
    success: false,
    message: 'User not found',
  }, 'getFreeCodeCamp returns an obect for a invalid username');
  t.end();
});

