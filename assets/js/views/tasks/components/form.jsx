'use strict'
var React = require('react');
var UI = require('bootstrap');

var AddUserForm = React.createClass({
    displayName: 'TASK FORM',
    getInitialState :  function() {
        return {
          input : { }
        }
    },

    addNewTask : function() {
      this.props.Fire(this.props.ACTION_ADD, this.state.input)
      .then(function(wasHandled){
        console.info("Dispatcher call finished",wasHandled)
      })
      .catch(function(error){
        console.error(error)
      });
      this.setState({ input : {} });
    },

    inputChange : function(att,action){
      var inputs = this.state.input;
      inputs[att] = action.target.value;
      this.setState({ input : inputs });
    },
    
    getForm : function(attributes){
        var reactInputs = [];
        for(var att in attributes){
          var anAtt = attributes[att];
          reactInputs.push(<div>{att}: <input type     = { anAtt.type } 
                                              key      = { att } 
                                              value    = { this.state.input[att] } 
                                              onChange = { this.inputChange.bind(this,att) } /></div>)
        }
        return reactInputs;
    },

    render: function(){
        //console.log("this.props.modelHelpers",this.props.modelHelpers);
        var modelHelpers = this.props.modelHelpers;
        var MODEL = modelHelpers.getNames();
        console.log("MODEL",MODEL)
        var attributes = modelHelpers.getModelInputs(MODEL.TASK);
        
        var isOk  = modelHelpers.checkModelInput(MODEL.TASK,this.state.input);
        return  <form>
                    {  this.getForm(attributes) }
                    <UI.Button bsStyle="success" disabled={ !! isOk} onClick={this.addNewTask}>Add</UI.Button>
                 </form>
    }
});

var ListUsers = React.createClass({

    getDefaultProps: function() {
      return {
        tasks: []
      };
    },

    render: function(){

        return <UI.ButtonGroup vertical>
                   {
                    this.props.tasks.map(function(task){
                      return <UI.Button key={task.firstName}>{task.firstName}</UI.Button>
                    })
                   }
                </UI.ButtonGroup>
    }
});

module.exports = React.createClass({
    displayName: 'FORM PAGE',
    render: function(){
    
        return <div>
                  <span {...this.props}/>
                  <AddUserForm
                    ACTION_ADD={this.props.Emit.ACTIONS.ADD.TASK}
                    Fire={this.props.Emit.Fire}
                    modelHelpers={this.props.modelHelpers}/>
                  <ListUsers users={this.props.AppDB.Task}/>
                </div>
    }
})
