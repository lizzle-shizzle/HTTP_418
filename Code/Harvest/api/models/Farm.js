/**
 * Farm.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //The farm name
  	name: {
  		type: 'string',  		
  	},

    //The farm size
    size: {
      type: 'float',      
    },

    province: {
      type: 'string',
      required: true
    },

    region: {
      type: 'string'
    },

    farmingRegion: {
      type: 'string',
      required: true
    },

    registeredFarmName: {
      type: 'string',
      required: true
    },

    portionNumber: {
      type: 'string'
    },

    companyName: {
      type: 'string',      
    },

    border: {
      type: 'array'
    },

    //A farm can only belong to one farmer
  	farmer: {
  		model: 'user'
  	},

    //A farm can have many orchard blocks
    orchards: {
      collection: 'orchardBlock',
      via: 'farm',      
    }
  }
};

