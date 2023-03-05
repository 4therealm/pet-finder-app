const locationSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  coordinates: {
    type: [Number],
    index: '2dsphere',
    required: true,
  },
  lostPets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
    }
  ],
});

// Create a geospatial index on the coordinates field
locationSchema.index({ coordinates: '2dsphere' });

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
