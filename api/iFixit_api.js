/* Source file for communicating with the iFixit API */

/* Starts by getting an array of X category names from /categories/all?limit=X
 * and then runs each through /search/{query}?filter=category&limit=1.
 *
 * So far this has been successful in retrieving a datatype: "wiki" object that
 * has 

/* Keeps track of offset value to request from API */
var offset = 0;
var limit = 9;
var counter = 0;
var lock = false;

/* Requests category name from API */
function get_device(query) {
	var get_from_API = new Request.JSON({
		url: "https://www.ifixit.com/api/2.0/categories/" + query
		 + "?callback=?",
		onSuccess: function(response) {
			var device = response;

         if (response && response.image) {
            devices.innerHTML += parse_to_HTML(response);
         }
         else {
            console.log("Entry not found for: " + query);
         }

         request_callback();
		}
	}).get();
}

/* Request categories/all with the proper offset */
function get_category_names() {
	var get_device_names = new Request.JSON({
		url: "https://www.ifixit.com/api/2.0/categories/all?limit=" + limit + "&offset="
		 + offset + "&callback=?",
		onSuccess: function(categories) {
			categories.forEach(function(category) {
				get_device(category);
			});
		}
	}).get();
}

/* Request next category names and increment the offset */
function devices_next() {
   if (!lock) {
      lock = true;

      $('devices').style.visibility = "hidden";
      devices.innerHTML = "";
      offset += limit;
      get_category_names();

      if (offset > 0 && document.getElementById('devices_prev').disabled) {
         document.getElementById('devices_prev').removeAttribute("disabled");
      }
   }
}

/* Request previous category names */
function devices_prev() {
   if (!lock) {
      lock = true;

      $('devices').style.visibility = "hidden";
      devices.innerHTML = "";
      offset -= limit;
      get_category_names();

      if (offset == 0) {
         document.getElementById('devices_prev').disabled = "disabled";
      }
   }
}

/* Takes the category object from the API response and 
 * returns a valid string of HTML
 */
function parse_to_HTML(category) {
   var div = "<div class='device_block'>";
   var text = "<p>" + category.wiki_title.substring(0, 25) + "</p>";
   var picture = "<img src='" + category.image.thumbnail + "'>";

   return div + text + picture + "</div>";
}

/* Runs after each api request succeeds.
 * 
 * After all requests have succeeded, makes all new devices draggable
 * and sets contents of the devices container to visible.
 */
function request_callback() {
   ++counter;

   if (counter == limit) {
      dragging();
      $('devices').style.visibility = "visible";
      counter = 0;
      lock = false;
   }
}
