const tape = require('tape');
const nock = require('nock');

const {
  htmlCss,
  basicJavaScript,
  oOFunctionalProgramming,
  basicScripting,
} = require('../model/freecodecamp-arrays');
const { fccSectionValidator, getFreeCodeCamp, getFccScore } = require('../model/freecodecamp-crawl');
const fccCompleteHtmlString = require('./dummy-data/freecodecamp-html-success');
const fccIncompleteHtmlString = require('./dummy-data/freecodecamp-html-fail');

tape('Get FCC Score', (t) => {
  const actual = getFccScore(fccCompleteHtmlString);
  t.equal(actual, '289', 'Function should return the FCC score from page scrape');
  t.end();
});

tape('FCC Validation on HTML Page Crawls', (t) => {
  let actual = fccSectionValidator(fccCompleteHtmlString, htmlCss);
  t.ok(actual, 'Returns true when HTML/CSS section is done on dummy success data');
  actual = fccSectionValidator(fccIncompleteHtmlString, htmlCss);
  t.notok(actual, 'Returns false when HTML/CSS section is done on dummy fail data');

  actual = fccSectionValidator(fccCompleteHtmlString, basicJavaScript);
  t.ok(actual, 'Returns true when Basic JavaScript section is done on dummy success data');
  actual = fccSectionValidator(fccIncompleteHtmlString, basicJavaScript);
  t.notok(actual, 'Returns false when Basic JavaScript section is done on dummy fail data');

  actual = fccSectionValidator(fccCompleteHtmlString, oOFunctionalProgramming);
  t.ok(actual, 'Returns true when Object Oriented & Functional Programming section is done on dummy success data');
  actual = fccSectionValidator(fccIncompleteHtmlString, oOFunctionalProgramming);
  t.notok(actual, 'Returns false when Object Oriented & Functional Programming section is done on dummy fail data');

  actual = fccSectionValidator(fccCompleteHtmlString, basicScripting);
  t.ok(actual, 'Returns true when Basic Algorithm Scripting section is done on dummy success data');
  actual = fccSectionValidator(fccIncompleteHtmlString, basicScripting);
  t.notok(actual, 'Returns false when Basic Algorithm Scripting section is done on dummy fail data');
  t.end();
});

tape('FCC Crawl: getFreeCodeCamp valid username', (t) => {
  nock('https://www.freecodecamp.org/')
    .get('/astroash')
    .reply(200, fccCompleteHtmlString);
  getFreeCodeCamp('astroash')
    .then((actual) => {
      t.deepEqual(actual, {
        success: true,
        score: '289',
        htmlCss: true,
        basicJavaScript: true,
        oOFunctionalProgramming: true,
        basicScripting: true,
        complete: true,
        handle: 'astroash'
      }, 'getFreeCodeCamp returns an obect for a valid username');
      t.end();
    });
});

tape('FCC Crawl: getFreeCodeCamp invalid username', (t) => {
  nock('https://www.freecodecamp.org/')
    .get('/astroashaaa')
    .reply(200, fccIncompleteHtmlString);
  getFreeCodeCamp('astroash')
    .then((actual) => {
      t.deepEqual(actual, {
        success: false,
        message: 'User not found',
      }, 'getFreeCodeCamp returns an obect for a invalid username');
      t.end();
    });
});
