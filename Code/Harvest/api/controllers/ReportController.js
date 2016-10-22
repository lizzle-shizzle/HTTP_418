/**
 * ReportController
 *
 * @description :: Server-side logic for managing Reports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	generateCropYield: function(req, res) {		
		//return to homepage if not logged in
		//cannot edit crop type if not logged in
		if (!req.session.me) {
	      return res.view('homepage');
	    }
	    
		/*User.findOne({id: req.session.me}) 
		.populate("farms")
		.exec(function (err, user) {
			//If there is an error 
	    	//return appropiate error message
			if(err) return res.negotiate(err);

			//get farm linked to user and fetch all orchidblocks
			OrchardBlock.find({farm: user.farms[0].id})			
			.exec(function(err, orchardblock) {
				if(err) return res.negotiate(err);

				var orchardBlockID = 0;
				OrchardBlock.findOne({}, function(err, block) {
					if(err) return res.negotiate(err);
					orchardBlockID = block.id;
				});
				//now find all croptypes
				CropType.find().exec(function(err, cropType) {
					if(err) return res.negotiate(err);

					
					//send all orchid blocks linked to farm and croptypes that exist
					res.view({data: {orchard: orchardblock,
						reqID: req.param("id"),
						orchID: orchardBlockID}, 
					layout: "signedInLayout", title: "Generate Crop Yield Report"});
				});				
			});
		});*/
	}
};

