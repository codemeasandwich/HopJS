'use strict'
var React = require('react');
var UI = require('bootstrap');
var AutoBreadcrumbs = require('./components/AutoBreadcrumbs');

module.exports = React.createClass({
    displayName: 'Homepage',
    
    render: function(){
        return <div>
        
        <AutoBreadcrumbs /><UI.Well>tasks</UI.Well></div>
    }
})
