$(function() {
   /* Used to hold the "Drop Devices Here" element after dropping a device
    * into the droppable area.
    */
   var detached_helper_text;

    $( ".device" ).draggable({ revert: "invalid", stack: ".device" });
 
    $( "#drop_device" ).droppable({
      activeClass: "ui-state-default",
      hoverClass: "ui-state-hover",
      drop: function( event, ui ) {
        $(this).append(ui.draggable.css( { position: "static"}));

        if ($.contains(document.getElementById("drop_device"),
           document.getElementById("drop_inner"))) {
            detached_helper_text = $("#drop_inner").detach();
        }
      }
    });
  });

