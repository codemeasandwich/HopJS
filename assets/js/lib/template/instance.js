'use strict'

var instances;

module.exports = function(collections){
    if ( ! instances) {
      instances = {};
      for (var collectionName in collections) {
      /*  if (AppDB.hasOwnProperty(collectionName)) {
          throw new Error(`PropertyDuplicationException: ${collectionName} is already in use`);
        }*/
        instances[collectionName] = new collections[collectionName]();
      }
    } else {
      console.warn("genInstances should only be called once!");
    }
    return instances;
}