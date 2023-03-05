const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
city: {
  type: String,
  required: true
},
coordinates: {
  type: [Number],
  index: '2dsphere'
},
lostPets: [
  {
    type: Schema.Types.ObjectId,
    ref: 'Pet',
  }
],

});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;