/**
 * OrchidBlockController
 *
 * @description :: Server-side logic for managing Orchidblocks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	viewOrchardBlock: function(req, res, next) {
    	User.find()
       	.populate("farms")
        .exec(function (err, user){
        	if (err) {
            	return res.negotiate(err);
          	}

          	return res.view('viewOrchardBlock', {
	            orchardBlocks: {
	              
	            },
	            layout: "signedInLayout",
	        	title: "Harvest | View Orchard Block"
          	});
      	});
    },
    editOrchardBlock: function(req, res, next) {
      User.find()
        .populate("farms")
        .exec(function (err, user){
          if (err) {
              return res.negotiate(err);
            }

            return res.view('editOrchardBlock', {
              orchardBlocks: {
                
              },
              layout: "signedInLayout",
            title: "Harvest | Edit Orchard Block"
            });
        });
    }
};