const { getCodewars } = require("../model/codewars-api");

const displayReport = (req, res) => {
  const summaryObject = {};
  getCodewars()
    .then((codewarsKyu) => {
      summaryObject.codewarsKyu = codewarsKyu <= 5;
      res.render('report', summaryObject);
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.send('User not found');
      } else {
        res.send('API error');
      }
    });
};

module.exports = displayReport;
