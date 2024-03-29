const { Pet, Location } = require("../models");

module.exports = {
  //get('/api/pet')
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

//get('/api/pet/lost')
async getLostPets(req, res) {
  try {
    const dbPets = await Pet.find({ isLost: "true" }).populate('owner', 'name phone').sort({ name: -1 });

    res.json(dbPets);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
},


  // this is what is called when the user clicks on a pet in the list
  //get('/api/pet/:id')
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

  //put('/api/pet/:id')
  async updatePet(req, res) {
    try {
      const { id } = req.params;
      const { isLost, lastSeenLocation } = req.body;

      // Check if the location exists in the database
      const location = await Location.findById(lastSeenLocation);
      if (!location) {
        return res
          .status(404)
          .json({ message: "No location found with this id!" });
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
  // Route for updating a lost pet
  async updateLostPet(req, res) {
    try {
      const { id } = req.params;
  
      // Find the pet by id
      const dbPetData = await Pet.findById(id);
      if (!dbPetData) {
        res.status(404).json({ message: "No pet found with this id!" });
        return;
      }
  
      // Set isLost field to false and reset lastSeenLocation
      dbPetData.isLost = false;
      dbPetData.lastSeenLocation = {
        type: "Point",
        coordinates: [0, 0]
      };
  
      // Save the updated pet to the database
      const updatedPet = await dbPetData.save();
  
      res.json(updatedPet);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  


  //delete('/api/pet/:id')
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
  //put('/api/pet/lost/:id)
  async lostPet(req, res) {
    const { id } = req.params;
    const { isLost, lastSeenLocation } = req.body;
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
  },
};
