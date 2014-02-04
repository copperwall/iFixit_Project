/* Source file for storing devices saved by user */

var gearBagDB = new MooSQL({
   // DB Name
   dbName: 'GearBag',
   // DB Version
   dbVersion: '1.0',
   // Description
   dbDesc: 'Saved devices in gear bag',
   // Est. size (value from example)
   dbSize: 15
});

gearBagDB.addEvent('databaseReady', function() {
   var saved_devices = [];
   console.log("DB IS READY");
   gearBagDB.find("Devices", ["title", "img_url"], null, function(transaction, result) {
      console.log(result.rows.item(0));
   });
});

gearBagDB.addEvent('databaseCreated', function() {
   console.log("created db");

   var table_schema = {
      id: "INTEGER PRIMARY KEY AUTOINCREMENT",
      title: "TEXT",
      img_url: "TEXT"
   };

   gearBagDB.create("Device", table_schema, function() {
    gearBagDB.insert("Device", {title: "test device", img_url: "no_url"});  
   });
});

function add_device(title, image) {
   gearBagDB.insert("Devices", [title, image]);
}

