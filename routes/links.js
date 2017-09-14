const rp = require('request-promise-native');
require('env2')('config.json');

const getUserData = (oauthResponse) => {
  const userOptions = {
    uri: 'https://api.github.com/user',
    headers: {
      authorization: `token ${oauthResponse.access_token}`,
      'User-Agent': 'prereqCheck',
    },
    json: true,
  };
  return rp(userOptions);
};

const links = (req, res) => {
  if (req.query.code) {
    const options = {
      uri: 'https://github.com/login/oauth/access_token',
      qs: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
      },
      headers: {
        Accept: 'application/json',
      },
      json: true,
    };
    rp(options)
      .then(getUserData)
      .then((userData) => {
        req.session.user = userData.login
      });
    res.redirect('/links');
  }
  else {
    res.render('scrape-form');
  }
};

module.exports = links;
