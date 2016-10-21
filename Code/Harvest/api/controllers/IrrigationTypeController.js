/**
 * IrrigationTypeController
 *
 * @description :: Server-side logic for managing IrrigationType
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	view: function(req, res, next) {
      if (!req.session.me) {
          return res.view('homepage');
      }
    	User.findOne({id: req.session.me})
       	.populate("farms")
        .exec(function (err, user) {
          if(err) return res.negotiate(err);

          if(user.farms[0] == null)
                return res.view('farm/new', {layout: "signedInLayout", title: "Harvest | View Irrigation Type"});
          IrrigationType.find()    
          .exec(function(err, irrigationTypes) {
            if(err) return res.negotiate(err);     

            res.view({type: irrigationTypes, 
            layout: "signedInLayout"});
          });
        });
    },
    edit: function(req, res, next) {
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
            title: "Harvest | Edit Irrigation Type"
            });
        });
    },
    create: function(req, res, next) {
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
            title: "Harvest | Create Irrigation Type"
            });
        });
    }
};