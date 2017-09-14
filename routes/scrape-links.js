const rp = require('request-promise-native');
const normalizeUrl = require('normalize-url');

const getGithubLink = (htmlString) => {
  const regEx = /github.com\/([\w-]*)/;
  const ghHandle = regEx.exec(htmlString);
  return ghHandle ? ghHandle[1] : null;
};

const getFccLink = (htmlString) => {
  const regEx = /freecodecamp.(org|com)\/([\w-]*)/;
  const fccHandle = regEx.exec(htmlString);
  return fccHandle ? fccHandle[2] : null;
};

const getCodewarsLink = (htmlString) => {
  const regEx = /codewars.com\/users\/([\w-]*)/;
  const cwHandle = regEx.exec(htmlString);
  return cwHandle ? cwHandle[1] : null;
};

const scrapeLinks = (req, res) => {
  const url = req.query.githubPage ? normalizeUrl(req.query.githubPage) : '';
  return rp(url)
    .then((htmlString) => {
      const githubScrape = {
        githubPageLink: url,
        success: true,
        githubHandle: getGithubLink(htmlString),
        fccHandle: getFccLink(htmlString),
        codewarsHandle: getCodewarsLink(htmlString),
      };
      githubScrape.allHandles = githubScrape.githubHandle &&
        githubScrape.fccHandle && githubScrape.codewarsHandle;
      res.render('validate-form', githubScrape);
    })
    .catch((err) => {
      console.error('Fetching Github Pages URL failed');
      console.error(err);
      const githubScrape = {
        success: false,
        message: 'Page not found',
      };
      res.render('validate-form', githubScrape);
    });
};
module.exports = scrapeLinks;
