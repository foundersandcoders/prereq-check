const tape = require('tape');
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
