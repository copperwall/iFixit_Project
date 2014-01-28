/* Source file for communicating with the iFixit API */

/* Starts by getting an array of X category names from /categories/all?limit=X
 * and then runs each through /search/{query}?filter=category&limit=1.
 *
 * So far this has been successful in retrieving a datatype: "wiki" object that
 * has 

/* Keeps track of offset value to request from API */
var offset = 0;

/* Requests API search on category name
 * Specifically, it searches with category filter and limits to the first one.
 * The first one has so far been tested to be equivalent to the query.
 */
function search_devices(query) {
	var search_API = new Request.JSON({
		url: "https://www.ifixit.com/api/2.0/search/" + query
		 + "?filter=category&limit=1",
		onSuccess: function(response) {
			var device = response.results[0];

			/* Testing: This while write directly to a DOM element eventually */
			document.write(device.title + " <img src='" + device.image.thumbnail
			 + "'><br/>");
		}

	}).get();
}

/* Request categories/all with the proper offset */
function get_category_names() {
	var get_device_names = new Request.JSON({
		url: "https://www.ifixit.com/api/2.0/categories/all?limit=20&offset="
		 + offset,
		onSuccess: function(categories) {
			categories.forEach(function(category) {
				search_devices(category);
			});
		}
	}).get();
}

/* Request next category names and increment the offset */
function devices_next() {
	get_category_names();
	offset += 20;
}

/* Request previous category names */
function devices_prev() {
	offset -= 20;
	get_category_names();
}
