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

        res.view({layout: "signedInLayout", title: "Crop Types"});
    },

    new: function(req, res) {
		//return to homepage if not logged in
		//cannot create crop type if not logged in
		/*if (!req.session.me) {
	      return res.view('homepage');
	    }*/
		//User.findOne({id: req.session.me})
		//.populate("farms")
		//.exec(function (err, user) {
			//If there is an error 
	    	//return appropiate error message
			//if(err) return res.negotiate(err);

			//get farm linked to user and fetch all orchidblocks
			Farm.findOne({id: "579e08fa8e4ee6742064cf23"})//user.farms[0].id ------------------------- TODO ----------------------------
			.populateAll()
			.exec(function(err, farm) {
				if(err) return res.negotiate(err);

				//now find all croptypes
				CropType.find().exec(function(err, cropType) {
					if(err) return res.negotiate(err);

					//send all orchid blocks linked to farm and croptypes that exist
					res.view({data: {orchid: farm.orchids,
						type: cropType}, 
					layout: "signedInLayout", title: "Create crop type"});
				});				
			});
		//});				
	},

    create: function (req, res) {
	    // Create crop type from pramaters sent from -> new.ejs	    
	    /*Farm.create({
	    	name: req.param("fname"),
	    	size: req.param("fsize"),
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
	    });*/

        /*CropType.find({name: 'mac'}, function(err, crop) {            
            if(crop == undefined) 
                console.log(crop.length);
        });*/

		//Create new crop type, get crop type id and add to orchidblock
        CropType.create({name: req.param("newCropType")}, function(err, crop) {
            //If there is an error 
	    	//return appropiate error message
	    	if(err) return res.negotiate(err);
			
			//if created sucessfully, update orchid block to link crop type
			OrchidBlock.update({id: req.param("orchidID")}, {
				cropTypes: crop.id
			}, function (err) {
				//If there is an error 
				//return appropiate error message
				if(err) return res.negotiate(err);

				//if successfull send 200 response
				return res.ok();
			});	    	
        });
	},

	/*edit: function(req, res) {
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
	},*/
};

