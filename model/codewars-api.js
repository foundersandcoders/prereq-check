const request = require('request');
const rp = require('request-promise-native')

// const getKyu = (username, cb) => {
//     const apiUrl = 'https://www.codewars.com/api/v1/users/' + username;
//     request(apiUrl, (error, response, body) => {
//         if (error) {
//             cb(error);
//         } else if (!error && response.statusCode === 200) {
//             const codewarsSuccess = {};
//             const codewarsRank = JSON.parse(body).ranks.languages.javascript.rank;
//             codewarsSuccess.success= true;
//             codewarsSuccess.rank = Math.abs(codewarsRank);
//             cb(null, codewarsSuccess);
//         } else {
//             const codewarsError = {};
//             codewarsError.success = false;
//             codewarsError.statusCode = response.statusCode;
//             codewarsError.body = JSON.parse(body);
//             cb(null, codewarsError);
//         }
//     });
// };

const options = {
    uri: 'https://www.codewars.com/api/v1/users/astroash',
    json: true, // Automatically parses the JSON string in the response
    resolveWithFullResponse: true
};

const getKyu = (response, body) => {
        if (response.statusCode === 200) {
            const codewarsSuccess = {};
            const codewarsRank = response.body.ranks.languages.javascript.rank;
            codewarsSuccess.success= true;
            codewarsSuccess.rank = Math.abs(codewarsRank);
            console.log(codewarsSuccess)
            return codewarsSuccess;
        } else {
            const codewarsError = {};
            codewarsError.success = false;
            codewarsError.statusCode = response.statusCode;
            codewarsError.body = body;
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