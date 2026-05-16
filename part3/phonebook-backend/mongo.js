const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>",
  );
  process.exit(1);
}

const MONGO_DB_USERBANE = process.env.MONGO_DB_USERBANE;
const MONGODB_PASWORD = process.argv[2];
const MONGODB_ATLAS_CLUSTER = process.env.MONGODB_ATLAS_CLUSTER;
const MONGODB_ATLAS_APP_NAME = process.env.MONGODB_ATLAS_APP_NAME;

const DB_URL = `mongodb+srv://${MONGO_DB_USERBANE}:${MONGODB_PASWORD}@${MONGODB_ATLAS_CLUSTER}/?appName=${MONGODB_ATLAS_APP_NAME}&retryWrites=true&w=majority`;

console.log({ DB_URL });

mongoose.set("strictQuery", false);
mongoose.connect(DB_URL, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  console.log("phonebook:");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log("Invalid arguments. Use one of the following formats:");
  console.log("  To list entries: node mongo.js <password>");
  console.log('  To add an entry: node mongo.js <password> "<name>" <number>');
  mongoose.connection.close();
}
