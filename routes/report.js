const request = require('request');
const rp = require('request-promise-native')

const { getCodewars } = require("../model/codewars-api");
const { getFreeCodeCamp } = require("../model/freecodecamp-crawl");

const displayReport = (req, res) => {
  Promise.all([getCodewars(), getFreeCodeCamp()])
    .then((values) => {
      const summaryObject = {};
      summaryObject.codewars = values[0];
      summaryObject.freeCodeCamp = values[1];
      // and now render the page
      res.render('report', summaryObject);
    });
};

module.exports = displayReport;
