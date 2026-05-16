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
mongoose
  .connect(DB_URL, { family: 4 })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});

/**
 * `toJSON` Transform
 *
 * WHY THIS IS HERE
 * - MongoDB automatically creates a unique identifier named `_id` (an Object)
 * - the frontend application expects a standard string property named `id` (e.g., person.id)
 *
 * WHAT THIS DOES
 * Whenever `res.json(persons)` is called in Express, Mongoose automatically converts the documents
 * into JSON format. This `transform` function intercepts that conversion to create
 * a clean string copy of `_id` and assign it to `id`.
 *
 * This ensures the backend response payload perfectly matches what the frontend is looking for,
 * preventing 'undefined' errors during PUT and DELETE requests.
 *
 * OFFICIAL DOCUMENTATION REFERENCE
 * For more details on Mongoose Schema Options and JSON transformation
 * https://mongoosejs.com/docs/guide.html#toJSON
 *
 * ALTERNATIVE
 * A more scalable option is to use DTO pattern with a DTO formatter
 */

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = { Person };
