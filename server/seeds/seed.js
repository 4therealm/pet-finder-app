const mongoose = require("mongoose");
const Pet = require("../models");

mongoose.connect("mongodb://localhost:27017/petFinderDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("Database connected");
  const petData = require("./data/pets.json");
  await Pet.insertMany(petData);
  console.log("Seeded pets data");
});
