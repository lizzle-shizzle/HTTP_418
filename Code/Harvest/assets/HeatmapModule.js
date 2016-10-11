var myApp = angular.module("myApp", []);
	myApp.directive("myMaps", function (){
		return{
			restrict:'E',
			template:'<div></div>',
			replace: true,
			link: function(scope, element, attrs){
				var myLatLng = new google.maps.LatLng(-25.355, 30.874);
				var mapOptions = {		        
				  center: myLatLng,
				  zoom: 16,
				  mapTypeId: google.maps.MapTypeId.SATELLITE
				};
				var map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);
				var marker = new google.maps.Marker({
					position: myLatLng,
					map: map,
					title:"Boschjeskop"
				});
				marker.setMap(map);

// https://doc-0o-1g-docs.googleusercontent.com/docs/securesc/quqsb65qrsl7tsl6ucr6qs323fgu2ss3/4r99mkbok08me64eqp3bk8hugplhtugh/1475762400000/09896779027837834603/09896779027837834603/0B4N9k6WQY-GmRXgyaS0wTDdjNkk?e=download&gd=true&access_token=ya29.Ci90A9sYRU_XQ3raTTJxr8R3xvq_X5uxAee_PyYCtzB0_ZRwstg4bbDkveEfefa3mg
				/*var ctaLayer = new google.maps.KmlLayer({
					url: 'https://drive.google.com/open?id=0B4N9k6WQY-GmRXgyaS0wTDdjNkk',
					polygon: true,
					map: map
				});*/

				var dataPoints = [					
					new google.maps.LatLng(-25.356875, 30.873619444444444),
					new google.maps.LatLng(-25.3566361, 30.871541666666666),
					{location: new google.maps.LatLng(-25.3570333, 30.86349166666667), weight: 3},
					new google.maps.LatLng(-25.3573667, 30.866388888888892),
					{location: new google.maps.LatLng(-25.3564917, 30.86576666666667), weight: 2},
					new google.maps.LatLng(-25.3569583, 30.867955555555557),
					new google.maps.LatLng(-25.3590722, 30.86797222222222),
					new google.maps.LatLng(-25.35855, 30.869172222222222),
					{location: new google.maps.LatLng(-25.3556667, 30.869977777777777), weight: 2},
					new google.maps.LatLng(-25.3559722, 30.868458333333333),
					{location: new google.maps.LatLng(-25.3538472, 30.872141666666668), weight: 0.5},
					new google.maps.LatLng(-25.351825, 30.87575),
					new google.maps.LatLng(-25.3515972, 30.874280555555558),
					{location: new google.maps.LatLng(-25.35075, 30.87772777777778), weight: 2},
					new google.maps.LatLng(-25.3531361, 30.877583333333334),
					new google.maps.LatLng(-25.3539611, 30.878680555555555),
					new google.maps.LatLng(-25.3542083, 30.880683333333334),
					{location: new google.maps.LatLng(-25.3551667, 30.880175), weight: 0.5},
					new google.maps.LatLng(-25.3554667, 30.881102777777777),
					{location: new google.maps.LatLng(-25.3558972, 30.87966666666667), weigth: 0.2},
					new google.maps.LatLng(-25.3559944, 30.878680555555555),
					{location: new google.maps.LatLng(-25.3537, 30.87570277777778), weight: 3},
					{location: new google.maps.LatLng(-25.3536472, 30.874861111111112), weight: 2},
					new google.maps.LatLng(-25.3546694, 30.878091666666666),
					new google.maps.LatLng(-25.3546528, 30.876358333333332)
				];

				var heatmap = new google.maps.visualization.HeatmapLayer({
					data: dataPoints,
					map: map
				});

				heatmap.set('radius', 30);
			}
		};
});