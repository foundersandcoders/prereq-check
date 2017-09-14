const { getCodewars, getAuthoredKatas, appendKataCompletions } = require("../model/codewars-api");
const { getFreeCodeCamp } = require("../model/freecodecamp-crawl");
const { getGithubPage } = require('../model/github-page');
const { getW3Validator } = require('../model/w3-validator');
const { getGithubRepos } = require('../model/github-repo-api');
const { getGithubCommits } = require('../model/github-commits-api');

const isEmpty = obj => Object.keys(obj).length === 0;
const displayReport = (req, res) => {
  if(isEmpty(req.query)) {
    return res.redirect('/links');
  }
  const { githubPage, fccHandle, cwHandle, ghHandle } = req.query;
  Promise.all([
    getCodewars(cwHandle),
    getFreeCodeCamp(fccHandle),
    getGithubPage(githubPage),
    getW3Validator(githubPage),
    getGithubRepos(ghHandle),
    getGithubCommits(ghHandle, githubPage),
    getAuthoredKatas(cwHandle).then(appendKataCompletions)
      .catch((err) => {
        console.error('Fetching Promise.all Kata completions');
      })])
    .then((values) => {
      const summaryObject = {};
      [summaryObject.codewars,
        summaryObject.freeCodeCamp,
        summaryObject.githubPage,
        summaryObject.w3Validation,
        summaryObject.githubRepos,
        summaryObject.githubCommits,
        summaryObject.codewarsKatas] = values;
      summaryObject.githubHandle = ghHandle;
      res.render('report', summaryObject);
    })
    .catch((err) => {
      console.error('Danger, danger: Report Promise.all errored!');
    });
};

module.exports = displayReport;
