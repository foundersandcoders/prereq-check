const tape = require('tape');

const hasPermission = require('../routes/has-permission');

tape('hasPermission', (t) => {
  t.ok(hasPermission('testuser', { ghHandle: 'testuser' }, ['admin', 'anotherAdmin']),
    'Normal user has permission to view their own info');

  t.notOk(hasPermission('testuser', { ghHandle: 'otheruser' }, ['admin', 'anotherAdmin']),
    'Normal user doesn\'t have permission to view other users info');

  t.ok(hasPermission('admin', { ghHandle: 'testuser' }, ['admin', 'anotherAdmin']),
    'Admin user has permission to view other users');

  t.ok(hasPermission('admin', { ghHandle: 'admin' }, ['admin', 'anotherAdmin']),
    'Admin user has permission to view their own info');
  t.end();
});

