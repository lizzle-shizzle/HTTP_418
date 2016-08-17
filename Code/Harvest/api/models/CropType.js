/**
 * CropType.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      //Unique crop type name, links will be used to add cro type to farms
      unique: true
    },

    //A crop type can be linked to many farms
    orchidBlocks: {
      collection: 'orchidBlock',
      via: 'cropType'
    }
  }
};

