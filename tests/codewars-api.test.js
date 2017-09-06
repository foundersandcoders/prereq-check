const tape = require("tape");
const getKyu = require('../model/codewars-api');

tape('Codewars API: getKyu', (t) => {
    getKyu('astroash', (error, actualRank) => {
        t.equal(typeof actualRank.rank, 'number', 'Kyu rank should be a number');
        t.end(); 
   });
});

tape('Codewars API: getKyu for unknown user', (t) => {
    getKyu('wtfthisisnotanyonesusername', (error, codewarsError) => {
        t.equal(codewarsError.statusCode, 404, 'Unknown user will return a 404 error code');
        t.end(); 
   });
});