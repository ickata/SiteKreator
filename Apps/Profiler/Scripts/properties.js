SK.Applications = SK.Applications || {};

SK.Applications.Profiler = new Class({
   
   Extends     : SK.Applications.Properties,
   
   initialize  : function () {
      this.parent.apply( this, arguments );
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
   }
   
});