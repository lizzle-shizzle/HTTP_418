/**
 * ForemanController
 *
 * @description :: Server-side logic for managing foremen
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
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
	checkOrch: function($scope) {
		$scope.orchards = ["A", "B", "C", "D"];
	}

};

