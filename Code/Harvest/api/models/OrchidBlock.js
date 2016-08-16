/**
 * OrchidBlock.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string'
    },
    
    //An orchid block can only have one crop type
    cropTypes: {
      model: 'cropType'
    },

    //An orchid clock can only belong to one farm
    farm: {
      model: 'farm'
    }
  }
};

