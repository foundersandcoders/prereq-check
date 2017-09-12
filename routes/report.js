const request = require('request');
const rp = require('request-promise-native')

const { getCodewars, getAuthoredKatas } = require("../model/codewars-api");
const { getFreeCodeCamp } = require("../model/freecodecamp-crawl");
const { getGithubPage } = require('../model/github-page');

const displayReport = (req, res) => {
  Promise.all([getCodewars('dangerdak'), getFreeCodeCamp('astroashaaaa'), getGithubPage('http://www.astroash.com/'), getAuthoredKatas('dangerdak')])
    .then((values) => {
      const summaryObject = {};
      summaryObject.codewars = values[0];
      summaryObject.freeCodeCamp = values[1];
      summaryObject.githubPage = values[2];
      summaryObject.codewarsKatas = values[3];
      // and now render the page
      res.render('report', summaryObject);
    });
};

module.exports = displayReport;
