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
      console.log(values);
      console.log(summaryObject);
      // and now render the page
      res.render('report', summaryObject);
    });
};
//
// const displayReport = (req, res) => {
//   const summaryObject = {};
//   getCodewars()
//     .then((codewarsKyu) => {
//       summaryObject.codewarsKyu = codewarsKyu <= 5;
//       res.render('report', summaryObject);
//     })
//     .catch((err) => {
//       if (err.statusCode === 404) {
//         res.send('User not found');
//       } else {
//         res.send('API error');
//       }
//     });
// };

module.exports = displayReport;
