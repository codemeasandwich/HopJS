'use strict'
var React = require('react');
var UI = require('bootstrap');
var AutoBreadcrumbs = require('./components/AutoBreadcrumbs');

module.exports = React.createClass({
    displayName: 'example1',
       propTypes: {
      route:      React.PropTypes.object
    },
    render: function(){
    
    console.log(this.props.route);
        return <div>
        
        <AutoBreadcrumbs /><UI.Well>BUsiness</UI.Well></div>
    }
})
