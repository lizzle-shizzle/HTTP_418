/**
 * OrchardBlockController
 *
 * @description :: Server-side logic for managing orchard blocks
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
      if(err) return res.negotiate(err);

      if(user.farms[0] == null)
        return res.view('farm/new', {layout: "signedInLayout", title: "Create new farm"});
      OrchardBlock.find()     
      .exec(function(err, orchardBlocks) {
        if(err) return res.negotiate(err);    
        res.view({block: {orchardBlocks}, 
        layout: "signedInLayout"});       
      });
    });        
  },

  new: function(req, res) {
    if (!req.session.me) {
      return res.view('homepage');
    }
    User.findOne({id: req.session.me})
    .populate("farms")
    .exec(function (err, user) {
      if(err) return res.negotiate(err);
      IrrigationType.find({farm: user.farms[0].id})
      .exec(function (err, irrigation) {
        CropType.find({farm: user.farms[0].id})
        .exec(function (err, crop) {
          CultivationFrequency.find({farm: user.farms[0].id})
          .exec(function (err, cultivation) {
            YieldMeasurementType.find({farm: user.farms[0].id})
            .exec(function (err, yieldMeasure) {
            res.view('orchardBlock/new', {data: {irrigation}, cropdata: {crop}, cultivationdata: {cultivation}, yielmeasuredata: {yieldMeasure}, layout: "signedInLayout", title: "Create Orchard Block"});
            });
          });
        });
      });
    });       
  },

  create: function (req, res) {
    if (!req.session.me) {
      return res.view('homepage');
    }
    User.findOne({id: req.session.me})
    .populate("farms")
    .exec(function (err, user) {
    OrchardBlock.create({farm: user.farms[0], name: req.param("orchardBlockName"), hectares: req.param("orchardBlockHectares"), irrigationType: req.param("selectIrrigationType"), cropType: req.param("selectCropType"), cultivationFrequency: req.param("selectCultivationFrequency"), yieldMeasurementType: req.param("selectYieldMeasurement"), datePlanted: req.param("plantDate")}, function(err, orchardBlocks) {
      if(err) return res.negotiate(err);
      return res.redirect("/orchardBlock/view");            
    });
    });
  },

  edit: function(req, res) {    
    if (!req.session.me) {
      return res.view('homepage');
    }
    User.findOne({id: req.session.me}) 
    .populate("farms")
    .exec(function (err, user) {
      if(err) return res.negotiate(err);

      OrchardBlock.findOne({id: req.param("id")}).exec(function(err, orchardBlock) {
          if(err) return res.negotiate(err);          
          res.view("OrchardBlock/edit", {data: {
            type: orchardBlock,
            id: req.param("id")}, 
          layout: "signedInLayout", title: "Edit Orchard Block"});
        });
    });
  },

  update: function(req, res) {    
    if (!req.session.me) {
      return res.view('homepage');
    }
    OrchardBlock.update({id: req.param("id")}, {name: req.param("orchardBlock")},
    function(err) {
      //If there is an error 
      //return appropiate error message
      if(err) return res.negotiate(err);

      //if successfull send 200 response
      return res.redirect("/orchardBlock/view");
    });
  },

  populate: function(req, res) {    
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
        res.json({block: orchardBlocks});       
      });
    });
  }
};