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
		//mock data, to be inserted in db later
		var mockBorder = [
			{lat: -25.35634855746918, long: 30.8617322834678},
			{lat: -25.35949141492198, long: 30.86288407090919},
			{lat: -25.36103945846883, long: 30.87024236402375},
			{lat: -25.35868078281663, long: 30.87711058961861},
			{lat: -25.35586971760071, long: 30.87611690257612},
			{lat: -25.35702058759753, long: 30.88115029638944},
			{lat: -25.35487953259318, long: 30.88786754971278},
			{lat: -25.34955361388689, long: 30.88643029263311},
			{lat: -25.35121514593823, long: 30.8808530510081},
			{lat: -25.34622749811845, long: 30.88257329394363},
			{lat: -25.35634855746918, long: 30.8617322834678},
		];
		Yields.find().exec(function(err, yields) {
			res.json({heat: yields, border: mockBorder});
		});	
	}
};

