/**
 * FarmController
 *
 * @description :: Server-side logic for managing farms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//Load the create farm page -> new.ejs
	new: function(req, res) {
		//return to homepage if not logged in
		//cannot create farm if not logged in
		if (!req.session.me) {
	      return res.view('homepage');
	    }
		res.view({layout: "signedInLayout", title: "Create new farm"});
	},

	create: function (req, res) {
	    // Create farm from pramaters sent from
	    // create farm form -> new.ejs
	    Farm.create({
	    	name: req.param("fname"),
	    	size: req.param("fsize"),
			province: req.param("province"),
			region: req.param("region"),
			farmingRegion: req.param("fRegion"),
			registeredFarmName: req.param("regFname"),
			portionNumber: req.param("num"),
			companyName: req.param("cname"),
	    	farmer: req.session.me
	    }, function farmCreated(err, farm) {
	    	//If there is an error 
	    	//return appropiate error message
	    	if(err) return res.negotiate(err);

	    	//If farm created sucessfully
	    	//Add to farmer
	    	User.find()
	    	.populate('farms')
	    	.exec(function farmLinked(err, user) {
	    		if(err) return res.negotiate(err);

	    		//If sucessfull go back to dashboard
	    		return res.redirect("/");
	    	});    	
	    });
	},

	//show edit farm -> /farm/edit.ejs
	edit: function(req, res) {
		if (!req.session.me) {
	      return res.view('homepage');
	    }

	    //Get farm linked to logged in farmer
	    //send farm as json
		User.findOne({id: req.session.me})
		.populate("farms")
		.exec(function (err, user) {
			//If there is an error 
	    	//return appropiate error message
			if(err) return res.negotiate(err);

			res.view({layout: "signedInLayout", title: "Edit farm", farm: user.farms[0]});
		});
	},

	update: function(req, res) {
		Farm.update({id: req.param("id")}, {
			name: req.param("fname"),
			size: req.param("fsize"),
			province: req.param("province"),
			region: req.param("region"),
			farmingRegion: req.param("fRegion"),
			registeredFarmName: req.param("regFname"),
			portionNumber: req.param("num"),
			companyName: req.param("cname"),
		}, function farmUpdated(err) {
			//If there is an error 
	    	//return appropiate error message
			if(err) return res.negotiate(err);

			//If sucessfull go back to dashboard
	    	return res.redirect("/");
		});
	},

	heatData: function(req, res) {
		var yields = [
			{lat: -25.35659168713195, long: 30.863138437271118, yield: 20},
			{lat: -25.3566361, long: 30.871541666666666, yield: 12},
			{lat: -25.35750303437902, long: 30.86309552192688, yield: 59},
			{lat: -25.357173398933746,long: 30.864189863204956, yield: 32},
			{lat: -25.3573667, long: 30.866388888888892, yield: 46},
			{lat: -25.35647534443572, long: 30.865284204483032, yield: 60},
			{lat: -25.356533515797825, long: 30.866636037826538, yield: 62},
			{lat: -25.3569583, long: 30.867955555555557, yield: 13},
			{lat: -25.358777939478905, long: 30.867877900600433, yield: 17},
			{lat: -25.359795914885765, long: 30.868510901927948, yield: 26},
			{lat: -25.35855, long: 30.869172222222222, yield: 86},
			{lat: -25.356077839378884, long: 30.869642794132233, yield: 14},
			{lat: -25.3559722, long: 30.868458333333333, yield: 10},
			{lat: -25.3538472, long: 30.872141666666668, yield: 19},
			{lat: -25.35153067636155, long: 30.876377820968628, yield: 46},
			{lat: -25.351714893112053, long: 30.873507857322693, yield: 78},
			{lat: -25.35027023843466, long: 30.87758481502533, yield: 21},
			{lat: -25.351021654934023, long: 30.877823531627655, yield: 36},
			{lat: -25.35174397994176, long: 30.878180265426636, yield: 47},
			{lat: -25.35382851785165, long: 30.878475308418274, yield: 23},
			{lat: -25.35437146136183, long: 30.87931215763092, yield: 14},
			{lat: -25.3542083, long: 30.880683333333334, yield: 19},
			{lat: -25.3551667, long: 30.880175, yield: 13},
			{lat: -25.3554667, long: 30.881102777777777, yield: 17},
			{lat: -25.3558972, long: 30.87966666666667, yield: 89},
			{lat: -25.3559944, long: 30.878680555555555, yield: 26},
			{lat: -25.3537, long: 30.87570277777778, yield: 14},
			{lat: -25.3536472, long: 30.874861111111112, yield: 78},
			{lat: -25.354342375164165, long: 30.87754189968109, yield: 35},
			{lat: 25.355059832664345, long: 30.878486037254333, yield: 48},
			{lat: -25.3546528, long: 30.876358333333332, yield: 28},
			{lat: -25.35469140907441, long: 30.87460219860077, yield: 26},
			{lat: -25.354701104446413, long: 30.875460505485535, yield: 78},
			{lat: -25.355302215992882, long: 30.87761700153351, yield: 64},
			{lat: -25.35306257553998, long: 30.877429246902466, yield: 84},
			{lat: -25.351569458858656, long: 30.87504744529724, yield: 82},
			{lat: -25.352345106188963, long: 30.87206482887268, yield: 23},
			{lat: -25.35257779941788, long: 30.870991945266724, yield: 48},
			{lat: -25.3529268384217, long: 30.86987614631653, yield: 26},
			{lat: -25.35546703637873, long: 30.870377719402313, yield: 14}
		];

		res.json({data: yields});
	}
};

