/**
 * CropTypeController
 *
 * @description :: Server-side logic for managing croptypes
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

			//get farm linked to user and fetch all orchardblocks
			/*OrchardBlock.find({farm: user.farms[0].id})
			.populateAll()
			.exec(function(err, orchard) {
				if(err) return res.negotiate(err);				
				//send all orchard blocks linked to farm
				res.view({type: orchard, 
				layout: "signedInLayout"});				
			});*/
			CropType.find()			
			.exec(function(err, crop) {
				if(err) return res.negotiate(err);				
				//send all orchard blocks linked to farm
				res.view("cropType/view", {type: crop, 
				layout: "signedInLayout"});				
			});
		});        
	},

	new: function(req, res) {
		//return to homepage if not logged in
		//cannot create crop type if not logged in
		if (!req.session.me) {
		  return res.view('homepage');
		}
		User.findOne({id: req.session.me})
		.populate("farms")
		.exec(function (err, user) {
			//If there is an error 
			//return appropiate error message
			if(err) return res.negotiate(err);

			res.view("cropType/new", {layout: "signedInLayout", title: "Create crop type"});
		});				
	},

	create: function (req, res) {
		//redirect to homepage if user not logged in
		if (!req.session.me) {
		  return res.view('homepage');
		}
		// Create crop type from pramaters sent from -> new.ejs	    
		//Create new crop type, get crop type id and add to orchardblock
		CropType.create({name: req.param("newCropType")}, function(err, crop) {
			//If there is an error 
			//return appropiate error message
			if(err) return res.negotiate(err);
			
			//if successfull send 200 response
			return res.redirect("/cropType/view");			    	
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

			//find all crop types
			CropType.findOne({id: req.param("id")}).exec(function(err, cropType) {
					if(err) return res.negotiate(err);					
					//send all orchard blocks linked to farm and croptypes that exist
					res.view("cropType/edit", {data: {
						type: cropType,
						id: req.param("id")}, 
					layout: "signedInLayout", title: "Edit crop type"});
				});
		});
	},

	update: function(req, res) {		
		//return to homepage if not logged in
		//cannot edit crop type if not logged in
		if (!req.session.me) {
		  return res.view('homepage');
		}
		//edit OrchardBlock selected in -> edit.ejs
		/*OrchardBlock.update({id: req.param("orchardID")}, {
			cropType: req.param('cropTypeID')
		}, function (err) {
			//If there is an error 
			//return appropiate error message
			if(err) return res.negotiate(err);

			//if successfull send 200 response
			return res.ok();						
		});	*/
		CropType.update({id: req.param("id")}, {name: req.param("cropType")},
		function(err) {
			//If there is an error 
			//return appropiate error message
			if(err) return res.negotiate(err);

			//if successfull send 200 response
			return res.redirect("/cropType/view");
		});
	}
};