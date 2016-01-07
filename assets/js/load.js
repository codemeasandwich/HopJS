"user strict";

//=====================================================
//================================== JS prototype hacks
//=====================================================
/**
* Array function to remove the first occurrence of a value
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
 }
/**
* Array function to convert into an object
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
}

/**
* Object function to provide the same functionality as the Arrays forEach
*
* @method forEach
* @param {Function} callback run for each property in the object
* @param {Bool} all only fire callback in basic value. e.g. number, strings, bools & nasted objects
*
* @example var a = {'x':123}; a.forEach(function(prop,name){ alert(name+" is "+prop) })
* 
*/
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
 *
 *

if ( ! String.prototype.splitCamileCase) {
  String.prototype.splitCamileCase = function(){
    return this.split(/(?=[A-Z])/)
               .map(function(s) {
                        return s.trim().toLowerCase();
                    });
  }
}
/**
 *
 */
//+++++++++++++++++++++++++++++ Part of the CRC hashing
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
  
if ( ! String.prototype.crc) 
 String.prototype.crc = function(){

    str = Utf8Encode(this);

    var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
 
    if (typeof(crc) == "undefined")
    { crc = 0; }

    var x = 0, y = 0;
 
    crc = crc ^ (-1);

    for( var i = 0, iTop = str.length; i < iTop; i++ ) {
        y = ( crc ^ str.charCodeAt( i ) ) & 0xFF;
        x = "0x" + table.substr( y * 9, 8 );
        crc = ( crc >>> 8 ) ^ x;
    }
    return crc ^ (-1);
};


//=====================================================
//==================================== Global Utilities
//=====================================================
/**
* internasional function
*
* @method __
* @param {String} text text to lookup by
* @param {Object} replace An object mapping place holder with the value
* @return {String} the translated text
*
* @example __(" %MIN% to %MAX% letters",{MIN:min,MAX:max})
* 
*/
window.__ = function(text,replace){
      if (undefined === replace) {
        return text
      }
      return text.replace(/%\w+%/g,
        function(word) {
          word = word.substr(1,word.length-2);
          return replace[word] || word;
        })
    }


function parseParams(str) {
    return str.split('&').reduce(function (params, param) {
        var paramSplit = param.split('=').map(function (value) {
            return decodeURIComponent(value.replace('+', ' '));
        });
        params[paramSplit[0]] = paramSplit[1];
        return params;
    }, {});
}

//=====================================================
//================================= Setup webpack stuff
//=====================================================

 require('./models');

//=====================================================
//============================================== Router
//=====================================================

 require('./pages');
/*
var handlers = {
  index:    require('./.views/index'),
  user:     require('./.views/user'),
  business: require('./.views/business'),
  tasks:    require('./.views/tasks'),
  notFound: require('./.views/404')
}

var Router = Backbone.Router.extend({
  routes: {
   '' : 'index',
   'user' : 'user',
   'business' : 'business',
   'tasks' : 'tasks',
   '*404' : 'notFound'
  }
});

var routeMangaer = new Router();
routeMangaer.on('route', function(name, params) {

  var page = handlers[name];
  var route = { name: name, params: {} }
          
  if( !! params[0]){
    route.params = parseParams(decodeURIComponent(params[0]));
  }        
          
  ReactDom.render(React.createElement(page, {route:route}), document.getElementById("content"));
})
Backbone.history.start({pushState: true})

module.exports = routeMangaer
*/

