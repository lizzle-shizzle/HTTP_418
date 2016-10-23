var myApp = angular.module("myApp", []);
	myApp.directive("myMaps", function ($http){				
		return{
			restrict:'E',
			template:'<div></div>',
			replace: true,
			link: function(scope, element, attrs){
				var dataPoints = new Array();
				var border = new Array();
				var middleLat;
				var middleLong;

				$http.get('/farm/heatData').then(function onSuccess(sailsResponse){			
					var data = sailsResponse.data.heat;
					var max = Number.MIN_VALUE;
					for(i in data) {
						if(data[i].yields > max)
							max = data[i].yields;				
					}

					//plot yield coordinates
					for(i in data) {
						dataPoints.push({location: new google.maps.LatLng(data[i].lat, data[i].long), weight: (data[i].yields/max)*5});				
					}

					//get middle of farm
					var totLat = 0;
					var totLong = 0;
					var size = sailsResponse.data.border.length;
					//plot farm border coordinates
					for(i in sailsResponse.data.border) {
						border.push({lat: sailsResponse.data.border[i].lat, lng: sailsResponse.data.border[i].long});
						totLat += sailsResponse.data.border[i].lat;
						totLong += sailsResponse.data.border[i].long;
					}						

					//get middle of farm
					middleLat = totLat/size;
					console.log(middleLong = totLong/size);

					//draw map
					initMap();					
				});						

				function initMap() {
					var myLatLng = new google.maps.LatLng(middleLat, middleLong);
					var mapOptions = {		        
					center: myLatLng,
					zoom: 15,
					mapTypeId: google.maps.MapTypeId.HYBRID
					};
					var map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);
					var marker = new google.maps.Marker({
						position: myLatLng,
						map: map,
						title:"Boschjeskop"
					});					

					var heatmap = new google.maps.visualization.HeatmapLayer({
						radius: 34,
						opacity: 0.5,
						gradient: [
							'rgba(0, 255, 255, 0)',
							'rgba(0, 255, 255, 1)',
							'rgba(0, 191, 255, 1)',
							'rgba(0, 255, 0, 1)',
							'rgba(128, 255, 0, 1)',
							'rgba(255, 255, 0, 1)',
							'rgba(255, 153, 0, 1)',
							'rgba(255, 0, 0, 1)'
						],
						maxIntensity: 2,
						data: dataPoints,
						map: map
					});		

					var outline =  new google.maps.Polygon({
						paths: border,
						strokeColor: '#ffffff',
						strokeWeight: 1,
						fillColor: '#00a87e',
						fillOpacity: 0.2
					});		

					outline.setMap(map);										
				}						
			}
		};
});