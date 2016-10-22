/**
 * ForemanController
 *
<<<<<<< HEAD
 * @description :: Server-side logic for managing foremen
=======
 * @description :: Server-side logic for managing Foremen
>>>>>>> refs/remotes/origin/master
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	maintainForemanAllocations: function(req, res, next) {
		if (!req.session.me) {
	      return res.view('homepage');
	    }

		User.findOne({id: req.session.me})
		.populate("farms")
		.exec(function (err, user) {
			//If there is an error 
	    	//return appropiate error message
			if(err) return res.negotiate(err);

			//get foreman linked to user and fetch all
			Foreman.find({farmer: req.session.me})			
			.exec(function(err, foremen) {
				if(err) return res.negotiate(err);

                //send all foremen linked to user to the createWorker thingy
                return res.view('foreman/maintainForemanOrchardAllocation', {data: {foremen}});
            });				
        });
	},
	editAllocation: function(req, res, next) {
	    User.findOne(req.param('id'), function foundUser(err, user) {
	      if (err) return next(err);
	      if (!user) return next();
	      res.view({
	        user: user
	      });
	    });
	},
	updateAllocation: function(req, res, next) {
		if (!req.session.me) {
	      return res.view('homepage');
	    }
		User.findOne({id: req.session.me})
		.populate("farms")
		.exec(function (err, user) {
	//load page to create foreman
	newForeman: function(req, res){
		//if no one is logged in, return homepage
		if(!req.session.me){
			return res.view('homepage');
		}

		return res.view('foreman/createForeman', {layout: "signedInLayout", title: "Create new Foreman"});
	},

	createForeman: function(req, res){
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
			//get farm linked to user and fetch all orchidblocks
			Foreman.find({farm: user.farms[0].id})			
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
		});/*
	    User.update(req.param('id'), req.params.all(), function userUpdated (err) {
	      if (err) return res.redirect('/foreman/maintainForemanOrchardAllocation' + req.param('id'));
	     // alert("Success");
	      /*toastr['success']('Invalid email/password combination.', 'Success', {
	          closeButton: true
	        });*/
	      //res.redirect('/user/show' + req.param('id'));
	      //return res.redirect('/user/editFarmer' + req.param('id'));
	      //if (req.param('email').rule !== 'unique') {
	        //return res.emailAddressInUse();
	      //}
	      /*return res.view('dashboard', {
	        me: {
	          id: req.param('id'),
	          fname: req.param('fname'),
	          lname: req.param('lname'),
	          birthdate: req.param('birthdate'),
	          email: req.param('email'),
	          isAdmin: !!req.param('admin'),
	          gravatarUrl: req.param('gravatarUrl')
	        }
	      });
	    });*/
	},
  	viewAllocation: function(req, res, next) {
	    User.findOne(req.param('id'), function foundUser(err, user) {
	      if (err) return next(err);
	      if (!user) return next();
	      res.view({
	        user: user
	      });
	    });
	},


		Foreman.find()
		.exec(function(err, foreman){
			if(err) return res.negotiate(err);
			//send all foremen linked to a farm
			return res.view({
				type: foreman,
				layout: "signedInLayout"
			});
		});
};

