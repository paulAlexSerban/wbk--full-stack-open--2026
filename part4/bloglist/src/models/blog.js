const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0
  }
})

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

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)