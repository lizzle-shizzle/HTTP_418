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

			//get farm linked to user and fetch all orchidblocks
			OrchidBlock.find({farm: user.farms[0].id})
			.populateAll()
			.exec(function(err, orchid) {
				if(err) return res.negotiate(err);				
				//send all orchid blocks linked to farm
				res.view({type: orchid, 
				layout: "signedInLayout", title: "Create yield measurement type"});				
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

			//get farm linked to user and fetch all orchidblocks
			OrchidBlock.find({farm: user.farms[0].id, cropType: null})			
			.exec(function(err, orchidblock) {
				if(err) return res.negotiate(err);

				//now find all croptypes
				CropType.find().exec(function(err, cropType) {
					if(err) return res.negotiate(err);

					//send all orchid blocks linked to farm and croptypes that exist
					res.view({data: {orchid: orchidblock,
						type: cropType}, 
					layout: "signedInLayout", title: "Create crop type"});
				});				
			});
		});				
	},

    create: function (req, res) {
	    // Create crop type from pramaters sent from -> new.ejs	    
		//Create new crop type, get crop type id and add to orchidblock
        CropType.create({name: req.param("newCropType")}, function(err, crop) {
            //If there is an error 
	    	//return appropiate error message
	    	if(err) return res.negotiate(err);
			
			//if created sucessfully, update orchid block to link crop type
			OrchidBlock.update({id: req.param("orchidID")}, {
				cropType: crop.id
			}, function (err) {
				//If there is an error 
				//return appropiate error message
				if(err) return res.negotiate(err);

				//if successfull send 200 response
				return res.ok();
			});	    	
        });
	},
	
	add: function (req, res) {	    
		//Add existing crop type to OrchidBlock selected in -> new.ejs
		OrchidBlock.update({id: req.param("orchidID")}, {
			cropType: req.param('cropTypeID')
		}, function (err) {
			//If there is an error 
			//return appropiate error message
			if(err) return res.negotiate(err);

			//if successfull send 200 response
			return res.ok();
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

			//get farm linked to user and fetch all orchidblocks
			OrchidBlock.find({farm: user.farms[0].id})			
			.exec(function(err, orchidblock) {
				if(err) return res.negotiate(err);

				var orchidBlockID = 0;
				OrchidBlock.findOne({cropType: req.param("id")}, function(err, block) {
					if(err) return res.negotiate(err);
					orchidBlockID = block.id;
				});
				//now find all croptypes
				CropType.find().exec(function(err, cropType) {
					if(err) return res.negotiate(err);

					
					//send all orchid blocks linked to farm and croptypes that exist
					res.view({data: {orchid: orchidblock,
						type: cropType,
						reqID: req.param("id"),
						orchID: orchidBlockID}, 
					layout: "signedInLayout", title: "Create crop type"});
				});				
			});
		});
	},

	update: function(req, res) {		
		//return to homepage if not logged in
		//cannot edit crop type if not logged in
		if (!req.session.me) {
	      return res.view('homepage');
	    }
		//edit OrchidBlock selected in -> edit.ejs
		OrchidBlock.update({id: req.param("orchidID")}, {
			cropType: req.param('cropTypeID')
		}, function (err) {
			//If there is an error 
			//return appropiate error message
			if(err) return res.negotiate(err);

			//if successfull send 200 response
			return res.ok();						
		});	
	}
};

