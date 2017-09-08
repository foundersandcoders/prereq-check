const tape = require('tape');
const fccFunctions = require('../model/freecodecamp-crawl');
const fccCompleteHtmlString = require('./dummy-data/freecodecamp-html-success');
const fccIncompleteHtmlString = require('./dummy-data/freecodecamp-html-fail');

tape('FCC Validation on HTML Page Crawls', (t) => {
  let actual = fccFunctions.htmlCssValidator(fccCompleteHtmlString);
  t.ok(actual, 'Returns true when HTML/CSS section is done on dummy success data');
  actual = fccFunctions.htmlCssValidator(fccIncompleteHtmlString);
  t.notok(actual, 'Returns false when HTML/CSS section is done on dummy fail data');
  t.end();
});
