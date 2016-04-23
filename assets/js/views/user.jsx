'use strict'
var React = require('react');//, ReactDOM = require('react-dom');
var UI = require('bootstrap');
var AutoBreadcrumbs = require('./components/AutoBreadcrumbs');

//console.log(" ===== user.jsx")


var STORES = require('./../lib/storesHelper');

var attributes = STORES.getModelInputs(STORES.MODEL.USER);



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
        
        var isOk  = STORES.checkModelInput(STORES.MODEL.USER,this.state.input);
        //console.log("isOk",isOk)
        return  <form>
                    { this.getForm(attributes)  }
                    <UI.Button bsStyle="success" disabled={ !! isOk} onClick={this.addNewUser}>Add</UI.Button>
                 </form>
    }
});

var ListUsers = React.createClass({

    render: function(){
        var users = [];//STORES.getData(STORES.MODEL.USER);

        return <UI.ButtonGroup vertical>
                   {
                    users.map(function(user){
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
                  <UI.Well> Users! </UI.Well>
                  <AutoBreadcrumbs />
                  <AddUserForm ACTION_ADD={this.props.Emit.ACTIONS.ADD.USER} Fire={this.props.Emit.Fire}/>
                  <ListUsers/>
                </div>
    }
})

 /* propTypes: {
    users : React.PropTypes.array.isRequired
  },
  
  fluxChange : function(){
    console.log(">>> fluxChange <<<");
  },
  
  componentWillMount : function() {
    this.fluxChange();
  },
  componentDidMount : function() {
    STORES.interestedIn(this, 'User');
  },
  componentWillUnmount : function() {
    STORES.disinterestedIn(this);
  },*/
