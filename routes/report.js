const { getCodewars, getAuthoredKatas, appendKataCompletions } = require("../model/codewars-api");
const { getFreeCodeCamp } = require("../model/freecodecamp-crawl");
const { getGithubPage } = require('../model/github-page');
const { getW3Validator } = require('../model/w3-validator');
const { getGithubRepos } = require('../model/github-repo-api');
const { getGithubCommits } = require('../model/github-commits-api');
//const getMeetupCount = require('../model/meetups');

const displayReport = (req, res) => {
  console.log('USER: ', req.session.user)
  const { githubPage, fccHandle, cwHandle, ghHandle } = req.query;
  //args to promises to be grabbed from request object
  Promise.all([
    getCodewars(cwHandle), 
    getFreeCodeCamp(fccHandle), 
    getGithubPage(githubPage), 
    getW3Validator(githubPage), 
    getGithubRepos(ghHandle), 
    getGithubCommits(ghHandle, githubPage),
    getAuthoredKatas(cwHandle).then(appendKataCompletions),
    // getMeetupCount(ghHandle)
    ])
    .then((values) => {
      const summaryObject = {};
      [summaryObject.codewars,
        summaryObject.freeCodeCamp,
        summaryObject.githubPage,
        summaryObject.w3Validation,
        summaryObject.githubRepos,
        summaryObject.githubCommits,
        summaryObject.codewarsKatas
        //summaryObject.meetups
        ] = values;
      summaryObject.githubHandle = ghHandle;
      res.render('report', summaryObject);
    });
};

module.exports = displayReport;
