const express = require('express');

const router = express.Router();

const login = (req, res) => {
  res.render('login');
};
const links = (req, res) => {
  res.render('links');
};
const report = (req, res) => {
  res.render('report');
};

router.get('/', login);
router.get('/links', links);
router.get('/report', report);

module.exports = router;
