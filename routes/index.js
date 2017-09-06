const express = require('express');

const router = express.Router();

const report = require('./report');

const login = (req, res) => {
  res.render('login');
};
const links = (req, res) => {
  res.render('links');
};

router.get('/', login);
router.get('/links', links);
router.get('/report', report);

module.exports = router;
