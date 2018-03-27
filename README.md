# prereqCheck [![Build Status](https://travis-ci.org/ameliejyc/prereq-check.svg?branch=master)](https://travis-ci.org/ameliejyc/prereq-check) [![codecov](https://codecov.io/gh/ameliejyc/prereq-check/branch/master/graph/badge.svg)](https://codecov.io/gh/ameliejyc/prereq-check)
A prerequisite checker for FAC applications :heavy_check_mark:

## Authors / Maintainers
@matthewdking @ameliejyc @bartbucknill @dangerdak @astroash

## Why
The selection committee needs to be able to easily see how applicants have done with their prerequisites. Applicants also need to see how they are doing as they work through them. This should be as transparent as possible so that applicants know what they're being judged on.

Currently applications are saved into a Google Sheet, where some useful macros are used to help streamline the process. However it is still very tedious for the selection committee to sift through each applicant, as they have to click through to the applicant's various profiles on Github, Codewars, freeCodeCamp etc.

## What
preReqCheck is a place where an applicant's progress on the prequisites can all be seen in one place. After signing in with GitHub, an applicant can enter their own GitHub Pages site url and then scroll through their current progress in the various prerequisites, as well as some extra information which is used by
the selection panel.

Selection panel members can see the same information, but for any applicant.

## Contributing
See the [contributing guide](https://github.com/ameliejyc/prereq-check/blob/master/CONTRIBUTING.md).

### User Stories
#### As a selection panel member I can:
- [x] See whether the applicant has attained 5 Kyu.
- [x] See whether the applicant has authored a kata.
- [x] See whether the applicant has completed the 4 subsections on freeCodeCamp.
- [x] See whether the applicant has created a website hosted on github pages.
- [x] Input the URL of an applicant's GitHub page in order to see their prerequisite information.
- [x] See extra information about an applicant's Codewars profile.
- [x] See an applicants points score on freecodecamp.
- [x] See more detail about an applicants github page and github usage.
- [x] Login with my GitHub account to access the app.
- [x] See info about an applicants meetup attendance.
- [x] Navigate between all areas of prerequisite information easily.
- [ ] Logout from the app.

#### As an applicant I can:
- [x] See whether I have attained 5 Kyu.
- [x] See whether I have authored a kata.
- [x] See whether I have completed the 4 subsections on freeCodeCamp.
- [x] See confirmation that I have created a website hosted on github pages.
- [x] Input the URL of my GitHub page in order to see my prerequisite information.
- [x] See extra information about my Codewars profile.
- [x] See my 'points score' from my freecodecamp account.
- [x] See more detail about my github page and usage.
- [x] Login with my GitHub account to access the app.
- [x] See info about my meetup attendance.
- [x] Navigate around all areas of my information easily.
- [ ] Logout from the app.

## How & Things We Learned

### Stack
* JavaScript
* SCSS & Handlebars
* Node.js & Express.js

### Promises

As this project relies on numerous api calls to be made to return data we have used promises to simply this process. ```Promise.all``` is used to allow us to send all the api calls off in one go, and only render the page on return of them all.

As the project also requires some page crawling, the node module request-promise is also used to return a page's HTML content as a string:

```
rp('http://www.google.com')
    .then(function (htmlString) {
        // Process html...
    })
    .catch(function (err) {
        // Crawling failed...
    });
```

### Nock for mocking HTTP requests

prereqCheck makes multiple API calls, and HTTP calls to webpages. Including actual live network requests in tests is problematic because:

* there may be limitations on the frequency of API calls;
* tests may fail as a result of network of other errors extraneous to the codebase.

[Nock](https://github.com/node-nock/nock) is an npm module that facilitates the 'mocking' of HTTP requests.
It will intercept any outgoing requests to a defined url, and respond with the data which you give it.

For example, in the test below *nock* intercepts any request to the defined domain passed to ```nock```, and responds with the contents of the file passed to ```replyWithFile()```.
```js
tape('Codewars API: getCodewars invalid username', (t) => {
  const username = 'astroashaaa';
  nock('https://www.codewars.com/')
    .get(`/api/v1/users/${username}`) # <--- MUST start with a /
    .replyWithFile(404, path.join(__dirname, 'dummy-data', 'codewars-response-fail.json'));
  getCodewars(username)
    .then((response) => {
      t.deepEqual(response, {
        success: false,
        statusCode: 404,
        message: 'User not found',
      }, 'getCodewars for invalid username returns correct object');
      t.end();
    });
})
```

### SASS/SCSS

prereqCheck uses SCSS to add functionality to CSS predominantly by making use of variables.

SCSS, or Sassy CSS, is a syntax of SASS and is a superset of CSS3’s syntax. This means that every valid CSS3 stylesheet is valid SCSS as well.

prereqCheck uses the node module node-sass to compile .scss files to browser-readable .css files. By combining a watch script using nodemon with a build script using node-sass, we are able to watch and build our main.css file on every change using an npm script.

```
“scripts”: {
 “build-css”: “node-sass --include-path scss scss/main.scss public/css/main.css”,
 “watch-css”: “nodemon -e scss -x \”npm run build-css\””
}
```


## Useful Resources
* [Watch & Compile Your Sass with npm - Medium](https://medium.com/@brianhan/watch-compile-your-sass-with-npm-9ba2b878415b)
* [Promise.all documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
* [Nock documentation](https://github.com/node-nock/nock)
* [Request-Promise documentation](https://github.com/request/request-promise)
