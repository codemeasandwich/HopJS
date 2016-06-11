'use strict'
var React = require('react');
var Animate = require( 'react-animate.css');
var UI = require('bootstrap');
var moment = require('moment');

var PreviewElement = React.createClass({
    displayName: 'a task preview',
    propTypes: {
      task:  React.PropTypes.object.isRequired,
      ACTIONS: React.PropTypes.object
    },
    removeThisTask(){
      this.props.Fire(this.props.ACTIONS.DEL, this.props.task.id)
        .then(function(wasHandled){
          console.info("Dispatcher call finished",wasHandled)
        })
        .catch(function(error){
          console.error(error)
        });
    },
    tickThisTask(){
      this.props.Fire(this.props.ACTIONS.UPDATE,
                      { id        :   this.props.task.id,
                        completed : ! this.props.task.completed })
                        
        .then(function(wasHandled){
          console.info("Dispatcher call finished",wasHandled)
        })
        .catch(function(error){
          console.error(error)
        });
    },
    render(){
    
    var task = this.props.task;
    
        return <UI.Col xs={6} md={4}>
                <UI.Well bsSize="large">
                  <h3 style={{marginTop: "10px"}}>{task.name}</h3>
                  <p>Description</p>
                  <p><UI.Label bsStyle="info">{moment(task.deadline, "YYYY-MM-DD").fromNow()}</UI.Label></p>
                  <p>
                    <UI.Button onClick={this.tickThisTask} bsStyle="primary">Done</UI.Button>&nbsp;
                    <UI.Button onClick={this.removeThisTask} bsStyle="danger">Delete</UI.Button>
                  </p>
                </UI.Well>
              </UI.Col>
    }
})

var taskPreview = React.createClass({
    displayName: 'task preview',
    propTypes: {
      tasks:  React.PropTypes.array.isRequired,
      ACTIONS: React.PropTypes.object,
      filter:  React.PropTypes.bool.isRequired,
    },
   // COMPLETED : true,
    render(){
    
    var titleText, tasks, headStyle;
    
    tasks = this.props.tasks.filter((task)=>{
    return (!!task.completed) === this.props.filter
    })
    
    if(taskPreview.COMPLETED === this.props.filter){
      titleText = "Tasks done ";
      headStyle = "primary";
    } else {
      titleText = "Tasks to Do ";
      headStyle = "success";
    }
    
    return <UI.Panel header={ <h3>{ titleText + tasks.length}</h3>} bsStyle={headStyle}>
            <UI.Grid>
                <Animate
                  animationEnter="bounceIn"
                  animationLeave="bounceOut"
                  durationEnter={1000}
                  durationLeave={1000}
                  component={UI.Row}>
                  {
                    tasks.map((task)=>{
                      return <PreviewElement ACTIONS={{DEL    : this.props.ACTIONS.DEL.TASK,
                                                       UPDATE : this.props.ACTIONS.UPDATE.TASK}}
                                             task={task}
                                             key={task.id}
                                             Fire = {this.props.Fire}/>                      
                    })
                 }</Animate>
                </UI.Grid>
              </UI.Panel>
    }
})

taskPreview.COMPLETED = true;
taskPreview.UNCOMPLETED = false;
//console.log(taskPreview)
//console.log(taskPreview.UNCOMPLETE)
module.exports = taskPreview;
