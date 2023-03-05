
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const locationSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  coordinates: {
    type: [Number],

    required: true,
  },
  lostPets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
    }
  ],
}

);

locationSchema.index({ coordinates: '2dsphere' });

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
