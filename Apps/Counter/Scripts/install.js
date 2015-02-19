SK.Applications = SK.Applications || {};

SK.Applications.Counter = new Class({
   
   initialize : function ( env ) {
      this.env = env;
      this.setupDatabase();
   },
   
   // A method for creating the DB structure
   setupDatabase : function () {
      // First lock the App lifecycle
      new SK.App.LifeCycle().lock();
      // Setup the DB
      new SK.DB.Setup.Serialized(
         this.env.session_id,
         {
            database : {
               name : 'app-Counter',
               description : 'This database contains all visits'
            },
            columns : [
               {
                  'name': 'Page',
                  'type': SK.DB.Column.NUMBER
               },
               {
                  'name': 'Visits',
                  'type': SK.DB.Column.NUMBER
               }
            ],
            tokens : [{
               name: 'app-something-else',
               extra: {
                  db_permissions: [{
                     permissions: {
                        get: 1,
                        update: 1,
                        add: 1
                     }
                  }]
               }
            }]
         },
         // Success
         function ( db ) {
            // Store the IDs into App Config
            this.saveAppConfig( db );
         }.bind ( this ),
         // Failure
         function ( message ) {
            alert( message );
            // log error
            new SK.App.LifeCycle().failure( this.env.app_id, 'install' );
         }.bind( this )
      ).create();
   },
   
   // A Method for saving database id and it's columns ids into Application Configuration
   saveAppConfig : function ( db ) {
      new SK.App.Config(
         this.env
      ).set(
         db,
         // Success
         function ( config ) {
            // Unlock lifecycle
            new SK.App.LifeCycle().unlock();
         },
         // Failure
         function ( message ) {
            alert( message );
            // log error
            new SK.App.LifeCycle().failure( this.env.app_id, 'install' );
         }.bind( this )
      );
   }
   
});