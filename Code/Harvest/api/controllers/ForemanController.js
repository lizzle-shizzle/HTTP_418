/**
 * ForemanController
 *
 * @description :: Server-side logic for managing Foremen
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//load page to create foreman
	newForeman: function(req, res){
		//if no one is logged in, return homepage
		if(!req.session.me){
			return res.view('homepage');
		}

		return res.view('foreman/createForeman', {layout: "signedInLayout", title: "Create new Foreman"});
	},

	create: function(req, res){
		//if no one is logged in, return homepage
		if(!req.session.me){
			return res.view('homepage');
		}

		//Create foreman from parameters sent by newFore.ejs
		Foreman.create({
			fname: req.param('fname'),
			lname: req.param('lname'),
			uname: req.param('uname'),
			encryptedPassword: req.param('pword'),
			farmer: req.session.me
		}, function foremanCreated(err, foreman){
			//Should it err, return correct message
			if(err){
				return res.negotiate(err);
			}
			//else if foreman creation == successful
			User.find().populate('foremen').exec(function (err, user){
				if(err){
					return res.negotiate(err);
				}
				//Upon success return to dashboard
				return res.redirect('/foreman/viewForeman');
			});
		});
	},

	editForeman: function(req, res){
		//if no one is logged in, return homepage
		if(!req.session.me){
			return res.view('homepage');
		}

		//retrieve foreman associated to email
		Foreman.findOne({uname: req.param('id')})
		.exec(function (err, foreman){
			if(err){
				return res.negotiate(err);
			}
			res.view({layout: 'signedInLayout', title: 'Edit Foreman', foreman: foreman});
		});
	},

	updateForeman: function(req, res){
		Foreman.update({uname: req.param('id')}, {
			uname: req.param('uname'),
			fname: req.param('fname'),
			lname: req.param('lname'),
			encryptedPassword: req.param('pword')
		}, function foremanUpdated(err, user){
			//In case of error, return message
			if(err){
				return res.negotiate(err);
			}
			//else go back to dashboard
			return res.redirect('foreman/viewForeman');
		});
	},

	viewForeman: function(req, res){
		//if no one is logged in, return homepage
		if(!req.session.me){
			return res.view('homepage');
		}
		User.findOne({id: req.session.me})
		.populate("farms")
		.exec(function(err, user){
			//If there is an error 
	    	//return appropiate error message
			if(err) return res.negotiate(err);

			//If there is no farm, create a new one
			// if(user.farms[0] == null)
        	// 	return res.view('farm/new', {layout: "signedInLayout", title: "Create new farm"});
		});

		Foreman.find()
		.exec(function(err, foreman){
			if(err) return res.negotiate(err);
			//send all foremen linked to a farm
			return res.view({
				type: foreman,
				layout: "signedInLayout"
			});
		});
	}
};

