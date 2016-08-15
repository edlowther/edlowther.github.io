(function() {
	$(document).ready( function() {

		var readerDistanceInput = $('#readerDistance'); 
		var readerDistanceValue = parseFloat(readerDistanceInput.val()); 
		var distancePluralSpan = $('#distancePlural'); 

		var readerTimeInput = $('#readerTime'); 
		var readerTimeValue = parseFloat(readerTimeInput.val()); 
		var timePluralSpan = $('#timePlural'); 

		var submitButton = $('#submit'); 

		var resultsDiv = $('#results'); 

		var readerSpeedSpan = $('#readerSpeed'); 
		var teamGBTimeSpan = $('#teamGBTime'); 

		readerDistanceInput.on('change', function() {
			readerDistanceValue = parseFloat(readerDistanceInput.val());  
			if (readerDistanceValue === 1.0) {
				distancePluralSpan.hide(); 
			} else {
				distancePluralSpan.show(); 
			}
		}); 

		readerTimeInput.on('change', function() {
			readerTimeValue = parseFloat(readerTimeInput.val());  
			if (readerTimeValue === 1.0) {
				timePluralSpan.hide(); 
			} else {
				timePluralSpan.show(); 
			}
		}); 

		submitButton.on('click', function() {
			var readerSpeed = Math.round((readerDistanceValue / readerTimeValue) * 60 * 10) / 10; 
			readerSpeedSpan.text(readerSpeed); 
			teamGBTimeSpan.text(Math.round((readerDistanceValue / 37) * 60)); 
			resultsDiv.show(); 
		}); 


		var directionsService = new google.maps.DirectionsService;

		directionsService.route({
          origin: "New+York,+NY",
          destination: "Boston,+MA",
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            console.log(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });

		// var baseUrl = 'https://maps.googleapis.com/maps/api/directions/json?origin=New+York,+NY&destination=Boston,+MA&key=AIzaSyDA15h8Tc8heTEyBaip3detK9sjgX1Yq7Y';

  //       $.ajax({
  //           url: baseUrl,
  //           type: 'GET', 
  //           dataType: 'json',
  //           success: function (response) {
  //           	console.log(response); 
  //           },
  //           error: function (e) {
  //           	console.log(e); 
  //           }
  //       });


	})
})(); 