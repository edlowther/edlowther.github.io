(function () {
    $(document).ready(function () {

        var steps, marker, map, directionsService, directionsDisplay;
        
        function getReaderSpeed() {
            readerDistanceValue = parseFloat($('#readerDistance').text());
            var readerSpeed = (readerDistanceValue / parseFloat($('#readerTime').val())) * 60;
            $('#readerSpeed').text(Math.round(readerSpeed * 10) / 10);
            if (readerSpeed < 2) {
                $('.surprisingResult.slow').show(); 
            } else {
                $('.surprisingResult.slow').hide(); 
            }
            if (readerSpeed > 25) {
                $('.surprisingResult.fast').show(); 
                $('.comparison').hide(); 
            } else {
                $('.surprisingResult.fast').hide(); 
                $('.comparison').show(); 
            }
            return readerSpeed; 
        }; 

        function setUpMap() {
            directionsService = new google.maps.DirectionsService;
            directionsDisplay = new google.maps.DirectionsRenderer;
            map = new google.maps.Map($('#map')[0], {
                zoom: 7,
                center: {
                    lat: 51,
                    lng: -1
                }
            });
            directionsDisplay.setMap(map);
        };

        function getDirections() {

            var origin = $('#homePostcode').val();
            var destination = $('#workPostcode').val();

            directionsService.route({
                origin: origin,
                destination: destination,
                travelMode: 'BICYCLING'
            }, function (response, status) {
                if (status === 'OK') {
                    steps = response.routes[0].legs[0].steps;
                    var distanceInMetres = response.routes[0].legs[0].distance.value;
                    var distanceInMiles = Math.round(distanceInMetres * 0.000621371 * 100) / 100;
                    $('#readerDistance').text(distanceInMiles);
                    if (distanceInMiles === 1.0) {
                        $('#distancePlural').hide();
                    } else {
                        $('#distancePlural').show();
                    }
                    directionsDisplay.setDirections(response);
                    $('.stepTwo').show();
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });

        };

        function clearMarker() {
            if (marker) {
                marker.setMap(null);
            };
        };

        function getComparisonWithOlympian(readerSpeed, olympianCyclist) {

            var olympianTime = readerDistanceValue / olympianCyclist.speed * 60;
            var olympianMinutes = Math.floor(olympianTime);
            $('.' + olympianCyclist.class + '.totalDuration.minutes').text(olympianMinutes);
            var olympianSeconds = Math.round((olympianTime - olympianMinutes) * 60);
            if (olympianSeconds > 0) {
                $('.' + olympianCyclist.class + '.totalDuration.seconds').text(' and ' + olympianSeconds + ' seconds');
            };
            var olympianSpeedMultiple = Math.round(olympianCyclist.speed / readerSpeed * 10) / 10;
            $('.' + olympianCyclist.class + '.multiple').text(olympianSpeedMultiple);

            //The only variable needed later
            return olympianTime;

        };

        function addMarkerToMap(olympianTime, readerSpeed) {
            var readerDistanceInTimeOlympianTakes = readerSpeed * (olympianTime / 60);
            var runningTotalInMetres = 0;
            $.each(steps, function (index, step) {
                var stepDistance = step.distance.value;
                runningTotalInMetres += stepDistance;
                var runningTotalInMiles = runningTotalInMetres * 0.000621371;
                if (runningTotalInMiles >= readerDistanceInTimeOlympianTakes) {
                    runningTotalInMetres -= stepDistance;
                    runningTotalInMiles = runningTotalInMetres * 0.000621371;
                    var service = new google.maps.DistanceMatrixService;
                    var destinations = [];
                    $.each(step.lat_lngs, function (index, lat_lng) {
                        destinations.push({
                            lat: lat_lng.lat(),
                            lng: lat_lng.lng()
                        })
                    });
                    //                            while (destinations.length > 25) {
                    //                                destinations = destinations.filter(function (element, index) {
                    //                                    return index % 2 === 1;
                    //                                });
                    //                            }; 
                    var origin = {
                        lat: step.start_location.lat(),
                        lng: step.start_location.lng()
                    };

                    function getDistance(origin, destinations) {
                        var halfway = Math.round(destinations.length / 2);
                        service.getDistanceMatrix({
                            origins: [origin],
                            destinations: [destinations[halfway]],
                            travelMode: 'BICYCLING',
                            unitSystem: google.maps.UnitSystem.METRIC,
                            avoidHighways: false,
                            avoidTolls: false
                        }, function (response, status) {
                            if (status !== 'OK') {
                                alert('Error was: ' + status);
                            } else {
                                distance = response.rows[0].elements[0].distance.value;
                                runningTotalInMetres += distance;
                                runningTotalInMiles = runningTotalInMetres * 0.000621371;

                                if (runningTotalInMiles > readerDistanceInTimeOlympianTakes) {
                                    destinations = destinations.slice(0, halfway);
                                    runningTotalInMetres -= distance;
                                } else {
                                    destinations = destinations.slice(halfway, destinations.length);
                                    origin = destinations[0];
                                }
                                if (destinations.length > 2) {
                                    getDistance(origin, destinations);
                                } else {
                                    marker = new google.maps.Marker({
                                        position: destinations[0],
                                        map: map
                                    })
                                }
                            }
                        });
                    };
                    getDistance(origin, destinations);
                    return false;
                }
            })

        }; 


        $('#readerTime').on('change', function () {
            var readerTimeValue = parseFloat($('#readerTime').val());
            if (readerTimeValue === 1.0) {
                $('#timePlural').hide();
            } else {
                $('#timePlural').show();
            }
        });
        
        $('.textInput').on('keyup', function(event) {
            if (event.keyCode === 13) {
                clearMarker();
                getDirections();
            }
        }); 

        $('#getDirections').on('click', function () {
            clearMarker();
            getDirections();
        });

        $('#calculate').on('click', function () {
            clearMarker();
            var readerSpeed = getReaderSpeed(); 
            $.each(olympianCyclistData, function (index, olympianCyclist) {

                var olympianTime = getComparisonWithOlympian(readerSpeed, olympianCyclist);

                if (olympianCyclist.markOnMap === true) {
                    addMarkerToMap(olympianTime, readerSpeed);
                }
            });
            $('#results').show();
            $('html,body').animate({
                scrollTop: $("#results").offset().top},
                'slow');
        }); 

        setUpMap();
    })
})();