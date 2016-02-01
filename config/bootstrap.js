/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

//var startTime = new Date();

var logger = require('tracer').colorConsole();

console.log();
logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'});
console.log();

module.exports.logger = logger;

module.exports.bootstrap = function(next) {


  require("./languageExtensions").init();

  //  console.info('server started at ' + startTime);

    process.on('uncaughtException', function (err) {
      logger.error("Caught exception: ",err);
    });
    
    process.on('unhandledRejection', function(reason, p) {
        logger.error("Unhandled Rejection at: Promise ", p, " reason: ", reason);
        // application specific logging, throwing an error, or other logic here
    });
    
    process.on('SIGINT', function () {
      logger.warn('Got SIGINT.');
    });
    
    process.on('exit', function(code) {
     // var endTime = new Date();
      logger.log('About to exit with code:', code);
     // console.info('server ended at ' + endTime);
      
    });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

    next();
};
