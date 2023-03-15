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
  getSinglePet,
  updateProfileImage, 
} = require("../../controllers/user-controller");

const { sendSMS } = require("../../controllers/Twilio-controller");

const { User, Pet } = require('../../models') 

router.route("/send-sms").post(sendSMS);
// Declare the routes that point to the controllers above
router.route("/").post(createUser);
router.route("/").get(getAllUsers);
router.route("/pet/:id").get(getSinglePet).post(createPet);
router.route("/updateProfileImage/:userId").put(updateProfileImage)
router.route('/auth').post(authUser);
router.route('/verify').post(verifyUser);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);



module.exports = router;
