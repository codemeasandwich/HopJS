'use strict'

var React = require('react');

var UI = require('bootstrap');

var Sparklines = require('react-sparklines').Sparklines;
var SparklinesLine = require('react-sparklines').SparklinesLine;
 
var Preview = require('./preview');
 
module.exports = React.createClass({
    displayName: 'Homepage',
    propTypes: {
       AppDB: React.PropTypes.object.isRequired,
       Emit : React.PropTypes.object
    },
    getInitialState: function() {
    /*
      console.log("getInitialState",this);
      setInterval(()=>{
        var data = this.state.data;
        data.pop();
        data.unshift(Math.floor((Math.random() * 30) + data[0]/2));
        this.setState({data:data});
      }, 350);
    */
      return {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
    },
    
    render: function(){
    
        return <div>
                  <Sparklines data={this.state.data} width={100} height={20} key={this.state.data.toString()}>
                    <SparklinesLine color="blue" />
                  </Sparklines>
                  <h1>{this.props.platform.name}</h1>
                  <h2>ToDo List <UI.Button bsStyle="primary" href="/tasks">Create a new Task</UI.Button></h2>
          
                  <UI.Row className="clearfix">
                     <UI.Col md={6}>
                        <Preview tasks = {this.props.AppDB.Task}
                                 filter = {Preview.COMPLETED}
                                 ACTIONS = {this.props.Emit.ACTIONS}
                                 Fire  = {this.props.Emit.Fire}/>
                     </UI.Col>
                     <UI.Col md={6}>
                        <Preview tasks = {this.props.AppDB.Task}
                                 filter = {Preview.UNCOMPLETED}
                                 ACTIONS = {this.props.Emit.ACTIONS}
                                 Fire  = {this.props.Emit.Fire}/>
                      </UI.Col>
                  </UI.Row >
                  
                </div>
    }
})
