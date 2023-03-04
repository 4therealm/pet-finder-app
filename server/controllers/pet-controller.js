const { Pet, User } = require('../models');

module.exports = {
    async getAllPets(req,res) {
     try { const dbPets = await Pet.find({}).populate('owner', 'name').sort({name: -1 })
      console.log(dbPets)
      res.json(dbPets)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },


    async getPetById(req, res) {
      try {
        const dbPetData = await Pet.findOne({ _id: req.params.id })
          .populate("owner")
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








