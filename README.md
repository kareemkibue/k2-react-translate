# k2-react-translate

[![Build Status](https://travis-ci.org/kareemkibue/k2-react-utils.svg?branch=master)](https://travis-ci.org/kareemkibue/k2-react-utils)
[![Coverage Status](https://coveralls.io/repos/github/kareemkibue/k2-react-utils/badge.svg?branch=master)](https://coveralls.io/github/kareemkibue/k2-react-utils?branch=master)

A simple, easy-to-use translation library based on Context API, with optional localized routing.

## Table of Contents
- [Problem Statement](#problem-statement)
- [Setup](#setup)
- [Documentation](#documentation)
- [Development](#development)
- [Changelog](#changelog)

## Problem Statement
TBD


## Setup
This ES5 module is distributed via [npm](https://www.npmjs.com/package/k2-react-translate) and should be installed as a production dependency.

Using _yarn_ (recommended)
```
yarn add -E k2-react-translate
```

or via _npm_
```
npm i -S -E k2-react-translate
```

### `peerDependencies`
- [`react@16.2.0+`](https://github.com/facebook/react)
    - `react@16.8.0+` would have to be installed to use either `useTranslate` or `useTranslateAndParse` hooks.
- [`react-dom`](https://github.com/facebook/react/tree/master/packages/react-dom)

### `optionalDependencies`
- [`react-router-dom`](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)

Type definitions come bundled in.

## Documentation 

`k2-react-translate` barrels (re-exports) the following sub-modules as named exports:

## Development
- Run `yarn` on the root of the repository.
- Run `yarn start` to start the project.
- Run `yarn test:watch` to ammend tests.

## Changelog

Version | Log
---|---
0.3.0 | - Update docs
0.2.0 | - Publish missing sub-modules
0.1.0 | - Initial publish