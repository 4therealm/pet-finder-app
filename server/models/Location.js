
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const locationSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  coordinates: {
    type: [Number],

    required: true,
  },
  lostPets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
    }
  ],
}

);


const Location = mongoose.model('Location', locationSchema);
module.exports = Location;



//graphQL version
// Location schema
// const { gql } = require("apollo-server");

// const typeDefs = gql`
//   type Location {
//     id: ID!
//     city: String!
//     coordinates: [Float]!
//     lostPets: [Pet]
//   }

//   extend type Query {
//     locations: [Location]
//     location(id: ID!): Location
//     searchLocationsByCity(city: String!): [Location]
//   }

//   extend type Mutation {
//     createLocation(city: String!, coordinates: [Float]!): Location
//     updateLocation(id: ID!, city: String, coordinates: [Float]): Location
//     removeLocation(id: ID!): Location
//     addLostPet(id: ID!, petId: ID!): Location
//   }
// `;

// // Location resolvers
// const Location = require("../models/Location");
// const Pet = require("../models/Pet");

// const resolvers = {
//   Query: {
//     locations: async () => {
//       try {
//         const dbLocations = await Location.find({});
//         return dbLocations;
//       } catch (error) {
//         console.error(error);
//         return null;
//       }
//     },
//     location: async (_, { id }) => {
//       try {
//         const dbLocation = await Location.findById(id).populate("lostPets");
//         return dbLocation;
//       } catch (error) {
//         console.error(error);
//         return null;
//       }
//     },
//     searchLocationsByCity: async (_, { city }) => {
//       try {
//         const dbLocations = await Location.find({ city: { $regex: city, $options: 'i' } });
//         return dbLocations;
//       } catch (err) {
//         console.error(err);
//         return null;
//       }
//     },
//   },

//   Mutation: {
//     createLocation: async (_, { city, coordinates }) => {
//       try {
//         const dbLocation = await Location.create({ city, coordinates });
//         const savedLocation = await dbLocation.save();
//         return savedLocation._doc;
//       } catch (error) {
//         console.error(error);
//         return null;
//       }
//     },
//     updateLocation: async (_, { id, city, coordinates }) => {
//       try {
//         const dbLocation = await Location.findById(id);
//         if (city) {
//           dbLocation.city = city;
//         }
//         if (coordinates) {
//           dbLocation.coordinates = coordinates;
//         }
//         await dbLocation.save();
//         return dbLocation._doc;
//       } catch (error) {
//         console.error(error);
//         return null;
//       }
//     },
//     removeLocation: async (_, { id }) => {
//       try {
//         const dbLocation = await Location.findByIdAndDelete(id);
//         return dbLocation._doc;
//       } catch (error) {
//         console.error(error);
//         return null;
//       }
//     },
//     addLostPet: async (_, { id, petId }) => {
//       try {
//         const dbLocation = await Location.findById(id);
//         dbLocation.lostPets.push(petId);
//         await dbLocation.save();
//         const populatedLocation = await Location.findById(id).populate("lostPets");
//         return populatedLocation._doc;
//       } catch (error) {
//         console.error(error);
//         return null;
//       }
//     },
//   },

//   Location: {
//     lostPets: async (parent) => {
//       try {
//         const pets = await Pet.find({ _id: { $in: parent.lostPets } });
//         return pets;
//       } catch (error) {
//         console.error(error);
//         return null;
//       }
//     },
//   },
// };

// module.exports = { typeDefs, resolvers };

