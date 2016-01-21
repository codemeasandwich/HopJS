/**
 * 
 * @description React has a problem with new function beening added to the Root Objects protoype
 * @class EventPluginRegistry
 * @throws Error: EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `___`
 * @link http://www.bvbcode.com/code/okv0t28s-1814666
 *
 */

    require('react');
    require('react-dom');

//=====================================================
//==================================== Global Utilities
//=====================================================

    require('../../../config/languageExtensions').init();
    
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