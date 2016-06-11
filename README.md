[![HopJS Logo](https://raw.githubusercontent.com/codemeasandwich/HopJS/master/hopjs.png)](http://hopjs.com)

[![Version](https://img.shields.io/badge/HopJS-0.3.1-47AD9E.svg)](https://github.com/codemeasandwich/HopJS)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)
[![build](https://api.travis-ci.org/codemeasandwich/HopJS.svg)](https://travis-ci.org/codemeasandwich/HopJS)
[![Coverage Status](https://coveralls.io/repos/github/codemeasandwich/HopJS/badge.svg?branch=master)](https://coveralls.io/github/codemeasandwich/HopJS?branch=master)

Hop.js is a Full-stack Javascript framework that unify fround and backend code. The aim is to share; views, modles and controlle login for maximum code reuse.

### This Frame work is build on

[![Server](https://img.shields.io/badge/Sails.js-0.12.3-46AAC0.svg)](http://sailsjs.org/) 
[![Client](https://img.shields.io/badge/Backbone-1.3.3-0071B5.svg)](http://backbonejs.org/) 
[![View](https://img.shields.io/badge/React.Js-0.14.6-00D8FF.svg)](http://facebook.github.io/react/) 
[![UI](https://img.shields.io/badge/BootStrap+React-0.29.3-blue.svg)](https://react-bootstrap.github.io/) 
[![Build](https://img.shields.io/badge/Webpack-1.12.9-lightgrey.svg)](http://webpack.github.io/)

The Client uses **Flux** built using Backbone [events](http://backbonejs.org/#Events). A simple implementation example can be found [here](http://jsfiddle.net/codemeasandwich/bsj8onr8/).
![flux](https://facebook.github.io/flux/img/flux-simple-f8-diagram-1300w.png)

### features
* Client side routes with real URLs, not hash links
  * routes will automatically trailing slashes routes for completeness
* Flux store exposes
  * Server DB Modles as backbone model
  * Moke model helps for attribute and form inputs
* Language Extensions available in the frontend and backend

## editing

**That are 4 areas when editing**

1. Application logic [/assets/js/logic/...](https://github.com/codemeasandwich/HopJS/tree/master/assets/js/logic)
2. User interface [/assets/js/views/...](https://github.com/codemeasandwich/HopJS/tree/master/assets/js/views)
3. Storage logic [/api/models/...](https://github.com/codemeasandwich/HopJS/tree/master/api/models)
4. Application config [/config/platform.js](https://github.com/codemeasandwich/HopJS/tree/master/config/platform.js)

### install
```
git clone https://github.com/codemeasandwich/HopJS.git
cd HopJS
npm install
```

If you don´t have [nodemon](http://nodemon.io/) installed
```
npm install -g nodemon
```
Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.

### start server
in HopJS directory, enter the command
```
./hop
```
Now you can check out the server running on

[localhost:2020](http://localhost:2020)

#### todo
* unit-tests
* ES6 -> ES5/4 transforms
* Error Logging
* Client side localisation
* [React Hot Loader](https://gaearon.github.io/react-hot-loader/)
* [Live-Reload](https://github.com/wladiston/sails-browsersync-example)
* JSX not watched by Nodemon
* set code style
* compress & hide source map for production
* webpack [assets CSS + FONTS](https://webpack.github.io/docs/loaders.html) [*](https://webpack.github.io/docs/using-loaders.html) [+](https://webpack.github.io/docs/list-of-loaders.html)

#### random commands
``npm test``

``istanbul cover node_modules/mocha/bin/_mocha -- -R spec tests/index``

[![GitHub version](https://badge.fury.io/gh/codemeasandwich%2FHopJS.svg)](https://badge.fury.io/gh/codemeasandwich%2FHopJS)