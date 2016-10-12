/**
 * ForemanController
 *
 * @description :: Server-side logic for managing Foremen
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//load page to create foreman
	new: function(req, res){
		//if no one is logged in, return homepage
		if(!req.session.me){
			return res.view('homepage');
		}
		res.view({layout: 'signedInLayout', title: 'Create new Foreman'});
	},

	create: function(req, res){
		//Create foreman from parameters sent by newFore.ejs
		Foreman.create({
			fname: req.param('fname'),
			lname: req.param('lname'),
			email: req.param('uname'),
			encryptedPassword: req.param('password')
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
				return res.redirect('/');
			});
		});
	},

	edit: function(req, res){
		//if no one is logged in, return homepage
		if(!req.session.me){
			return res.view('homepage');
		}

		//retrieve foreman associated to email
		User.findOne({id: req.param('uname')}).populate('foremen').exec(function (err, user){
			if(err){
				return res.negotiate(err);
			}
			res.view({layout: 'signedInLayout', title: 'Edit Foreman', foreman: user.foremen[0]});
		});
	},

	update: function(req, res){
		Foreman.update({email: req.param('uname')}, {
			fname: req.param('fname'),
			lname: req.param('lname'),
			encryptedPassword: req.param('password')
		}, function foremanUpdated(err, user){
			//In case of error, return message
			if(err){
				return res.negotiate(err);
			}
			//else go back to dashboard
			return res.redirect('/');
		});
	},

	view: function(req, res){
		//if no one is logged in, return homepage
		if(!req.session.me){
			return res.view('homepage');
		}
		Foreman.findOne({id: req.session.me})
		.populate("foremen")
		.exec(function(err, user){
			//If there is an error 
	    	//return appropiate error message
			if(err) return res.negotiate(err);

			//If there is no farm, create a new one
			if(user.foremen[0] == null)
        		return res.view('foreman/new', {layout: "signedInLayout", title: "Create new farm"});
		});

		Foreman.findOne()
		.exec(function(err, foreman){
			if(err) return res.negotiate(err);
			//send all foremen linked to a farm
			res.view({
				type: foreman,
				layout: "signedInLayout"
			});
		});
	}
};

