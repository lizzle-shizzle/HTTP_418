/**
 * IrrigationTypeController
 *
 * @description :: Server-side logic for managing irrigationTypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    view: function(req, res) {
        if (!req.session.me) {
        return res.view('homepage');
      }

    User.findOne({id: req.session.me})
    .populate("farms")
    .exec(function (err, user) {
      //If there is an error 
        //return appropiate error message
      if(err) return res.negotiate(err);

      if(user.farms[0] == null)
            return res.view('farm/new', {layout: "signedInLayout", title: "Create new farm"});
      IrrigationType.find()     
      .exec(function(err, irrigation) {
        if(err) return res.negotiate(err);        
        //send all orchard blocks linked to farm
        res.view({type: irrigation, 
        layout: "signedInLayout"});       
      });
    });        
    },

    new: function(req, res) {
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

      res.view({layout: "signedInLayout", title: "Create irrigation type"});
    });       
  },

    create: function (req, res) {
    //redirect to homepage if user not logged in
    if (!req.session.me) {
        return res.view('homepage');
      }
      // Create crop type from pramaters sent from -> new.ejs     
    //Create new crop type, get crop type id and add to orchardblock
        IrrigationType.create({name: req.param("newIrrigationType")}, function(err, irrigation) {
            //If there is an error 
        //return appropiate error message
        if(err) return res.negotiate(err);
      
      //if successfull send 200 response
      return res.redirect("/irrigationType/view");            
        });
  },

  edit: function(req, res) {    
    //return to homepage if not logged in
    //cannot edit crop type if not logged in
    if (!req.session.me) {
        return res.view('homepage');
      }
    User.findOne({id: req.session.me}) 
    .populate("farms")
    .exec(function (err, user) {
      //If there is an error 
        //return appropiate error message
      if(err) return res.negotiate(err);

      //find all crop types
      IrrigationType.findOne({id: req.param("id")}).exec(function(err, irrigationType) {
          if(err) return res.negotiate(err);          
          //send all orchard blocks linked to farm and croptypes that exist
          res.view({data: {
            type: irrigationType,
            id: req.param("id")}, 
          layout: "signedInLayout", title: "Edit irrigation type"});
        });
    });
  },

  update: function(req, res) {    
    //return to homepage if not logged in
    //cannot edit crop type if not logged in
    if (!req.session.me) {
        return res.view('homepage');
      }
    //edit OrchardBlock selected in -> edit.ejs
    /*OrchardBlock.update({id: req.param("orchardID")}, {
      cropType: req.param('cropTypeID')
    }, function (err) {
      //If there is an error 
      //return appropiate error message
      if(err) return res.negotiate(err);

      //if successfull send 200 response
      return res.ok();            
    }); */
    IrrigationType.update({id: req.param("id")}, {name: req.param("irrigationType")},
    function(err) {
      //If there is an error 
      //return appropiate error message
      if(err) return res.negotiate(err);

      //if successfull send 200 response
      return res.redirect("/irrigationType/view");
    });
  }
};