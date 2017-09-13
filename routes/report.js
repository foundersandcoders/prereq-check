const { getCodewars, getAuthoredKatas, appendKataCompletions } = require("../model/codewars-api");
const { getFreeCodeCamp } = require("../model/freecodecamp-crawl");
const { getGithubPage } = require('../model/github-page');

const displayReport = (req, res) => {
  Promise.all([
    getCodewars('dangerdak'),
    getFreeCodeCamp('astroash'),
    getGithubPage('http://www.astroash.com/'),
    getAuthoredKatas('dangerdak').then(appendKataCompletions),
  ])
    .then((values) => {
      const summaryObject = {};
      [summaryObject.codewars,
        summaryObject.freeCodeCamp,
        summaryObject.githubPage,
        summaryObject.codewarsKatas] = [...values];
      res.render('report', summaryObject);
    });
};

module.exports = displayReport;
