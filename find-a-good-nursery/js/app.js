(function () {
    $(document).ready(function () {

        var map;
        var layer;
        var filter = "Marker = 'placemark_circle' OR Marker = 'large_blue'";
        map_and_layer = initialize(map, layer, filter);
        map = map_and_layer['map'];
        layer = map_and_layer['layer'];

        var postcodeLookup = function (postcodeToTest) {
            if (postcodeToTest in postcodes) {
                return postcodes[postcodeToTest];
            } else {
                if (postcodeToTest.length > 3) {
                    postcodePart = postcodeToTest.substring(0, 4);
                    if (postcodePart in postcodes) {
                        return postcodes[postcodePart];
                    }
                }
                if (postcodeToTest.length > 2) {
                    postcodePart = postcodeToTest.substring(0, 3);
                    if (postcodePart in postcodes) {
                        return postcodes[postcodePart];
                    }
                }
                if (postcodeToTest.length > 1) {
                    postcodePart = postcodeToTest.substring(0, 2);
                    if (postcodePart in postcodes) {
                        return postcodes[postcodePart];
                    }
                }
            }
        };

        $('#postcode').keyup(function (event) {
            if (event.keyCode === 13 || event.keyCode === 32) {
                postcodeToTest = $.trim($('#postcode').val().toUpperCase());
                $.ajax({
                    url: "https://api.postcodes.io/postcodes/" + postcodeToTest.replace(" ", ""),
                    success: function (result) {
                        if (result.status === 200 && result.hasOwnProperty('result') && result.result.hasOwnProperty('latitude')) {
                            var latlng = [result.result.latitude, result.result.longitude];
                            $('.errorMessage').addClass('notDisplayed');
                            map.panTo(new google.maps.LatLng(latlng[0], latlng[1]));
                            map.setZoom(14);
                        } else {
                            $('.errorMessage').removeClass('notDisplayed');
                        }
                    },
                    error: function () {
                        var latlng = postcodeLookup(postcodeToTest);
                        if (latlng) {
                            $('.errorMessage').addClass('notDisplayed');
                            map.panTo(new google.maps.LatLng(latlng[0], latlng[1]));
                            map.setZoom(14);
                        } else {
                            $('.errorMessage').removeClass('notDisplayed');
                        }
                    }
                });


            }
        });

        $('#filters').on('change', function () {
            var markers = [];
            $('.nurseryRating').each(function () {
                if (this.checked) {
                    markers.push("'" + this.value + "'");
                }
            });
            filter = "'Marker' IN (" + markers.join(',') + ")";
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