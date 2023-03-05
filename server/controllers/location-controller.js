// Location controller routes
const Location = require("../models/Location");

module.exports = {
  async createLocation(req, res) {
    console.log(req.body)
    try {
      const { city, coordinates } = req.body;
      const dbLocation = await Location.create({ city, coordinates });
      const savedLocation = await dbLocation.save();
      res.status(201).json(savedLocation._doc);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getLocations(req, res) {
    try {
      const dbLocations = await Location.find({});
      res.status(200).json(dbLocations);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getLocation(req, res) {
    try {
      const { id } = req.params;
      const dbLocation = await Location.findById(id).populate('lostPets');
      res.status(200).json(dbLocation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },
  
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
  async removeLocation(req, res) {
    try {
      const { id } = req.params;
      const dbLocation = await Location.findByIdAndDelete(id);
      res.status(200).json({ message: "Location deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  
  
};
