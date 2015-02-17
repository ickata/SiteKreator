SK.Applications = SK.Applications || {};

SK.Applications.Profiler = new Class({
   
   Extends     : SK.Applications.Properties,
   
   initialize  : function () {
      this.parent.apply( this, arguments );
      this.addEvent('randommotto', this.generateRandomMotto);
      window.addEvent('load', this.init.bind(this) );
   },
   
   init        : function () {
      this.parent.apply( this, arguments );
      this.initUI();
   },
   
   initUI : function () {
      this.initCollapsibles();
      this.initTabs();
      this.initDatePicker();
      this.initButton();
   },
   
   initCollapsibles : function () {
      new SK.UI.Collapsibles('my-collapsibles');
   },
   
   initTabs : function () {
      new SK.UI.Tabs({
         tabs: [ 'Basic', 'Advanced' ],
         tabs_holder: 'tabs-holder',
         tab_bodies: ['tab-content-1', 'tab-content-2'],
         enable_add: false,
         enable_delete: false
      });
   },
   
   initDatePicker : function () {
      new SK.UI.DatePicker( document.id('date') );
   },
   
   initButton : function () {
      new SK.UI.Properties.Button(this, {
         caption  : 'Generate Random',
         event    : 'randommotto',
         'class'  : 'btn-secondary btn-motto'
      }).inject( document.id('motto') );
   },
   
   generateRandomMotto : function () {
      document.id('text-motto').value = [
         "You can talk about us, but you can't talk without us!",
         "I didn't go to high school, I went to school high",
         "I ain't sleeping. I'm just taking a good look at the insides of my eyelids."
      ].getRandom();
   }
   
});