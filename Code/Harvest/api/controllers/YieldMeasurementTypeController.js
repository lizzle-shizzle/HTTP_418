/**
 * YieldMeasurementtypeController
 *
 * @description :: Server-side logic for managing Yieldmeasurementtypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	view: function(req, res) {
        if (!req.session.me) {
	      return res.view('homepage');
	    }

		User.findOne({id: req.session.me})
		.populate("farms")
		.exec(function (err, user) {
			//If there is an error 
	    	//return appropiate error message
			if(err) return res.negotiate(err);

			if(user.farms[0] == null)
        		return res.view('farm/new', {layout: "signedInLayout", title: "Create new farm"});

			//get farm linked to user and fetch all Orchardblocks
			/*OrchardBlock.find({farm: user.farms[0].id})
			.populateAll()
			.exec(function(err, orchard) {
				if(err) return res.negotiate(err);				
				//send all orchard blocks linked to farm
				res.view({type: orchard, 
				layout: "signedInLayout"});				
			});*/
			YieldMeasurementType.find()
			.exec(function(err, yieldType) {
				if(err) return res.negotiate(err);				
				//send all orchard blocks linked to farm
				res.view("yieldMeasurementType/view", {type: yieldType, 
				layout: "signedInLayout"});
			});
		});        
    },

    new: function(req, res) {
		//return to homepage if not logged in
		//cannot create yield type if not logged in
		if (!req.session.me) {
	      return res.view('homepage');
	    }
		User.findOne({id: req.session.me})
		.populate("farms")
		.exec(function (err, user) {
			//If there is an error 
	    	//return appropiate error message
			if(err) return res.negotiate(err);
			
			res.view("yieldMeasurementType/new", {layout: "signedInLayout", title: "Create yield measurement type"});				
		});				
	},

    create: function (req, res) {
		//redirect to homepage if user not logged in
		if (!req.session.me) {
	      return res.view('homepage');
	    }
	    User.findOne({id: req.session.me})
	      .populate("farms")
	      .exec(function (err, user) {
        	YieldMeasurementType.create({name: req.param("newYieldType"), farm: user.farms[0]}, function(err, yield) {
	    	if(err) return res.negotiate(err);						
			return res.redirect("/yieldMeasurementType/view");	
			});	    	
        });
	},	

	edit: function(req, res) {		
		//return to homepage if not logged in
		//cannot edit crop type if not logged in
		if (!req.session.me) {
	      return res.view('homepage');
	    }
		User.findOne({id: req.session.me}) 
		.populate("farms")
		.exec(function (err, user) {
			//If there is an error 
	    	//return appropiate error message
			if(err) return res.negotiate(err);
			
			// find all yield types
			YieldMeasurementType.findOne({id: req.param("id")}).exec(function(err, yieldType) {
				if(err) return res.negotiate(err);

				
				//send all orchard blocks linked to farm and croptypes that exist
				res.view("yieldMeasurementType/edit", {data: {
					type: yieldType,
					id: req.param("id")},					
				layout: "signedInLayout", title: "Edit yield measurement type"});
			});							
		});
	},

	update: function(req, res) {		
		//return to homepage if not logged in
		//cannot edit crop type if not logged in
		if (!req.session.me) {
	      return res.view('homepage');
	    }
		//edit orchardBlock selected in -> edit.ejs
		/*OrchardBlock.update({id: req.param("orchardID")}, {
			cropType: req.param('cropTypeID')
		}, function (err) {
			//If there is an error 
			//return appropiate error message
			if(err) return res.negotiate(err);

			//if successfull send 200 response
			return res.ok();						
		});	*/
		YieldMeasurementType.update({id: req.param("id")}, {name: req.param("yieldType")},
		function(err) {
			//If there is an error 
			//return appropiate error message
			if(err) return res.negotiate(err);

			//if successfull send 200 response
			return res.redirect("/yieldMeasurementType/view");
		});
	}
};

