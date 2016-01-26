'use strict'
var React = require('react');
var UI = require('bootstrap');
var AutoBreadcrumbs = require('./components/AutoBreadcrumbs');

var STORES   = require('./../stores');

console.log("STORES user page",STORES)

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
        return <div>
        
        <AutoBreadcrumbs />
        
        
        <UI.Well>Users!</UI.Well>
        
        </div>
    }
})
