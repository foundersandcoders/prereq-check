const express = require('express');
const router = express.Router();

const report = require('./report');
const scrapeLinks = require('./scrape-links');
const { githubAuth } = require('./github-auth');

const login = (req, res) => {
  res.render('login', { clientId: process.env.CLIENT_ID });
};

const links = (req, res) => {
  res.render('scrape-form');
};
const validateForm = (req, res) => {
  res.render('validate-form');
};

router.get('/', login);
router.get('/links', links);
router.get('/links-validate', validateForm);
router.get('/scrape-links', scrapeLinks);
router.get('/report', report);

router.get('/auth', githubAuth);

module.exports = router;
