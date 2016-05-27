'use strict'
var React = require('react');//, ReactDOM = require('react-dom');
var UI = require('bootstrap');

var AddUserForm = React.createClass({
    displayName: 'USER PAGE',
    getInitialState :  function() {
        return {
          input : { }
        }
    },

    addNewUser : function() {
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
        var attributes = modelHelpers.getModelInputs(MODEL.USER);
        
        var isOk  = modelHelpers.checkModelInput(MODEL.USER,this.state.input);
        return  <form>
                    {  this.getForm(attributes) }
                    <UI.Button bsStyle="success" disabled={ !! isOk} onClick={this.addNewUser}>Add</UI.Button>
                 </form>
    }
});

var ListUsers = React.createClass({

    render: function(){

        return <UI.ButtonGroup vertical>
                   {
                    this.props.users.map(function(user){
                      return <UI.Button key={user.firstName}>{user.firstName}</UI.Button>
                    })
                   }
                </UI.ButtonGroup>
    }
});

module.exports = React.createClass({
    displayName: 'USER PAGE',

    render: function(){
        return <div>
                  <span {...this.props}/>
                  <AddUserForm ACTION_ADD={this.props.Emit.ACTIONS.ADD.USER} Fire={this.props.Emit.Fire} modelHelpers={this.props.modelHelpers}/>
                  <ListUsers users={this.props.AppDB.User}/>
                </div>
    }
})
