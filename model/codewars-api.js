const request = require('request');

const getKyu = (username, cb) => {
    const apiUrl = 'https://www.codewars.com/api/v1/users/' + username;
    request(apiUrl, (error, response, body) => {
        if (error) {
            cb(error);
        } else if (!error && response.statusCode === 200) {
            const codewarsSuccess = {};
            const codewarsRank = JSON.parse(body).ranks.languages.javascript.rank;
            codewarsSuccess.success= true;
            codewarsSuccess.rank = Math.abs(codewarsRank);
            cb(null, codewarsSuccess);
        } else {
            const codewarsError = {};
            codewarsError.success = false;
            codewarsError.statusCode = response.statusCode;
            codewarsError.body = JSON.parse(body);
            cb(null, codewarsError);
        }
    });
};

//getKyu('astroashf', console.log);

module.exports = getKyu;