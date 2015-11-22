$( document ).ready(function() {

	
	//Map initializations
	var map;
	var center;
	var myLatlng;
	var lat, lng, button;

	// Call to fetch api hits.
	$.ajax({
		url: "https://zoomcar-ui.0x10.info/api/courier?type=json&query=api_hits",
		}).done(function(data) {
			n = JSON.parse(data);
			$('#hits-val').text(n.api_hits);
		});

	//Call to fetch parcel details
	$.ajax({
		url: "https://zoomcar-ui.0x10.info/api/courier?type=json&query=list_parcel",
		}).done(function(data) {
			parcels = JSON.parse(data).parcels;
			if (parcels.length){
				$('#parcels-val').text(parcels.length);
				for(var item=0; item<parcels.length; item++){
					text = '<li class="item" id="item'+item+'"><i class="fa fa-yelp bullet"></i>'+parcels[item].name+'</li>';
					$('.item-list').append(text);
					
				}
			}

			coordinates = parcels[0].live_location;
			initialize(coordinates);

			$('.item').click(function(e){
				x =e.currentTarget;
				$('.item').removeClass('selected');
				$(x).addClass('selected');
				item= x.id.substring(4);
				$('.item-image').css('background-image', 'url(' + parcels[item].image + ')')
				$('.item-name').text(parcels[item].name);
				date = new Date(parseInt(parcels[item].date)*1000);
				$('.item-date').text(date.toDateString());
				$('.item-type').text(parcels[item].type);
				$('.item-weight').text(parcels[item].weight);
				$('.item-phone').text(parcels[item].phone);
				$('.item-price').text('Rs. '+parcels[item].price);
				$('.item-quantity').text(parcels[item].quantity);
				$('.item-color').css('color',parcels[item].color);
				lat = parcels[item].live_location.latitude;
				lng = parcels[item].live_location.longitude;
			});

			$('#item0').trigger('click');
		});

	//Map initialization.
	function initialize(initial_coordinates) {
		myLatlng = new google.maps.LatLng(initial_coordinates.latitude, initial_coordinates.longitude);
		button = document.getElementById('item-list');
		google.maps.event.addDomListener(button, 'click', setMarker);

		var mapOptions = {
			zoom: 12,
			center: myLatlng
		}
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);          

		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map
		});

	}

	//Marker reset on tab change.
	function setMarker() {
		var latitude = lat;
		var longitude = lng;

		if (latitude == '' || longitude == '') {
			console.log('lat or lng not defined');
			return;
		}

		var position = new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));

		var marker = new google.maps.Marker({
			position: position,
			map:      map
		});

		map.setCenter(position);
	}
});
    
