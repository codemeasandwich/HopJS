'use strict'
var React = require('react');
var UI = require('bootstrap');

module.exports = React.createClass({
    displayName: 'Homepage',
    propTypes: {
      route:      React.PropTypes.object
    },
    render: function(){
    
    console.log(this.props.route);
    
        return  <div>
                  <UI.Button bsStyle="primary" href="user">Users</UI.Button> 
                  <UI.Button bsStyle="success" href="business?sdf=sdf&s4f=5">Business</UI.Button> 
                  <UI.Button bsStyle="info"    href="tasks">Tasks</UI.Button>
                </div>
    }
})
