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
  friendly: {
    type: Boolean,
    // default: true
  },
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
  isLost: {
    type: Boolean,
    default: false
  }
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




//potential code for location implementation

// const mongoose = require("mongoose");

// const petSchema = new mongoose.Schema({
//   name: String,
//   location: {
//     type: {
//       type: String,
//       default: "Point",
//       enum: ["Point"],
//     },
//     coordinates: {
//       type: [Number],
//       required: true,
//     },
//   },
// });

// petSchema.index({ location: "2dsphere" });

// module.exports = mongoose.model("Pet", petSchema);


// petSchema.virtual("distance").get(function () {
//   const [lng, lat] = this.location.coordinates;
//   const [userLng, userLat] = [/* user's longitude */, /* user's latitude */];
//   const R = 6371; // Radius of the earth in km
//   const dLat = deg2rad(userLat - lat);
//   const dLng = deg2rad(userLng - lng);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat)) *
//       Math.cos(deg2rad(userLat)) *
//       Math.sin(dLng / 2) *
//       Math.sin(dLng / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const d = R * c; // Distance in km
//   return d;
// });

// function deg2rad(deg) {
//   return deg * (Math.PI / 180);
// }

// const pets = await Pet.find({})
//   .where("distance")
//   .lt(10) // Filter pets within 10 km of the user's location
//   .exec();

