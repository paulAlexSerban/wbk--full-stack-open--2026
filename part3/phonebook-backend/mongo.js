const mongoose = require('mongoose')

const dotenv = require('dotenv');
dotenv.config()

const MONGO_DB_USERBANE = process.env.MONGO_DB_USERBANE;
const MONGODB_PASWORD = process.env.MONGODB_PASWORD;
const MONGODB_ATLAS_CLUSTER = process.env.MONGODB_ATLAS_CLUSTER;
const MONGODB_ATLAS_APP_NAME = process.env.MONGODB_ATLAS_APP_NAME;


const DB_URL = `mongodb+srv://${MONGO_DB_USERBANE}:${MONGODB_PASWORD}@${MONGODB_ATLAS_CLUSTER}/?appName=${MONGODB_ATLAS_APP_NAME}`


mongoose.set('strictQuery',false)

mongoose.connect(DB_URL, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

Note.find({}).then(result => {
    result.forEach(note => {
        console.log({note})
    });
})