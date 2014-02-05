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

/* According to the MooSQL docs, this should run when the database is ready.
 * However, this event would never fire in test. Instead, the callback function
 * used for this event listener is run when the domready event is fired.
 * 
 * This happen at the bottom of this file.
 */
gearBagDB.addEvent('databaseReady', function() {
   gearBagDB.exec("SELECT * FROM 'Device'", init_saved_devices);
});

gearBagDB.addEvent('databaseCreated', function() {
   console.log("created db");

   var table_schema = {
      id: "INTEGER PRIMARY KEY AUTOINCREMENT",
      title: "TEXT",
      img_url: "TEXT"
   };

   gearBagDB.create("Device", table_schema);
});


/* Called when new device is dropped into gear bag */
function add_device(device_title, device_image) {
   gearBagDB.insert("Device", {title: device_title, img_url: device_image});
}

/* Gets all devices in database and injects them into the gear bag */
function init_saved_devices(transaction, result) {
   var i = 0;
   var results_to_html = [];
   var stored_device;

   /* Iterates over result set. Each |item| is an object with title and img */
   if (result && result.rows && result.rows.length > 0) {
      while (i < result.rows.length) {
         stored_device = result.rows.item(i++);

         results_to_html.push("<div class='device_block'><p>" + stored_device.title
          + "</p><img src='" + stored_device.img_url + "'></img></div>")
      }

      $('drop_device').innerHTML = results_to_html.join("\n");
   }
}

/* Executes on page load */
window.addEvent("domready", function() {
   gearBagDB.exec("SELECT * FROM 'Device'", init_saved_devices);
});
