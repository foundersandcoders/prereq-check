const tape = require('tape');
const nock = require('nock');
const path = require('path');

const fccFunctions = require('../model/freecodecamp-crawl');
const fccCompleteHtmlString = require('./dummy-data/freecodecamp-html-success');
const fccIncompleteHtmlString = require('./dummy-data/freecodecamp-html-fail');

tape('FCC Validation on HTML Page Crawls', (t) => {
  let actual = fccFunctions.htmlCssValidator(fccCompleteHtmlString);
  t.ok(actual, 'Returns true when HTML/CSS section is done on dummy success data');
  actual = fccFunctions.htmlCssValidator(fccIncompleteHtmlString);
  t.notok(actual, 'Returns false when HTML/CSS section is done on dummy fail data');

  actual = fccFunctions.basicJavaScriptValidator(fccCompleteHtmlString);
  t.ok(actual, 'Returns true when Basic JavaScript section is done on dummy success data');
  actual = fccFunctions.basicJavaScriptValidator(fccIncompleteHtmlString);
  t.notok(actual, 'Returns false when Basic JavaScript section is done on dummy fail data');

  actual = fccFunctions.oOFunctionalProgrammingValidator(fccCompleteHtmlString);
  t.ok(actual, 'Returns true when Object Oriented & Functional Programming section is done on dummy success data');
  actual = fccFunctions.oOFunctionalProgrammingValidator(fccIncompleteHtmlString);
  t.notok(actual, 'Returns false when Object Oriented & Functional Programming section is done on dummy fail data');

  actual = fccFunctions.basicScriptingValidator(fccCompleteHtmlString);
  t.ok(actual, 'Returns true when Basic Algorithm Scripting section is done on dummy success data');
  actual = fccFunctions.basicScriptingValidator(fccIncompleteHtmlString);
  t.notok(actual, 'Returns false when Basic Algorithm Scripting section is done on dummy fail data');
  t.end();
});

tape('FCC Crawl: getFreeCodeCamp valid username', (t) => {
  nock('https://www.freecodecamp.org/')
    .get('/astroash')
    .reply(200, fccCompleteHtmlString);
  fccFunctions.getFreeCodeCamp('astroash')
    .then((actual) => {
      t.deepEqual(actual, {
        success: true,
        score: '289',
        htmlCss: true,
        basicJavaScript: true,
        oOFunctionalProgramming: true,
        basicScripting: true,
        complete: true,
      }, 'getFreeCodeCamp returns an obect for a valid username');
      t.end();
    });
});

tape('FCC Crawl: getFreeCodeCamp invalid username', (t) => {
  nock('https://www.freecodecamp.org/')
    .get('/astroashaaa')
    .reply(200, fccIncompleteHtmlString);
  fccFunctions.getFreeCodeCamp('astroash')
    .then((actual) => {
      t.deepEqual(actual, {
        success: false,
        message: 'User not found',
      }, 'getFreeCodeCamp returns an obect for a invalid username');
      t.end();
    });
});
