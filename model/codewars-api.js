const rp = require('request-promise-native');

const getKyu = (body) => {
  const codewarsRank = body.ranks.languages.javascript.rank;
  return Math.abs(codewarsRank);
};

const hasAuthored = (kataArray) => {return kataArray.length >= 1};

const getAuthoredKatas = (username) => {
  const options = {
    uri: `https://www.codewars.com/api/v1/users/${username}/code-challenges/authored/`,
    json: true, // Automatically parses the JSON string in the response
  };
  return rp(options)
    .then((apiRes) => {
      return apiRes.data.reduce((ourKataArray, responseKataArray) => {
        const data = {
          success: true,
          id: responseKataArray.id,
          name: responseKataArray.name,
          link: `https://www.codewars.com/kata/${responseKataArray.id}`,
          rank: Math.abs(responseKataArray.rank),
          beta: responseKataArray.rank === null,
        };
        return [...ourKataArray, data];
      }, []);
    })
    .catch((err) => {
      console.error('Fetching authored katas failed');
      console.error(err);
      const codewarsObj = {
        success: false,
        statusCode: err.statusCode
      };
      if (err.statusCode === 404) {
        codewarsObj.message = 'User not found';
      } else {
        codewarsObj.message = 'Error retrieving data';
      }
      return codewarsObj;
    });
};

const appendKataCompletions = (katas) => {
  if (!Array.isArray(katas)) { return katas; }
  const completionPromises = katas.map((kata) => {
    const options = {
      uri: `https://www.codewars.com/api/v1/code-challenges/${kata.id}`,
      json: true, // Automatically parses the JSON string in the response
    };
    return rp(options)
      .then((kataDetail) => {
        return kataDetail.totalCompleted;
      })
      .catch((err) => {
        console.error('Fetching codewars kata completions');
        console.error(err);
        return null;
      });
  });
  return Promise.all(completionPromises)
    .then((completionsArray) => {
      return katas.map((kata, index) => {
        return Object.assign({}, kata, { completions: completionsArray[index] });
      });
    });
};

const getCodewars = (username) => {
  const options = {
    uri: `https://www.codewars.com/api/v1/users/${username}`,
    json: true, // Automatically parses the JSON string in the response
  };
  return rp(options)
    .then((apiRes) => {
      return {
        success: true,
        kyu: getKyu(apiRes),
        achieved5Kyu: getKyu(apiRes) <= 5,
        honor: apiRes.honor,
        username,
      };
    })
    .catch((err) => {
      console.error('Fetching codewars info failed');
      console.error(err);
      const codewarsObj = {
        success: false,
        statusCode: err.statusCode,
      };
      if (err.statusCode === 404) {
        codewarsObj.message = 'User not found';
      } else {
        codewarsObj.message = 'Error retrieving data';
      }
      return codewarsObj;
    });
};

module.exports = {
  hasAuthored,
  getAuthoredKatas,
  getKyu,
  getCodewars,
  appendKataCompletions,
};
