// Location controller routes
const Location = require("../models/Location");

module.exports = {

  
  //post('/api/locations')
  async createLocation(req, res) {
    console.log(req.body);
    try {
      const { city, coordinates } = req.body;
      const dbLocation = await Location.create({ city, coordinates });
      const savedLocation = await dbLocation.save();
      res.status(201).json(savedLocation._doc);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //get('/api/locations')
  async getLocations(req, res) {
    try {
      const dbLocations = await Location.find({});
      res.status(200).json(dbLocations);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //get('/api/locations/:id')
  async getLocation(req, res) {
    try {
      const { id } = req.params;
      const dbLocation = await Location.findById(id).populate("lostPets");
      res.status(200).json(dbLocation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },

  async searchLocationsByCity(req, res) {
    const {city } = req.params;
    try {
      const dbLocations = await Location.find({ city: { $regex: city, $options: 'i' } });
      res.status(200).json(dbLocations);
    } catch (err) {
      console.error(err);
      res.status(500).json(null);
    }
  },

  //put('/api/locations/:id')
  async updateLocation(req, res) {
    try {
      const { id } = req.params;
      const { location } = req.body;
      const dbLocation = await Location.findById(id);
      dbLocation.location = location;
      await dbLocation.save();
      res.status(200).json(dbLocation);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //delete('/api/locations/:id')
  async removeLocation(req, res) {
    try {
      const { id } = req.params;
      const dbLocation = await Location.findByIdAndDelete(id);
      res.status(200).json({ message: "Location deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //put('/api/locations/lost/:id')
  async addLostPet(req, res) {
    try {
      const { id } = req.params;
      const { petId } = req.body;

      const dbLocation = await Location.findById(id);
      dbLocation.lostPets.push(petId);
      await dbLocation.save();
      res.status(200).json({ location: dbLocation });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
