const adminUsers = require('../admins.json');

module.exports = (req, res) => {
  if (!req.session.user) {
    return false;
  }
  const isAdmin = adminUsers.find( (adminUser) => {
    return adminUser.toLowerCase() === req.session.user.toLowerCase();
  })
  return req.query.ghHandle === req.session.user || isAdmin;
};
