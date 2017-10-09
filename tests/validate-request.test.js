const tape = require('tape');

const isValidRequest = require('../routes/validate-request');

tape('isValidRequest', (t) => {
  t.notOk(
    isValidRequest({ user: 'testuser', isInTeam: false }, { }),
    'If query is empty should return false',
  );

  t.ok(
    isValidRequest({ user: 'testuser', isInTeam: false }, { ghHandle: 'testuser' }),
    'Normal user has permission to view their own info',
  );

  t.notOk(
    isValidRequest({ user: 'testuser', isInTeam: false }, { ghHandle: 'otheruser' }),
    'Normal user doesn\'t have permission to view other users info',
  );

  t.ok(
    isValidRequest({ user: 'testuser', isInTeam: true }, { ghHandle: 'otheruser' }, ['admin', 'anotherAdmin']),
    'Admin user has permission to view other users',
  );

  t.ok(
    isValidRequest({ user: 'testuser', isInTeam: true }, { ghHandle: 'testuser' }),
    'Admin user has permission to view their own info',
  );
  t.end();
});

