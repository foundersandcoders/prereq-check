module.exports = (session, query) => {
  const isEmpty = Object.keys(query).length === 0;
  if (isEmpty || !session.user) {
    return false;
  }
  return query.ghHandle === session.user || session.isInTeam;
};
