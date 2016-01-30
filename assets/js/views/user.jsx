'use strict'
var React = require('react');
var UI = require('bootstrap');
var AutoBreadcrumbs = require('./components/AutoBreadcrumbs');


console.log(" ===== user.jsx")


var STORES = require('./../lib/stores');
console.log("in user JSX",STORES)
var attributes = STORES.getInputs("User");
console.log(" ----- user.jsx")

module.exports = React.createClass({
    displayName: 'Homepage',
    
   /* propTypes: {
      users : React.PropTypes.array.isRequired
    },*/
    
    fluxChange : function(){
      console.log(">>> fluxChange <<<");
    },
    
    componentWillMount : function() {
      this.fluxChange();
    },
    componentDidMount : function() {
      STORES.interestedIn(this, 'User');
    },
    componentWillUnmount : function() {
      STORES.disinterestedIn(this);
    },
    
    render: function(){
    
        var reactInputs = [];
        for(var att in attributes){
          var anAtt = attributes[att];
          reactInputs.push(<div>{att}<input type={anAtt.type} name={att}/></div>)
        }
    
    
        return <div>
        
        <AutoBreadcrumbs />
        
         <form>
         {reactInputs  }
          </form> 
        
        <UI.Well>Users!</UI.Well>
        
        </div>
    }
})
