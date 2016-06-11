'use strict'
var React = require('react');
var UI = require('bootstrap');

var Form = require('./components/form');

module.exports = React.createClass({
    displayName: 'New Task',
      propTypes: {
      route: React.PropTypes.object
    },
    render: function(){
        return <div>
        <UI.Well> {this.constructor.displayName} </UI.Well>
        <Form  {...this.props}/>
        </div>
    }
})
