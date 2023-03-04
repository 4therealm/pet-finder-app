const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    // required: true
  },
  breed: {
    type: String,
    // required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    // required: true
  },
  age: {
    type: Number,
    // required: true
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    // required: true
  },
  color: {
    type: String,
    // required: true
  },
  // friendly: {
  //   type: Boolean,
  //   // default: true
  // },
  health: {
    type: String
  },
  notes: {
    type: String
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // location: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Location',
  //   // required: true
  // }
});
petSchema.virtual('user', {
  ref: 'User',
  localField: 'owner',
  foreignField: '_id',
  justOne: true
});

// petSchema.virtual('location', {
//   ref: 'Location',
//   localField: 'location',
//   foreignField: '_id',
//   justOne: true
// });
const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
