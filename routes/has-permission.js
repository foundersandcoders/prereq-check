const adminUsers = require('../admins.json');

module.exports = (req, res) => {
  const isAdmin = adminUsers.find( (adminUser) => {
    return adminUser.toLowerCase() === req.session.user.toLowerCase();
  })
  return req.query.ghHandle === req.session.user || isAdmin;
};
