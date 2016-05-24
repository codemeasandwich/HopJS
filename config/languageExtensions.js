
//=====================================================
//====== !!! THIS IS USED ON SERVER & CLIENT !!! ======
//=====================================================

module.exports.init = function() {

  let extesionNames = [];

//=====================================================
//================================== JS prototype hacks
//=====================================================
/**
* @description Array method to remove the first occurrence of a value
*
* @method remove
* @param {Number|String} text text to lookup by
* @return {Array} an array with the removed value OR empty if value was not found
*
* @example var a = ['x','y']; a.remove('x')
* 
*/
  if ( ! Array.prototype.remove) {
   Array.prototype.remove = function(val) {
     var i = this.indexOf(val);
          return i>-1 ? this.splice(i, 1) : [];
   };
   extesionNames.push("Array.prototype.remove");
 }
/**
* Array method to convert into an object
*
* @method toObject
* @param {Array} keys list of attributes names
* @return {Object} array values mapped to keys
*
* @example var a = ['x','y']; a.toObject(['a','b'])
* 
*/
if ( ! Array.prototype.toObject) {
   Array.prototype.toObject = function(keys){
      return this.reduce(function(prev,curr,index){ prev[keys[index]] = curr; return prev },{})
   }
   extesionNames.push("Array.prototype.toObject");
}

/**
* @description Object method to provide the same functionality as the Arrays forEach
*
* @method forEach
* @param {Function} callback run for each property in the object
* @param {Bool} all only fire callback in basic value. e.g. number, strings, bools & nasted objects
*
* @example var a = {'x':123}; a.forEach(function(prop,name){ alert(name+" is "+prop) })
*
* !!! >> " matchExpr[type].exec is not a function " BY jQuary >:( when clicking anywhere
* !!! >> after calling " $(document).on("click", "a", function(evt) { alert(123)}) "
*
if ( ! Object.prototype.forEach) {
   Object.prototype.forEach = function(callback, all){
      
      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          if (all || typeof this[key] == "string"
                  || typeof this[key] == "array"
                  || typeof this[key] == "object"
                  || typeof this[key] == "number"
                  || typeof this[key] == "boolean") {
            callback(this[key],key,this);
          }
        }
      }
   }
}

/**
 *
 *

if ( ! String.prototype.stripPunctuation) {
  String.prototype.stripPunctuation = function(){
    return this.replace(/[\=!"#%£&'*{},.\/:;?\(\)\[\]@\\$\^*+<>~`\u00a1\u00a7\u00b6\u00b7\u00bf\u037e\u0387\u055a-\u055f\u0589\u05c0\u05c3\u05c6\u05f3\u05f4\u0609\u060a\u060c\u060d\u061b\u061e\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0830-\u083e\u085e\u0964\u0965\u0970\u0af0\u0df4\u0e4f\u0e5a\u0e5b\u0f04-\u0f12\u0f14\u0f85\u0fd0-\u0fd4\u0fd9\u0fda\u104a-\u104f\u10fb\u1360-\u1368\u166d\u166e\u16eb-\u16ed\u1735\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u1805\u1807-\u180a\u1944\u1945\u1a1e\u1a1f\u1aa0-\u1aa6\u1aa8-\u1aad\u1b5a-\u1b60\u1bfc-\u1bff\u1c3b-\u1c3f\u1c7e\u1c7f\u1cc0-\u1cc7\u1cd3\u2016\u2017\u2020-\u2027\u2030-\u2038\u203b-\u203e\u2041-\u2043\u2047-\u2051\u2053\u2055-\u205e\u2cf9-\u2cfc\u2cfe\u2cff\u2d70\u2e00\u2e01\u2e06-\u2e08\u2e0b\u2e0e-\u2e16\u2e18\u2e19\u2e1b\u2e1e\u2e1f\u2e2a-\u2e2e\u2e30-\u2e39\u3001-\u3003\u303d\u30fb\ua4fe\ua4ff\ua60d-\ua60f\ua673\ua67e\ua6f2-\ua6f7\ua874-\ua877\ua8ce\ua8cf\ua8f8-\ua8fa\ua92e\ua92f\ua95f\ua9c1-\ua9cd\ua9de\ua9df\uaa5c-\uaa5f\uaade\uaadf\uaaf0\uaaf1\uabeb\ufe10-\ufe16\ufe19\ufe30\ufe45\ufe46\ufe49-\ufe4c\ufe50-\ufe52\ufe54-\ufe57\ufe5f-\ufe61\ufe68\ufe6a\ufe6b\uff01-\uff03\uff05-\uff07\uff0a\uff0c\uff0e\uff0f\uff1a\uff1b\uff1f\uff20\uff3c\uff61\uff64\uff65]+/g,"");
  }
}

/**
 * @description String method that split on the Capital letters
 *
 * @method splitCamileCase
 * @returns {Array} array if stub strings set to lower case
 * 
 * @example "HopJs".splitCamileCase() // ["hop","js"]
 */

if ( ! String.prototype.splitCamileCase) {
  String.prototype.splitCamileCase = function(){
    return this.split(/(?=[A-Z])/)
               .map(function(s) {
                        return s.trim().toLowerCase();
                    });
  }
   extesionNames.push("String.prototype.splitCamileCase");
}

//+++++++++++++++++++++++++++++ Part of the CRC hashing
//+++++++++++++++++++++++++++++++++++++++++++++++++++++

// http://stackoverflow.com/questions/18638900/javascript-crc32

function genCRCTable(){
    var c, crcTable = [];
    for(var n =0; n < 256; n++){
        c = n;
        for(var k =0; k < 8; k++){
            c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        crcTable[n] = c;
    }
    return crcTable;
}

var crcTable = genCRCTable();

if ( ! String.prototype.crc) {
 String.prototype.crc = function(){

    var crc = 0 ^ (-1);

    for (var i = 0; i < this.length; i++ ) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ this.charCodeAt(i)) & 0xFF];
    }

    return (crc ^ (-1)) >>> 0;
    
 }
   extesionNames.push("String.prototype.crc");
}
  return extesionNames;
};
