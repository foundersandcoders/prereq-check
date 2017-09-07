const request = require('request');
const rp = require('request-promise-native')

const options = {
    uri: 'https://www.codewars.com/api/v1/users/astroashdsfsd',
    //json: true, // Automatically parses the JSON string in the response
    resolveWithFullResponse: true
};

const getKyu = (response) => {
        if (response.statusCode === 200) {
            const codewarsSuccess = {};
            const codewarsRank = response.body.ranks.languages.javascript.rank;
            codewarsSuccess.success= true;
            codewarsSuccess.rank = Math.abs(codewarsRank);
            return codewarsSuccess;
        } else {
            const codewarsError = {};
            codewarsError.success = false;
            codewarsError.statusCode = response.statusCode;
            codewarsError.body = response.body;
            return codewarsError;
        }
};

rp(options)
    .then(getKyu)
    .catch(function (err) { 
        console.log(err);
    });

//getKyu('astroashf', console.log);

module.exports = getKyu;

