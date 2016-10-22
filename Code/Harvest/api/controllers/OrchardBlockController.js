/**
 * OrchidBlockController
 *
 * @description :: Server-side logic for managing Orchidblocks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	viewOrchardBlock: function(req, res, next) {
      if (!req.session.me) {
          return res.view('homepage');
      }
    	User.findOne({id: req.session.me})
       	.populate("farms")
        .exec(function (err, user) {
          if(err) return res.negotiate(err);

          if(user.farms[0] == null)
                return res.view('farm/new', {layout: "signedInLayout", title: "Create new farm"});
          OrchardBlock.find()    
          .exec(function(err, orchardBlocks) {
            if(err) return res.negotiate(err);     

            res.view({type: orchardBlocks, 
            layout: "signedInLayout"});
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

            return res.view({
              orchardBlocks: {
                
              },
              layout: "signedInLayout",
            title: "Harvest | Edit Orchard Block"
            });
        });
    },
    createOrchardBlock: function(req, res, next) {
      User.find()
        .populate("farms")
        .exec(function (err, user){
          if (err) {
              return res.negotiate(err);
            }

            return res.view({
              orchardBlocks: {
                
              },
              layout: "signedInLayout",
            title: "Harvest | Create Orchard Block"
            });
        });
    }
};