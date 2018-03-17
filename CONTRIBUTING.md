# Contributing Guide for Developers

## How to set up Locally
To set up locally, first clone this repo:  
```git clone https://github.com/ameliejyc/prereq-check.git```

### Environment Variables
Obtain a copy of the required environment variables json file from any of the maintainers (see note on github apps below) and place in the root of the project.

### Starting the app
Use `npm run devStart` to start the dev server. Or to run tests: `npm test`.

### *A note on Authentication and Github apps*
Authentication occurs through github oauth. This requires a github 'app' to be registered. Once github has completed the oauth flow, it 'calls back' prereq-check on a url specified in the app; if you are developing locally we want this url to point to localhost, but when deployed on heroku we want this url to point to the heroku app.
For this reason we have two github oauth apps. The `CLIENT_ID` and `CLIENT_SECRET` are environment variables, and they need to be the id and secret for the correct github oauth  app for local development or heroku depending on where the app is running.
To accomplish this:
- variables `CLIENT_ID` and `CLIENT_SECRET` with the correct values have been created on heroku;
- to run this locally you need to have `CLIENT_ID` and `CLIENT_SECRET` with the correct values for running the local app configured in your `config.json`.

## Raising Issues
Before raising an issue please first ensure that there is not already an issue covering this (you can always add a comment to an existing issue to expand on it).

When raising an issue try to:
- give it a clear and concise title
- if it is a bug, provide clear instructions on how to replicate it

## Contributing to prereq-check

Before starting work make sure there is an issue, and discuss with other contributors.

### Code Style
The repo includes an `.eslintrc.json` with our style guide. You should enable the eslint plugin for your editor to help you conform to the style guide. Please disable any other linters you may have, as they may make unwanted changes to the codebase (e.g. disable prettier).

### Branch Names
Please stick to the following naming conventions:
**Bugfix naming convention**: `bug/<issue number>`, for example `bug/99`.
**Anything other than bugfix**: `feature/<issue number>`, for example `feature/100`.

### Commits
Please reference the commit issue number prefaced by a '#' in your commits. For example:
`#101 Changes oauth logic to fix login bug`

### Tests and Test Coverage
- Your PR should not break any tests
- Your changes should not reduce test coverage of the codebase (you will probably need to add new tests)
- Your tests must pass on Travis
*You can see whether your tests pass on Travis, and the effects of your changes on the test coverage in the conversation tab for your PR*.

### Pull Requests
Reference the original issue in your PR. Include any notes on the work you have done that you think will help the reviewer.
Do not include whitespace / stylistic changes in your PR.
When you are ready, assign a maintainer to review your PR.