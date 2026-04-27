const mongoose = require("mongoose")

const connectDB = async () => {

await mongoose.connect(process.env.mongoDB_URI)

console.log("MongoDB Connected successfully!")

}

module.exports = connectDB;