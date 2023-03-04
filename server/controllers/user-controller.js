const { User, Pet } = require("../models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  async createUser({ body }, res) {
    const { email, password, name, location } = body;
    // Check if the user already exists
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);
    // the password is hashed and the salt is stored in the database
    const userToInsert = { 
      email: email,
      password: hashedPassword,
      name: name,
      location: location };
    // Create the user
    const user = await User.create(userToInsert);
    // if the user is not created, return an error
    if (!user)
      return res.status(400).json({ message: "Unable to create user" });
    // Return the user
    res.status(200).json({ _id: user._id, email: user.email, name: user.name, location: user.location });
  },

  // the user is updated by the id
  async updateUser({ body, params }, res) {
    const { email, password, name, location } = body;

    // Find the user by the id
    let userToUpdate = { email: email };
    // if the password is not empty, the password is hashed and the salt is stored in the database
    if (password?.length) {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // Update the user
      //is there a way to do something like the input change in react?
      //({...formData, [e.target.name]: e.target.value}) like this?
      userToUpdate = { ...userToUpdate, password: hashedPassword, name: name, location: location };
    }

    const user = await User.updateOne(
      // Find the user by the id
      { _id: params.id },
      userToUpdate,
      // Return the updated user
      { new: true }
    );
    // if the user is not updated, return an error
    if (!user)
      return res.status(400).json({ message: "Unable to update user" });
    // Return the user
    res.status(200).json({ _id: user._id, email: user.email, name: user.name, location: user.location });
  },

  async authUser({ body }, res) {
    // Find the user by the email address
    const user = await User.findOne({
      email: body.email,
    });

    if (!user)
      return res.status(400).json({ message: "Unable to authenticate user" });

    // We want to verify the password & kick them out if it fails
    const isValid = await bcrypt.compare(body.password, user.password);
    if (!isValid)
      return res.status(400).json({ message: "Unable to authenticate user" });
    // if the user is authenticated, a token is generated
    const token = jwt.sign(
      {
        // The payload
        email: user.email,
        id: user._id,
        // The secret is stored in the .env file
      },
      process.env.JWT_SECRET
    );
    // the token is sent to the client through the header
    res
      .header("auth-token", token)
      // Return the user and the token
      //primarily to test the token
      .json({ error: null, data: { user, token } });
  },

  async verifyUser(req, res) {
    // Get the token from the header
    const token = req.headers["auth-token"];
    // if the token is not valid, return an error
    if (!token) return res.status(401).json({ msg: "un-authorized" });
    // if the token is valid, the user is returned
    //jwt.verify verifies the token by comparing the secret with the one stored in the token
    //much like bcrypt.compare
    const isVerified = jwt.verify(token, process.env.JWT_SECRET);
    // if the token is not verified, return an error
    if (!isVerified) return res.status(401).json({ msg: "un-authorized" });
    // if the token is verified, the user is returned
    //the user is found in the data by the id stored in the token
    //the user is returned to the client
    const user = await User.findById(isVerified.id);
    // if the user is not found, return an error
    if (!user) return res.status(401).json({ msg: "un-authorized" });
// Return the user
    return res.status(200).json({ _id: user._id, email: user.email, name: user.name, location: user.location });
  },


  async getUserById(req, res) {
    console.log('userID')
    try {
      const dbUser = await User.findById(req.params.id)
      .populate('pets')
      res
        .status(200)
        .json(dbUser)
    } catch (error) {
      res
        .status(500)
        .json(error)
    }
  },

  async createPet(req, res) {
    const userId = req.params.id;
    try {
      const {
        name,
        type,
        description,
        breed,
        age,
        gender,
        size,
        color,
        friendly,
        health,
        notes,
        owner,
      } = req.body;
      const dbPet = await Pet.create({
        name,
        type,
        description,
        breed,
        age,
        gender,
        size,
        color,
        friendly,
        health,
        notes,
        owner: userId,
      });
      if (!dbPet) {
        throw new Error("Failed to create pet");
      }
      const dbUser = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { pets: dbPet._id } }
      );
      if (!dbUser) {
        throw new Error("Failed to update user");
      }
      res.status(200).json(`dbPet: ${dbPet} dbUser: ${dbUser}`);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  
};
