const getKyu = require("../model/codewars-api");

const displayReport = (req, res) => {
    const summaryObject = {};
    getKyu("astroash", (error, apiResponse) => {
        summaryObject.codewarsKyu = apiResponse.success && apiResponse.rank >= 5;
        res.render('report', summaryObject);
        console.log(summaryObject)
    });
};

module.exports = displayReport;