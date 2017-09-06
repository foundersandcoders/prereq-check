const getKyu = require("../model/codewars-api");

const createSummaryObject = () => {
    const summaryObject = {};
    getKyu("astroash", (err, res) => {
        summaryObject.codewarsKyu = res.success && res.rank >= 5;
    });
};

module.exports = displayReport = (req, res) => {
  res.render('report', createSummaryObject());
};