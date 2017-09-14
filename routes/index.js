const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');
require('env2')('config.json');

const report = require('./report');
const scrapeLinks = require('./scrape-links');

const login = (req, res) => {
  res.render('login');
};

const scrapeForm = (req, res) => {
  if (req.query.code) {
    const options = {
      uri: 'https://github.com/login/oauth/access_token',
      qs: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
      },
      headers: {
        Accept: 'application/json',
      },
      json: true,
    };
    rp(options)
      .then((response) => {
        console.log(response);
        res.redirect('/links');
      });
  } else {
    res.render('scrape-form');
  }
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
