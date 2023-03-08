const router = require('express').Router();

const { authUser, createUser, updateUser, verifyUser, getUserById, createPet, getAllUsers, deleteUser } = require('../../controllers/user-controller');

const { sendSMS } = require('../../controllers/twilio-controller');

const User = require('../../models/User') 

router.route('/send-sms').post(sendSMS);
// Declare the routes that point to the controllers above
router.route('/').post(createUser);
router.route('/').get(getAllUsers);

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
      res.status(200).json({ message: 'Profile image updated successfully', user });
    } catch (error) {
      console.error('Error updating profile image:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

//! Original
// router.put(`/api/user/:userId`, async (req, res) => {
//     const { publicId } = req.body;

//     const updateUser = await User.findOneAndUpdate({ _id: req.params.userId},
//         { profileImage: `https://res.cloudinary.com/diwhrgwml/image/upload/v1678210889/ngigb7ymkblvjr3topyh.png${req.body.publicId}`},

//         //This ensures that the updated User is returned in the response instead of the original User before the update
//         { new: true }
//     );
//     if (!updateUser) {
//         res.status(404).json({ message: "No User with that ID "});
//     }
//     res.json(updateUser);
// });


router.route('/auth').post(authUser);
router.route('/verify').post(verifyUser);
router.route('/:id').get(getUserById);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);
router.route('/:id/pet').post(createPet);



module.exports = router;
