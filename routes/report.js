const request = require('request');
const rp = require('request-promise-native')

const { getCodewars } = require("../model/codewars-api");
const { getFreeCodeCamp } = require("../model/freecodecamp-crawl");
const { getGithubPage } = require('../model/github-page');
const { getW3Validator } = require('../model/w3-validator');

const displayReport = (req, res) => {
  Promise.all([getCodewars('astroash'), getFreeCodeCamp('astroash'), getGithubPage('http://www.astroash.com/'), getW3Validator('http://www.astroash.com/')])
    .then((values) => {
      const summaryObject = {};
      summaryObject.codewars = values[0];
      summaryObject.freeCodeCamp = values[1];
      summaryObject.githubPage = values[2];
      summaryObject.w3Validation = values[3];
      // and now render the page
      res.render('report', summaryObject);
    });
};

module.exports = displayReport;
