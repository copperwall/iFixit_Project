$(function() {
    $( ".device" ).draggable({ revert: "invalid", stack: ".device" });
 
    $( "#drop_device" ).droppable({
      activeClass: "ui-state-default",
      hoverClass: "ui-state-hover",
      drop: function( event, ui ) {
        $(this).append(ui.draggable.css( { position: "static"}));
      }
    });
  });