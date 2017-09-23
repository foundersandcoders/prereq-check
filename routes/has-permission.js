module.exports = (session, query) => {
  if (!session.user) {
    return false;
  }
  return query.ghHandle === session.user || session.isInTeam;
};
