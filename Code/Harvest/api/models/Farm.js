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
  		required: false,
  	},

    //The farm size
    size: {
      type: 'float',
      required: true
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

