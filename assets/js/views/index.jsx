'use strict' //hh
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
                  <h1>{this.props.platform.name}</h1>
                  <UI.Button bsStyle="primary" href="#">Test</UI.Button> 
                  <UI.Button bsStyle="primary" href="user">All Users</UI.Button> 
                  <UI.Button bsStyle="primary" href="user/42">Users 42</UI.Button> 
                  <UI.Button bsStyle="success" href="business?sdf=sdf&s4f=5">Business</UI.Button> 
                  <UI.Button bsStyle="info"    href="task">Tasks</UI.Button>
                </div>
    }
})
