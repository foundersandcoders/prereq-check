# prereqCheck
A prerequisite checker for FAC applications

## Why
The selection committee needs to be able to easily see how applicants have done
with their prerequisites. Applicants also need to see how they are doing as
they work through them. This should be as transparent as possible so that
applicants know what they're being judged on.

Currently applications are saved into a Google Sheet, where some useful macros
are used to help streamline the process. However it is still very tedious for
the selection committee to sift through each applicant, as they have to click
through to the applicant's various profiles on Github, Codewars, freeCodeCamp
etc.

## What
preReqCheck is a place where an applicant's progress on the prequisites can all
be seen in one place. After signing in with GitHub, an applicant can enter
their own GitHub Pages site url and then scroll through their current progress in
the various prerequisites, as well as some extra information which is used by
the selection panel.

Selection panel members can see the same information, but for any applicant.

### User Stories
#### As a selection panel member I can:
- [ ] See whether the applicant has attained 5 Kyu.
- [ ] See whether the applicant has authored a kata.
- [ ] See whether the applicant has completed the 4 subsections on freeCodeCamp.
- [ ] See whether the applicant has created a website hosted on github pages.
- [ ] Input the URL of an applicant's GitHub page in order to see their prerequisite information.
- [ ] See extra information about an applicant's Codewars profile.
- [ ] See an applicants points score on freecodecamp.
- [ ] See more detail about an applicants github page and github usage.
- [ ] Login with my GitHub account to access the app.
- [ ] See info about an applicants meetup attendance.
- [ ] Navigate between all areas of prerequisite information easily.
- [ ] Logout from the app.

#### As an applicant I can:
- [ ] See whether I have attained 5 Kyu.
- [ ] See whether I have authored a kata.
- [ ] See whether I have completed the 4 subsections on freeCodeCamp.
- [ ] See confirmation that I have created a website hosted on github pages.
- [ ] Input the URL of my GitHub page in order to see my prerequisite information.
- [ ] See extra information about my Codewars profile.
- [ ] See my 'points score' from my freecodecamp account.
- [ ] See more detail about my github page and usage.
- [ ] Login with my GitHub account to access the app.
- [ ] See info about my meetup attendance.
- [ ] Navigate around all areas of my information easily.
- [ ] Logout from the app.

## How to set up Locally
To set up locally, first clone this repo:  
```git clone https://github.com/ameliejyc/prereq-check.git```

Use `npm run devStart` to start the dev server. Or to run tests: `npm test`.

## How

### Stack
* Javascript
* Sass & Handlebars
* Nodejs & Express

## Things We Learned

## Useful Resources
* [Watch & Compile Your Sass with
  npm - Medium](https://medium.com/@brianhan/watch-compile-your-sass-with-npm-9ba2b878415b)
