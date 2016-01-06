'use strict'
var React = require('react');
var UI = require('bootstrap');

module.exports = React.createClass({
    displayName: 'Homepage',
    
    render: function(){
        return <UI.Well> 404 <UI.Button bsStyle="primary" href="/">Home</UI.Button> </UI.Well>
    }
})
