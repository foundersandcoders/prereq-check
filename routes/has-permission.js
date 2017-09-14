require('env2')('config.json');

module.exports = (req, res) => {
  const adminUsers = process.env.ADMIN_USERS;
  const isAdmin = adminUsers.indexOf(req.session.user) !== -1;
  return req.query.ghHandle === req.session.user || isAdmin;
};
