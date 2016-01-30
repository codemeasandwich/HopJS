[![HopJS Logo](https://raw.githubusercontent.com/codemeasandwich/HopJS/master/hopjs.png)](http://hopjs.com)
## [![Server](https://img.shields.io/badge/HopJS-0.0.4-47AD9E.svg)](https://github.com/codemeasandwich/HopJS) 

Hop.js is a Full-stack Javascript framework that unify fround and backend code. The aim is to share; views, modles and controlle login for maximum code reuse.

### This Frame work is build on

[![Server](https://img.shields.io/badge/Sails.js-0.11.4-46AAC0.svg)](http://sailsjs.org/) 
[![Client](https://img.shields.io/badge/Backbone-1.2.3-0071B5.svg)](http://backbonejs.org/) 
[![View](https://img.shields.io/badge/React.Js-0.14.6-00D8FF.svg)](http://facebook.github.io/react/) 
[![UI](https://img.shields.io/badge/BootStrap+React-0.28.1-blue.svg)](https://react-bootstrap.github.io/) 
[![Build](https://img.shields.io/badge/Webpack-1.12.9-lightgrey.svg)](http://webpack.github.io/)

The Client uses **Flux** built using Backbone [events](http://backbonejs.org/#Events). A simple implementation example can be found [here](https://jsfiddle.net/codemeasandwich/bsj8onr8/).
![flux](https://facebook.github.io/flux/img/flux-simple-f8-diagram-1300w.png)

### features
* Client side routes with real URLs, not hash links
 * routes will automatically trailing slashes routes for completeness
* Flux store exposes
 * Server DB Modles as backbone model
 * Moke model helps for attribute and form inputs
* Language Extensions available in the frontend and backend


### install
```
git clone https://github.com/codemeasandwich/HopJS.git HopJS
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

[localhost:1337](http://localhost:1337)

## editing

### Client
The Client side file are in [/assets/js](https://github.com/codemeasandwich/HopJS/tree/master/assets/js)

```
.
+--assets
| +--...
| +--js
|    +--...
|    +--views
|         JSX files
|    +--settings
|        +--models.js
|        +--routes.js
|    +--stores.js
```

### Server
```
.
+--api
```

#### todo
* ES6 -> ES5 transforms
* Error Logging
* Client side Lang
* testing
* React Hot Loader
* Live-Reload
* Server side routes are 404ing
* JSX not watched by Nodemon
