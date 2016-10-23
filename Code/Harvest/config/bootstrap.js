/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  /*var mockOrchard = [
    {'name':'Field 1',
      'farm': '57c5628a468beb781d602c00'},
    {'name':'Field 2',
      'farm': '57c5628a468beb781d602c00'}
  ];

  OrchardBlock.count().exec(function(err, count) {
    //Count orchardd block to see if data already exist
    if(err) {
      sails.log.error("An error occured creating mock data: " + error.data.message);
      return cb(error);
    }

    if(count > 0) return cb();

    OrchardBlock.create(mockOrchard).exec(cb);
  });*/
  //cb();

  var yields = [
			{lat: -25.35659168713195, long: 30.863138437271118, yields: 20},
			{lat: -25.3566361, long: 30.871541666666666, yields: 12},
			{lat: -25.35750303437902, long: 30.86309552192688, yields: 59},
			{lat: -25.357173398933746,long: 30.864189863204956, yields: 32},
			{lat: -25.3573667, long: 30.866388888888892, yields: 46},
			{lat: -25.35647534443572, long: 30.865284204483032, yields: 60},
			{lat: -25.356533515797825, long: 30.866636037826538, yields: 62},
			{lat: -25.3569583, long: 30.867955555555557, yields: 13},
			{lat: -25.358777939478905, long: 30.867877900600433, yields: 17},
			{lat: -25.359795914885765, long: 30.868510901927948, yields: 26},
			{lat: -25.35855, long: 30.869172222222222, yields: 86},
			{lat: -25.356077839378884, long: 30.869642794132233, yields: 14},
			{lat: -25.3559722, long: 30.868458333333333, yields: 10},
			{lat: -25.3538472, long: 30.872141666666668, yields: 19},
			{lat: -25.35153067636155, long: 30.876377820968628, yields: 46},
			{lat: -25.351714893112053, long: 30.873507857322693, yields: 78},
			{lat: -25.35027023843466, long: 30.87758481502533, yields: 21},
			{lat: -25.351021654934023, long: 30.877823531627655, yields: 36},
			{lat: -25.35174397994176, long: 30.878180265426636, yields: 47},
			{lat: -25.35382851785165, long: 30.878475308418274, yields: 23},
			{lat: -25.35437146136183, long: 30.87931215763092, yields: 14},
			{lat: -25.3542083, long: 30.880683333333334, yields: 19},
			{lat: -25.3551667, long: 30.880175, yields: 13},
			{lat: -25.3554667, long: 30.881102777777777, yields: 17},
			{lat: -25.3558972, long: 30.87966666666667, yields: 89},
			{lat: -25.3559944, long: 30.878680555555555, yields: 26},
			{lat: -25.3537, long: 30.87570277777778, yields: 14},
			{lat: -25.3536472, long: 30.874861111111112, yields: 78},
			{lat: -25.354342375164165, long: 30.87754189968109, yields: 35},
			{lat: 25.355059832664345, long: 30.878486037254333, yields: 48},
			{lat: -25.3546528, long: 30.876358333333332, yields: 28},
			{lat: -25.35469140907441, long: 30.87460219860077, yields: 26},
			{lat: -25.354701104446413, long: 30.875460505485535, yields: 78},
			{lat: -25.355302215992882, long: 30.87761700153351, yields: 64},
			{lat: -25.35306257553998, long: 30.877429246902466, yields: 84},
			{lat: -25.351569458858656, long: 30.87504744529724, yields: 82},
			{lat: -25.352345106188963, long: 30.87206482887268, yields: 23},
			{lat: -25.35257779941788, long: 30.870991945266724, yields: 48},
			{lat: -25.3529268384217, long: 30.86987614631653, yields: 26},
			{lat: -25.35546703637873, long: 30.870377719402313, yields: 14}
		];

    Yields.count().exec(function(err, count) {
      //Count orchardd block to see if data already exist
      if(err) {
        sails.log.error("An error occured creating mock data: " + error.data.message);
        return cb(error);
      }

      if(count > 0) return cb();

      Yields.create(yields).exec(cb);
    });
};
