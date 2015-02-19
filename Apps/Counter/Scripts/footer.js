SK.Applications = SK.Applications || {};

SK.Applications.Counter = new Class({
   
   db : null,
   config : {},
   token : '',
   
   initialize : function ( env ) {
      this.getConfiguration( env );
   },
   
   getConfiguration : function ( env ) {
      new SK.App.Config( env ).get(
         this.onConfigRetrieve.bind(this),
         function ( message ) {
            alert( message );
         }
      );
   },
   
   onConfigRetrieve : function ( config ) {
      this.config = config;
      this.token = SK.Util.deserializeToken( config.tokens[0].token );
      this.db = new SK.DB( this.token );
      this.getRecords();
   },
   
   getRecords : function () {
      this.db.getRecords(
         SK.Util.deserializeDBId( this.config.database.id ),
         null,
         {
            where : [
               ['Page', '=', [SK.Singletons.env.get('page_node_id')]]
            ]
         },
         function ( meta, records, total ) {
            var count = 0;
            if ( records.length ) {
               this.updateRecord( records[0].row_id, ++records[0].cells.Visits );
               return;
            }
            this.saveRecord( ++count );
         }.bind(this)
      );
   },
   
   saveRecord : function ( count ) {
      this.db.addRecord(
         SK.Util.deserializeDBId( this.config.database.id ),
         {
            'Page': SK.Singletons.env.get('page_node_id'),
            'Visits': count
         },
         function ( row_id, cells, columns ) {
            //...
         }
      );
   },
   
   updateRecord : function ( row_id, count ) {
      this.db.updateRecord(
         SK.Util.deserializeDBId( this.config.database.id ),
         row_id,
         {
            'Visits': count
         },
         function ( row_id, cells, columns ) {
            //...
         }
      );
   }
   
});