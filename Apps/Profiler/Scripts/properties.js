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
   },
   
   initCollapsibles : function () {
      new SK.UI.Collapsibles('my-collapsibles');
   }
   
});