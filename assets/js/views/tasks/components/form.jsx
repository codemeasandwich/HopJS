'use strict'
var React = require('react');
var UI = require('bootstrap');
var Backbone = require('backbone');


var AddForm = React.createClass({
    displayName: 'TASK FORM',
    getInitialState :  function() {
        return {
          input : { },
          saving: false
        }
    },

    addNewTask : function() {
    
      this.props.Fire(this.props.ACTION_ADD, this.state.input)
      .then( wasHandled => {
        console.info("Dispatcher call finished",wasHandled);
        this.setState({ input : {}, saving : false  });
        Backbone.history.navigate('', true);
      })
      .catch( error => {
        console.error(error);
        this.setState({ saving : false });
      });
      
      this.setState({ saving : true });
    },

    inputChange : function(att,action){
      var inputs = this.state.input;
      inputs[att] = action.target.value;
      this.setState({ input : inputs });
    },
    
    makeLabel : function(att){
      return <UI.Col componentClass={UI.ControlLabel} sm={1}>
              {att}
              </UI.Col>
    },
    makeInput : function(att,anAtt){
      return <UI.Col sm={6}>
              <UI.FormControl type  = { anAtt.type } 
                            key      = { att } 
                            value    = { this.state.input[att] } 
                            onChange = { this.inputChange.bind(this,att) } />
             </UI.Col>
    },
    
    getForm : function(attributes){
        var reactInputs = [];
        for(var att in attributes){
          var anAtt = attributes[att];
          reactInputs.push(<UI.FormGroup key = { att }  controlId = { att }  validationState="success">
                              { this.makeLabel(att) }
                              { this.makeInput(att,anAtt) }
      <UI.FormControl.Feedback />
                            </UI.FormGroup>)
        }
        return reactInputs;
    },

    render: function(){
        //console.log("this.props.modelHelpers",this.props.modelHelpers);
        var modelHelpers = this.props.modelHelpers;
        var MODEL = modelHelpers.getNames();
        //console.log("MODEL",MODEL)
        var attributes = modelHelpers.getModelInputs(MODEL.TASK);
        
        var isOk  = modelHelpers.checkModelInput(MODEL.TASK,this.state.input);
        return   <UI.Form horizontal>
                    {  this.getForm(attributes) }
                    <UI.Button bsStyle="success"
                               disabled={ !! isOk || this.state.saving}
                               onClick={this.addNewTask}>
                               
                        {(this.state.saving)?"saving":"Add"}
                        
                    </UI.Button>
                 </UI.Form>
    }
});


module.exports = React.createClass({
    displayName: 'FORM PAGE',
    render: function(){
    
        return <div>
                  <span {...this.props}/>
                  <AddForm
                    ACTION_ADD={this.props.Emit.ACTIONS.ADD.TASK}
                    Fire={this.props.Emit.Fire}
                    modelHelpers={this.props.modelHelpers}/>
                </div>
    }
})
