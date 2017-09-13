const { getCodewars } = require("../model/codewars-api");
const { getFreeCodeCamp } = require("../model/freecodecamp-crawl");
const { getGithubPage } = require('../model/github-page');
const { getW3Validator } = require('../model/w3-validator');
const { getGithubRepos } = require('../model/github-repo-api');
const { getGithubCommits } = require('../model/github-commits-api');

const displayReport = (req, res) => {
  const { githubPage, fccHandle, cwHandle, ghHandle } = req.query;
  //args to promises to be grabbed from request object
  Promise.all([
    getCodewars(cwHandle), 
    getFreeCodeCamp(fccHandle), 
    getGithubPage(githubPage), 
    getW3Validator(githubPage), 
    getGithubRepos(ghHandle), 
    getGithubCommits(ghHandle, githubPage)])
    .then((values) => {
      const summaryObject = {};
      summaryObject.codewars = values[0];
      summaryObject.freeCodeCamp = values[1];
      summaryObject.githubPage = values[2];
      summaryObject.w3Validation = values[3];
      summaryObject.githubRepos = values[4];
      summaryObject.githubCommits = values[5];
      summaryObject.githubHandle = ghHandle; //need to grab from request object

      res.render('report', summaryObject);
    });
};

module.exports = displayReport;
