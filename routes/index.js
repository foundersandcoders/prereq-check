const express = require('express');

const router = express.Router();

const report = require('./report');
const scrapeLinks = require('./scrape-links');

const login = (req, res) => {
  res.render('login');
};
const links = (req, res) => {
  res.render('links');
};

router.get('/', login);
router.get('/links', links);
router.get('/scrape-links', scrapeLinks);
router.get('/report', report);

module.exports = router;
