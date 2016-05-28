'use strict'
var React = require('react');
var UI = require('bootstrap');

var Form = require('./components/form');

module.exports = React.createClass({
    displayName: 'example1',
      propTypes: {
      route: React.PropTypes.object
    },
    render: function(){
        return <div>
        <UI.Well> List of tasks </UI.Well>
        <a href="/tasks/1"> Task A</a>
        <Form  {...this.props}/>
        </div>
    }
})
