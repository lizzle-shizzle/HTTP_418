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
				  mapTypeId: google.maps.MapTypeId.HYBRID
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
					new google.maps.LatLng(-25.3566361, 30.871541666666666),
					{location: new google.maps.LatLng(-25.35659168713195, 30.863138437271118), weight: 2},
					{location: new google.maps.LatLng(-25.35750303437902, 30.86309552192688), weight: 2},
					{location: new google.maps.LatLng(-25.357173398933746, 30.864189863204956), weight: 2},
					new google.maps.LatLng(-25.3573667, 30.866388888888892),
					{location: new google.maps.LatLng(-25.35647534443572, 30.865284204483032), weight: 2},
					{location: new google.maps.LatLng(-25.356533515797825, 30.866636037826538), weight: 2},
					new google.maps.LatLng(-25.3569583, 30.867955555555557),
					{location: new google.maps.LatLng(-25.358777939478905, 30.867877900600433), weight: 0.2},
					{location: new google.maps.LatLng(-25.359795914885765, 30.868510901927948), weight: 0.2},
					{location: new google.maps.LatLng(-25.35855, 30.869172222222222), weight: 0.2},
					{location: new google.maps.LatLng(-25.356077839378884, 30.869642794132233), weight: 2},
					new google.maps.LatLng(-25.3559722, 30.868458333333333),
					{location: new google.maps.LatLng(-25.3538472, 30.872141666666668), weight: 0.5},
					new google.maps.LatLng(-25.35153067636155, 30.876377820968628),
					new google.maps.LatLng(-25.351714893112053, 30.873507857322693),
					new google.maps.LatLng(-25.35027023843466, 30.87758481502533),
					new google.maps.LatLng(-25.351021654934023, 30.877823531627655),
					new google.maps.LatLng(-25.35174397994176, 30.878180265426636),
					new google.maps.LatLng(-25.35382851785165, 30.878475308418274),
					new google.maps.LatLng(-25.35437146136183, 30.87931215763092),
					new google.maps.LatLng(-25.3542083, 30.880683333333334),
					{location: new google.maps.LatLng(-25.3551667, 30.880175), weight: 0.5},
					new google.maps.LatLng(-25.3554667, 30.881102777777777),
					{location: new google.maps.LatLng(-25.3558972, 30.87966666666667), weigth: 0.2},
					new google.maps.LatLng(-25.3559944, 30.878680555555555),
					{location: new google.maps.LatLng(-25.3537, 30.87570277777778), weight: 3},
					{location: new google.maps.LatLng(-25.3536472, 30.874861111111112), weight: 2},
					new google.maps.LatLng(-25.354342375164165, 30.87754189968109),
					new google.maps.LatLng(-25.355059832664345, 30.878486037254333),
					{location: new google.maps.LatLng(-25.3546528, 30.876358333333332), weight: 3},
					new google.maps.LatLng(-25.35469140907441, 30.87460219860077),
					{location: new google.maps.LatLng(-25.354701104446413, 30.875460505485535), weight: 2},
					new google.maps.LatLng(-25.355302215992882, 30.87761700153351),
					new google.maps.LatLng(-25.35306257553998, 30.877429246902466),
					new google.maps.LatLng(-25.351569458858656, 30.87504744529724),
					new google.maps.LatLng(-25.352345106188963, 30.87206482887268),
					new google.maps.LatLng(-25.35257779941788, 30.870991945266724),
					new google.maps.LatLng(-25.3529268384217, 30.86987614631653),
					{location: new google.maps.LatLng(-25.35546703637873, 30.870377719402313), weight: 2}
,				];

				var heatmap = new google.maps.visualization.HeatmapLayer({
					data: dataPoints,
					map: map
				});

				heatmap.set('radius', 35);
			}
		};
});