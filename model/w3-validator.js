const rp = require('request-promise-native');

const getNumberOfErrors = array => array.reduce((sum, item) => {
  if (item.type === 'error') {
    sum += 1;
    return sum;
  }
  return sum;
}, 0);

const getW3Validator = (url) => {
  const options = {
    uri: `http://validator.w3.org/nu/?doc=${url}/&out=json`,
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  };
  return rp(options)
    .then((apiRes) => {
      const errors = getNumberOfErrors(apiRes.messages);
      return {
        success: true,
        errors,
        other: apiRes.messages.length - errors,
        url: options.uri,
      };
    })
    .catch((err) => {
      console.error('Fetching W3 Validator info failed');
      console.error(err);
      return {
        success: false,
        message: 'Error retrieving data',
      };
    });
};

module.exports = {
  getNumberOfErrors,
  getW3Validator,
};
