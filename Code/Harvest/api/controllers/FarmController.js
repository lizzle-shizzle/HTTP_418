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
			size: req.param("fsize")
		}, function farmUpdated(err) {
			//If there is an error 
	    	//return appropiate error message
			if(err) return res.negotiate(err);

			//If sucessfull go back to dashboard
	    	return res.redirect("/");
		});
	}
};
