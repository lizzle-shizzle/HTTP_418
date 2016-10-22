/**
 * ForemanController
 *
 * @description :: Server-side logic for managing Foremen
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//load page to create foreman
	newWorker: function(req, res) {
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

			//get foreman linked to user and fetch all
			Foreman.find({farmer: req.session.me})			
			.exec(function(err, foremen) {
				if(err) return res.negotiate(err);

                //send all foremen linked to user to the createWorker thingy
                return res.view('worker/createWorker', {data: {foremen}, layout: "signedInLayout", title: "Create new Worker"});
            });				
        });			
	},

    createWorker: function (req, res) {
	   Worker.create({
			fname: req.param('fname'),
			lname: req.param('lname'),
			nname: req.param('nname'),
			foreman: req.param('wfass')
		}, function workerCreated(err, worker){
			//Should it err, return correct message
			if(err){
				return res.negotiate(err);
			}
			//else if foreman creation == successful
			User.find().exec(function (err, user){
				if(err){
					return res.negotiate(err);
				}
				//Upon success return to dashboard
				return res.redirect('/worker/viewWorker');
			});
		});
	},

	editWorker: function(req, res){
		//if no one is logged in, return homepage
		if(!req.session.me){
			return res.view('homepage');
		}

		//retrieve foreman associated to email
		Foreman.findOne({nname: req.param('id')})
		.exec(function (err, worker){
			if(err){
				return res.negotiate(err);
			}
			res.view({layout: 'signedInLayout', title: 'Edit Worker', worker: worker});
		});
	},

	updateWorker: function(req, res){
		Foreman.update({nname: req.param('id')}, {
			fname: req.param('fname'),
			lname: req.param('lname'),
            nname: req.param('nname'),
            foreman: req.param('wfass')
            //need to add foreman assigned to it.
		}, function workerUpdated(err, user){
			//In case of error, return message
			if(err){
				return res.negotiate(err);
			}
			//else go back to dashboard
			return res.redirect('worker/viewWorker');
		});
	},

	viewWorker: function(req, res){
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

		Worker.find()
		.exec(function(err, worker){
			if(err) return res.negotiate(err);
			//send all foremen linked to a farm
			return res.view({
				type: worker,
				layout: "signedInLayout"
			});
		});
	}
};

