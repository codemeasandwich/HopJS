'use strict'
var React = require('react');
var UI = require('bootstrap');
var AutoBreadcrumbs = require('./components/AutoBreadcrumbs');

//console.log(require('models/User'))

module.exports = React.createClass({
    displayName: 'Homepage',
    
    render: function(){
        return <div>
        
        <AutoBreadcrumbs />
        
        
        <UI.Well>Users!</UI.Well>
        
        </div>
    }
})
