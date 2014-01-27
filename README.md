# iFixit Project

This repo is for a project for [iFixit](http://ifixit.com). Everything in here right now is a prototype to help me better understand some of the tools I'll be using.

## Tools

As of now, this project should make use of:

*  The iFixit API
*  jQuery/jQueryUI (For drag and drop capabilities)
*  HTML5 IndexedDB (For local storage)

**NOTICE:** Everything here is subject to change until I get a more in-depth specification. Changes in spec, tool use, and requirements will be reflected here.

## Current Functionality

*  Drag and Drop
   *  Blocks that are dragged in the droppable area are then snapped into order and appended to that div.
   *  Reverts to original position when not dropped in droppable zone
*  Droppable area grows with number of blocks dropped in it. (May have to use scrolling to realistically fit a large number.)
   *  Removes helper text when device is dropped into droppable area.
*  Draggable items arrange themselves in a grid, and parent container grows with it. (Also will need to be paginated or scrollable to fit all items.)


## Upcoming Changes

*  Dragging blocks out of an overflow:scroll parent seems to cause some problems, will have to look into that.
*  Need a way to remove blocks from droppable area once they've been dropped. They currently can't be removed once dropped.
