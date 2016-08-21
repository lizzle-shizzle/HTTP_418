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
			email: req.param('email'),
			encryptedPassword: req.param('password')
		})
	}

};

