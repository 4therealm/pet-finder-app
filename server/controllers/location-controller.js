// Location controller routes
const Location = require("../models/Location");

module.exports = {
  async createLocation(req, res) {
    try {
      const { location, coordinates } = req.body;
      const dbLocation = await Location.create({ location, coordinates });
      res.status(200).json(dbLocation);
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

  async addPetToLostPet(req, res) {
    console.log("addPetToLostPet");
    try {
      const { id } = req.params;
      const { petId } = req.body;
      const location = await Location.findById(id);
      location.lostPets.push(petId);
      await location.save();
      res.status(200).json(location);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
  
};
