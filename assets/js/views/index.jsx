'use strict' //hh
var React = require('react');
var UI = require('bootstrap');


var Sparklines = require('react-sparklines').Sparklines;
var SparklinesLine = require('react-sparklines').SparklinesLine;


 
 
module.exports = React.createClass({
    displayName: 'Homepage',
    propTypes: {
      route:      React.PropTypes.object
    },
    render: function(){
    
        return  <div>
        <Sparklines data={[5, 10, 5, 20,34,12,5,12]} width={100} height={20}>
  <SparklinesLine color="blue" />
</Sparklines>
                  <h1>{this.props.platform.name}</h1>
                  <UI.Button bsStyle="primary" href="#">Test</UI.Button> 
                  <UI.Button bsStyle="primary" href="user">All Users</UI.Button> 
                  <UI.Button bsStyle="primary" href="user/42">Users 42</UI.Button> 
                  <UI.Button bsStyle="success" href="business?sdf=sdf&s4f=5">Business</UI.Button> 
                  <UI.Button bsStyle="info"    href="task">Tasks</UI.Button>
                </div>
    }
})
