const { getCodewars, getAuthoredKatas, appendKataCompletions } = require("../model/codewars-api");
const { getFreeCodeCamp } = require("../model/freecodecamp-crawl");
const { getGithubPage } = require('../model/github-page');
const { getW3Validator } = require('../model/w3-validator');
const { getGithubRepos } = require('../model/github-repo-api');
const { getGithubCommits } = require('../model/github-commits-api');

const displayReport = (req, res) => {
  //args to promises to be grabbed from request object
  Promise.all([
    getCodewars('astroash'),
    getFreeCodeCamp('astroash'),
    getGithubPage('http://www.astroash.com/'),
    getW3Validator('http://www.astroash.com/'),
    getGithubRepos('astroash'),
    getGithubCommits('bartbucknill', 'https://bartbucknill.github.io/fac-application/'),
    getAuthoredKatas('dangerdak').then(appendKataCompletions)])
    .then((values) => {
      const summaryObject = {};
      [summaryObject.codewars,
        summaryObject.freeCodeCamp,
        summaryObject.githubPage,
        summaryObject.w3Validation,
        summaryObject.githubRepos,
        summaryObject.githubCommits,
        summaryObject.codewarsKatas] = values;
      //need to grab from request object
      summaryObject.githubHandle = 'astroash';
      console.log(summaryObject);
      res.render('report', summaryObject);
    });
};

module.exports = displayReport;
