const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_DB_USERBANE = process.env.MONGO_DB_USERBANE;
const MONGODB_PASWORD = process.env.MONGODB_PASWORD;
const MONGODB_ATLAS_CLUSTER = process.env.MONGODB_ATLAS_CLUSTER;
const MONGODB_ATLAS_APP_NAME = process.env.MONGODB_ATLAS_APP_NAME;


const DB_URL = `mongodb+srv://${MONGO_DB_USERBANE}:${MONGODB_PASWORD}@${MONGODB_ATLAS_CLUSTER}/phonebook?appName=${MONGODB_ATLAS_APP_NAME}&retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

console.log("Connecting to MongoDB...");
mongoose.connect(DB_URL, { family: 4 })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

module.exports = { Person };