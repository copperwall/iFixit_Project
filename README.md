# iFixit Project

This project is for [iFixit](http://ifixit.com). It is a web app that presents users with a list of all iFixit devices, and allows them to put them in their "gear bag". All devices in their gear bag are saved in the browser's local storage.

## Tools

This project will make use of:

*  The iFixit API
*  Mootools (For drag and drop capabilities)
*  HTML5 Web SQL (For local storage)

## Organization

The project is divided into three main areas.

*  API - Using the iFixit API to gather device images to place in the web app.
*  Storage - HTML Web SQL through Mootools. This will allow local storage of saved devices.
*  UI - Drag and drop capability. This will be done through Mootools.

## Current Functionality 
### **NOTICE:** Need to reimplement in Mootools

*  Drag and Drop
   *  Blocks that are dragged in the droppable area are then snapped into order and appended to that div.
   *  Reverts to original position when not dropped in droppable zone
*  Droppable area grows with number of blocks dropped in it. (May have to use scrolling to realistically fit a large number.)
   *  Removes helper text when device is dropped into droppable area.
*  Draggable items arrange themselves in a grid, and parent container grows with it. (Also will need to be paginated or scrollable to fit all items.)

