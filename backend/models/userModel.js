const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

username: String,
userid: String

})

module.exports = mongoose.model("user_vite_save", userSchema)