'use strict'
var React = require('react');
var UI = require('bootstrap');

module.exports = React.createClass({
    displayName: 'Auto Breadcrumbs',
    
    isAStep: function(step){
      return 0 < step.trim().length
    },
    
    steps: function(){  
      return window
              .location
              .pathname
              .split("/")
              .filter(this.isAStep); 
    },
    
    render: function(){
    
      var tempPath = '';
    
        return <UI.Breadcrumb>
        
                <UI.BreadcrumbItem href="/">
                    Home
                </UI.BreadcrumbItem>
        
                {
                    this.steps().map(function(step, index, steps){
                  
                    tempPath += '/'+step;
                    
                    var opts = { key : index };
                    
                    if(steps.length === index + 1){
                      opts.active = true;
                    } else{
                      opts.href = tempPath;
                    }
                    
                    return  React.createElement(UI.BreadcrumbItem, opts, step);
                    
                    // This has to be hand coded as will give an Warning of
                    // [react-bootstrap] `href` and `active` properties cannot be set at the same time
                    /*
                      <UI.BreadcrumbItem active={steps.length === index + 1} href={tempPath}>
                        {step}
                      </UI.BreadcrumbItem>
                    */
                    
                  })
                }
              </UI.Breadcrumb>
    }
})
