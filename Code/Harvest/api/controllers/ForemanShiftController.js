/**
 * ForemanShiftController
 *
 * @description :: Server-side logic for managing Foremanshifts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	view: function(req, res) {
        if (!req.session.me) {
	      return res.view('homepage');
	    }

        ForemanShift.find().exec(function(err, shift) {
            if(err) return res.negotiate(err);				
            //send all foreman shifts
            res.view({data: shift, 
            layout: "signedInLayout"});
        });
    },
};

