let adminUsers = require('../admins.json');

module.exports = (currentUser, query, adminsArr) => {
  if (!currentUser) {
    return false;
  }
  adminUsers = adminsArr || adminUsers;
  const isAdmin = adminUsers.find((adminUser) => {
    return adminUser.toLowerCase() === currentUser.toLowerCase();
  });
  return query.ghHandle === currentUser || isAdmin;
};
