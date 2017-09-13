const express = require('express');
const router = express.Router();

const report = require('./report');
const scrapeLinks = require('./scrape-links');

const login = (req, res) => {
  res.render('login');
};

const scrapeForm = (req, res) => {
  res.render('scrape-form');
};

const validateForm = (req, res) => {
  res.render('validate-form');
};

router.get('/', login);
router.get('/links', scrapeForm);
router.get('/links-validate', validateForm);
router.get('/scrape-links', scrapeLinks);
router.get('/report', report);

module.exports = router;
