'use strict'


module.exports = function(collections){

  for (var collectionName in collections) {
  /*  if (AppDB.hasOwnProperty(collectionName)) {
      throw new Error(`PropertyDuplicationException: ${collectionName} is already in use`);
    }*/
    this[collectionName] = new collections[collectionName]();
  }
}