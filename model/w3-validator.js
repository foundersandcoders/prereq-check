const rp = require('request-promise-native');

const getNumberOfErrors = array => array.reduce((sum, item) => {
  if (item.type === 'error') {
    sum += 1;
    return sum;
  }
  return sum;
}, 0);

const getW3Validator = (url) => {
  const w3Url = `http://validator.w3.org/nu/?doc=${url}`; 
  const options = {
    uri: `${w3Url}/&out=json`,
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  };
  console.log('uuuuuuuuuuuuuuuuuu', options.uri)
  return rp(options)
    .then((apiRes) => {
      const errors = getNumberOfErrors(apiRes.messages);
      return {
        success: true,
        errors,
        other: apiRes.messages.length - errors,
        url: w3Url,
      };
    })
    .catch((err) => {
      console.error('Fetching W3 Validator info failed');
      console.error(err);
      return {
        success: false,
        message: 'Error retrieving data from W3 Validator',
      };
    });
};

module.exports = {
  getNumberOfErrors,
  getW3Validator,
};
