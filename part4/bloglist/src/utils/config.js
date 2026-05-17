require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_USERNANE = process.env.MONGODB_USERNANE
const MONGODB_PASWORD = process.env.MONGODB_PASWORD
const MONGODB_ATLAS_CLUSTER = process.env.MONGODB_ATLAS_CLUSTER
const MONGODB_ATLAS_APP_NAME = process.env.MONGODB_ATLAS_APP_NAME
const DB_NAME = process.env.DB_NAME

const MONGODB_URI = `mongodb+srv://${MONGODB_USERNANE}:${MONGODB_PASWORD}@${MONGODB_ATLAS_CLUSTER}/${DB_NAME}?appName=${MONGODB_ATLAS_APP_NAME}&retryWrites=true&w=majority`

module.exports = { PORT, MONGODB_URI }