const { Pet, Location } = require("../models");

module.exports = {
  async getAllPets(req, res) {
    try {
      const dbPets = await Pet.find({})
        .populate("owner", "name")
        .sort({ name: -1 });
      console.log(dbPets);
      res.json(dbPets);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
// this is what is called when the user clicks on a pet in the list
  async getPetById(req, res) {
    try {
      const dbPetData = await Pet.findOne({ _id: req.params.id }).populate(
        "owner",
        "name"
      );
      if (!dbPetData) {
        res.status(404).json({ message: "Pet not found" });
        return;
      }
      res.json(dbPetData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  

  async updatePet(req, res) {
    try {
      const { id } = req.params;
      const { isLost, lastSeenLocation } = req.body;
  
      // Check if the location exists in the database
      const location = await Location.findById(lastSeenLocation);
      if (!location) {
        return res.status(404).json({ message: "No location found with this id!" });
      }
  
      const dbPetData = await Pet.findOneAndUpdate(
        { _id: id },
        { $set: { isLost, lastSeenLocation } },
        { new: true }
      );
      if (!dbPetData) {
        res.status(404).json({ message: "No pet found with this id!" });
        return;
      }
      res.json(dbPetData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  

  async deletePet(req, res) {
    try {
      const dbPetData = await Pet.findOneAndDelete({ _id: req.params.id });
      if (!dbPetData) {
        res.status(404).json({ message: "No pet found with this id!" });
        return;
      }
      res.json(dbPetData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async lostPet(req, res) {
 const {id} = req.params;
 const {isLost, lastSeenLocation} = req.body;
    try {
      const dbPetData = await Pet.findOneAndUpdate(
        { _id: id },
        { $set: { isLost, lastSeenLocation } },
        { new: true }
      );
      if (!dbPetData) {
        res.status(404).json({ message: "No pet found with this id!" });
        return;
      }
     
      res.json(dbPetData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
  
};
