const User = require("../models/userModel")

exports.getUsers = async (req, res) => {

const users = await User.find()

res.json(users)

}


exports.createUser = async (req, res) => {

const user = await User.create(req.body)

res.json(user)

}


exports.updateUser = async (req, res) => {

await User.findByIdAndUpdate(req.params.id, req.body)

res.json({ message: "Updated" })

}


exports.deleteUser = async (req, res) => {

await User.findByIdAndDelete(req.params.id)

res.json({ message: "Deleted" })

}