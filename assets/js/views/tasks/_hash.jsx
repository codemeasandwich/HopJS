'use strict'
var React = require('react');
var UI = require('bootstrap');

module.exports = React.createClass({
    displayName: 'Task',
    
    render: function(){
    
        return <div>
        <h3>A task { this.props.route.fragments.hash }</h3>
        <a href="/"> Home</a>
        <a href="/tasks/"> tasks</a>
         NewTasks
         Tasks 
        </div>
    }
})
