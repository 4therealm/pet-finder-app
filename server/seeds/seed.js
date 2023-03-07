const mongoose = require('mongoose');
const Location = require('../models/location');
const User = require('../models/user');
const Pet = require('../models/pet');

mongoose.connect('mongodb://127.0.0.1:27017/petFinderDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const locations = [
  {
    city: 'New York',
    coordinates: [-74.0059, 40.7128]
  },
  {
    city: 'San Francisco',
    coordinates: [-122.4194, 37.7749]
  },
  {
    city: 'Los Angeles',
    coordinates: [-118.2437, 34.0522]
  }
];

const users = [
  {
    email: 'john@example.com',
    password: 'password123',
    name: 'John',
    phone: '555-555-1234'
  },
  {
    email: 'jane@example.com',
    password: 'password123',
    name: 'Jane',
    phone: '555-555-5678'
  }
];

const pets = [
  {
    name: 'Max',
    type: 'Dog',
    breed: 'Labrador Retriever',
    gender: 'male',
    age: 2,
    size: 'large',
    color: 'yellow',
    friendly: true,
    health: 'up to date on shots',
    notes: 'likes to play fetch',
    owner: null,
    isLost: true,
    lastSeenLocation: {
      city: 'New York',
      coordinates: [-74.0059, 40.7128]
    }
  },
  {
    name: 'Buddy',
    type: 'Dog',
    breed: 'Golden Retriever',
    gender: 'male',
    age: 3,
    size: 'large',
    color: 'golden',
    friendly: true,
    health: 'up to date on shots',
    notes: 'loves to swim',
    owner: null,
    isLost: true,
    lastSeenLocation: {
      city: 'San Francisco',
      coordinates: [-122.4194, 37.7749]
    }
  }
];

async function seed() {
  // await Location.deleteMany({});
  // await User.deleteMany({});
  // await Pet.deleteMany({});

  for (let location of locations) {
    await new Location(location).save();
  }

  for (let user of users) {
    await new User(user).save();
  }

  for (let pet of pets) {
    const owner = await User.findOne({ name: 'John' }); // assign John as owner for both pets
    pet.owner = owner._id;
    await new Pet(pet).save();
  }

  mongoose.disconnect();

  console.log('Done!');
}

seed();
