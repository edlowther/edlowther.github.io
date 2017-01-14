(function() {
	$(document).ready( function() {

		var map; 
		var layer; 
		var filter = "Marker = 'placemark_circle' OR Marker = 'large_blue'"; 
		map_and_layer = initialize(map, layer, filter);
		map = map_and_layer['map']; 
		layer = map_and_layer['layer'];  

		var postcodeLookup = function(postcodeToTest) {
			if (postcodeToTest in postcodes) {
				return postcodes[postcodeToTest];  
			} else { 
				if (postcodeToTest.length > 3) {
					postcodePart = postcodeToTest.substring(0, 4); 
					console.log(postcodePart); 
					if (postcodePart in postcodes) {
						return postcodes[postcodePart];
					}
				} if (postcodeToTest.length > 2) {
					postcodePart = postcodeToTest.substring(0, 3); 
					console.log(postcodePart); 
					if (postcodePart in postcodes) {
						return postcodes[postcodePart]; 
					}
				} if (postcodeToTest.length > 1) {
					postcodePart = postcodeToTest.substring(0, 2); 
					console.log(postcodePart); 
					if (postcodePart in postcodes) {
						return postcodes[postcodePart]; 
					}
				}
			}
		}; 

		$('#postcode').keyup(function(event) {
			if (event.keyCode === 13 || event.keyCode === 32) {
				postcodeToTest = $.trim($('#postcode').val().toUpperCase()); 
				var latlng = postcodeLookup(postcodeToTest); 
				console.log(latlng); 
				map.panTo(new google.maps.LatLng(latlng[0], latlng[1])); 
				map.setZoom(14);
			}
		}); 

		$('#filters').on('change', function() {
			console.log("filters changed"); 
			var markers = []; 
			$('.nurseryRating').each(function(){ 
				if (this.checked) {
					markers.push("'" + this.value + "'"); 
				}
			});
			console.log(markers); 
			filter = "'Marker' IN (" + markers.join(',') + ")"; 
			console.log(filter); 
			layer.setOptions({
            query: {
              select: "col4",
              from: "1NVngiWyLZULKjvNpyDamWAj35Y2SQyIUZt1b-UYM",
              where: filter
            }
          });
		});  
	})
})(); 