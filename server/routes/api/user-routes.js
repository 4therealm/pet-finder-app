const router = require("express").Router();

const {
  authUser,
  createUser,
  updateUser,
  verifyUser,
  getUserById,
createPet,
  getAllUsers,
  deleteUser,
} = require("../../controllers/user-controller");

const { sendSMS } = require("../../controllers/Twilio-controller");

const { User, Pet } = require('../../models') 

router.route("/send-sms").post(sendSMS);
// Declare the routes that point to the controllers above
router.route("/").post(createUser);
router.route("/").get(getAllUsers);

//Getting the profile image from the user to display on the page
router.get(`/profileImage/:userId`, async (req, res) => {
  try {
    console.log("Testing profile image route")
    const userId = req.params.id;
    const user = await User.findById(userId);
    if( !user) {
      return res.status(404).json({message: "User not found"})
    }

    const profileImage = user.profileImage;
    if (!profileImage) {
      return res.status(404).json({message: "Profile image not found"})
    }

    res.status(200).send(profileImage)
    
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error" });
  }
})
 
router.post('/pet/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const petData = req.body;
    const pet = await Pet.create(petData);
    const user = await User.findByIdAndUpdate(userId, { $push: { pets: pet } }, { new: true });
    console.log(pet)

    res.json(pet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:userId', async (req, res) => {
    console.log("Hitting the route?")
    const userId = req.params.userId;
    const { url } = req.body.profileImage;
  
    try {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { profileImage: url },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

    console.log(user);
    res
      .status(200)
      .json({ message: "Profile image updated successfully", user });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.route('/auth').post(authUser);
router.route('/verify').post(verifyUser);
router.route('/:id').get(getUserById);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);
router.route('/:id/pet').post(createPet);

module.exports = router;
