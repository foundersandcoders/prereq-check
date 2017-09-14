const express = require('express');
const router = express.Router();

const report = require('./report');
const scrapeLinks = require('./scrape-links');
const links = require('./links');

const login = (req, res) => {
  res.render('login');
};

const validateForm = (req, res) => {
  res.render('validate-form');
};

router.get('/', login);
router.get('/links', links);
router.get('/links-validate', validateForm);
router.get('/scrape-links', scrapeLinks);
router.get('/report', report);

module.exports = router;
