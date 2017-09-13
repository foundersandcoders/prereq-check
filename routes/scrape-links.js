const rp = require('request-promise-native');
const normalizeUrl = require('normalize-url');

const getGithubLink = (htmlString) => {
  const regEx = /github.com\/([\w-]*)/;
  return regEx.exec(htmlString)[1];
};

const getFccLink = (htmlString) => {
  const regEx = /freecodecamp.(org|com)\/([\w-]*)/;
  return regEx.exec(htmlString)[2];
};

const getCodewarsLink = (htmlString) => {
  const regEx = /codewars.com\/users\/([\w-]*)/;
  return regEx.exec(htmlString)[1];
};

const scrapeLinks = (req, res) => {
  const url = normalizeUrl(req.query.githubPage);
  return rp(url)
    .then((htmlString) => {
      const githubScrape = {
        githubPageLink: url,
        success: true,
        githubHandle: getGithubLink(htmlString),
        fccHandle: getFccLink(htmlString),
        codewarsHandle: getCodewarsLink(htmlString),
      };
      res.render('validate-form', githubScrape);
    })
    .catch((err) => {
      console.error('Fetching Github Pages URL failed');
      // console.error(err);
      const githubScrape = {
        success: false,
        message:'Page not found',
      };
      res.render('validate-form', githubScrape);
    });
};
module.exports = scrapeLinks;
