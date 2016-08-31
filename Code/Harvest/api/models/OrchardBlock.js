/**
 * OrchidBlock.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    farm: {
      model: 'farm'
    },

    //An orchard block can only have one name
    name: {
      type: 'string'
    },
    
    //An orchard block can only have one size in hectare
    hectares: {
      type: 'string'
    },

    //An orchard block can only have one irrigation type
    irrigationType: {
      type: 'string'
      //model: 'irrigationType'
    },

    //An orchard block can only have one crop type
    cropType: {
      type: 'string'
      //model: 'cropType'
    },

    //An orchard block can only have one cultivation frequency
    cultivationFrequency: {
      type: 'string'
      //model: 'cultivationFrequency'
    },

    //An orchard block can only have one yield measurement type
    yieldMeasurementType: {
      type: 'string'
      //model: 'yieldMeasurementType'
    },

    //An orchard block can only have one planted date
    datePlanted: {
      type: 'date'
    },

    //An orchard block can have multiple co-ordinates to demarcate it, but for now, just one
    coOrdinates: {
      type: 'string'
    }
  }
};