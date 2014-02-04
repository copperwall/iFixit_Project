/* Source file for graphical functionality for Gear Bag project */

/* Makes each device in the 'devices' container draggable, and defines behavior
 * drop events.
 */
function dragging() {

   $$('#devices .device_block').addEvent('mousedown', function(event) {
      event.stop();

      // This refers to element with 'device_block' class
      var device = this;
      
      var clone = device.clone().setStyles(device.getCoordinates()).setStyles({
         opacity: 0.9,
         position: 'absolute'
      }).inject(document.body);

      var drag = new Drag.Move(clone, {

         droppables: $('drop_device'),

         onDrop: function(dragging, drop) {
            dragging.destroy();

            if (drop != null && !in_drop(device.getFirst().innerHTML)) {
               device.clone().inject(drop);
               add_device(device.getFirst().innerHTML, device.getElement('img').src);
            }

            if (drop)
               drop.tween('background-color', '#E0E0E0');

            if (drop && drop.contains($('drop_inner')))
               $('drop_inner').destroy();
         },
         onEnter: function(dragging, drop) {
            drop.tween('background-color', '#98B5C1');
         },
         onLeave: function(dragging, drop) {
            drop.tween('background-color', '#E0E0E0');
         },
         onCancel: function(dragging) {
            dragging.destroy();
         }
      });

      drag.start(event);
   });
}

/* Checks if there is already an instance of this device in the gear bag.
 * 
 * This function checks by comparing each of the gear bag's children's device titles
 * to the device that was dropped.
 */
function in_drop(device_name) {
   var result = false;

   $('drop_device').getChildren().forEach(function(child) {
      if (child.getFirst() && device_name === child.getFirst().innerHTML) {
         result = true;
         return;
      }
   });

   return result;
}

function full_screen() {
   console.log(document.webkitIsFullScreen);
   if (document.webkitIsFullScreen)
      document.webkitExitFullscreen();
   else
      $(document.body).webkitRequestFullscreen();
}
