const rp = require('request-promise-native');
require('env2')('config.json');

const isInTeam = (teamMembersArray, user) => teamMembersArray.some(member => member.login === user);

const getUserData = (token) => {
  const options = {
    uri: 'https://api.github.com/user',
    headers: {
      authorization: `token ${token}`,
      'User-Agent': 'prereqCheck',
    },
    json: true,
  };
  return rp(options);
};

const getAdminTeamMembers = (token) => {
  const options = {
    uri: `https://api.github.com/teams/${process.env.AUTHORISED_TEAM_ID}/members`,
    headers: {
      authorization: `token ${token}`,
      'User-Agent': 'prereqCheck',
    },
    json: true,
    simple: false,
    resolveWithFullResponse: true,
  };
  return rp(options);
};


const githubAuth = (req, res) => {
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
      .then((oauthResponse) => {
        req.session.token = oauthResponse.access_token;
        return getUserData(req.session.token);
      })
      .catch((err) => {
        console.error('Couldn\'t log in with Github');
        console.error(err);
        throw new Error('Couldn\'t log in with Github')
      })
      .then((userData) => {
        req.session.user = userData.login;
        return getAdminTeamMembers(req.session.token);
      })
      .then((response) => {
        if (response.statusCode === 200) {
          // if user is able to retrieve team they are probably a member, but check anyway
          req.session.isInTeam = isInTeam(response.body, req.session.user);
        } else {
          req.session.isInTeam = false;
        }
        res.redirect('/links');
      })
      .catch((err) => {
        if (err.message === 'Couldn\'t log in with Github') {
          res.render('error', { message: err.message });
        } else {
          console.error('Error retrieving user team membership');
          console.error(err);
          req.session.isInTeam = false;
          res.redirect('/links');
        }
      });
  } else {
    // login unsuccessful
    res.redirect('/');
  }
};

module.exports = {
  isInTeam,
  githubAuth,
};
