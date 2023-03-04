const { Pet, User } = require('../models');

module.exports = {
    // get all pets
    getAllPets(req, res) {
        Pet.find({})
            .populate({
                path: 'user',
            })

            .sort({ _id: -1 })
            .then(dbPetData => res.json(dbPetData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            }
        );
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








