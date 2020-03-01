# 💥 GitHub Battle

[![Netlify Status](https://api.netlify.com/api/v1/badges/03fdbd3e-f413-4b4e-9699-d4bf30a18a84/deploy-status)](https://app.netlify.com/sites/gh-bat/deploys)
[![Dependencies Status][dependencies-status-badge]][dependencies-status]
[![Dev Dependencies Status][devdependencies-status-badge]][devdependencies-status]
[![License][license-badge]](license)

GitHub Battle is my case-study for evaluating [XState][xstate].

## Pre-requisites

- [Git][git]
- [Node][node]

## Development

Duplicate `.env.example` as `.env` and edit in your GitHub access token.

    cp .env.example .env

Install dependencies

    npm install

Start the development environment

    npm run start

Start interactive test runner

    npm run test

## Production

Duplicate `.env.example` as `.env` and edit in your GitHub access token.

    cp .env.example .env

Install dependencies

    npm install

Build the production bundle

    npm run build

## License

This project is open source software licensed under the MIT license. For more information see [LICENSE][license].

[netlify-status]: https://app.netlify.com/sites/gh-bat/deploys
[netlify-status-badge]: https://api.netlify.com/api/v1/badges/03fdbd3e-f413-4b4e-9699-d4bf30a18a84/deploy-status
[dependencies-status]: https://david-dm.org/jtiala/github-battle
[dependencies-status-badge]: https://img.shields.io/david/jtiala/github-battle.svg
[devdependencies-status]: https://david-dm.org/jtiala/github-battle?type=dev
[devdependencies-status-badge]: https://img.shields.io/david/dev/jtiala/github-battle.svg
[license]: https://github.com/jtiala/github-battle/blob/master/LICENSE
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[git]: https://git-scm.com/
[node]: https://nodejs.org/
[xstate]: https://xstate.js.org
