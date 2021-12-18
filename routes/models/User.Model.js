const mongoose = require("mongoose")
const UserSchema = require('../schema/User.Schema').UserSchema

const UserModel = mongoose.model("User", UserSchema);

function insertUser(user) {
    return UserModel.create(user).exec();
}

function getAllUsers() {
    return UserModel.find().exec();
}

function findUserByUsername(username) {
    return UserModel.findOne({username: username}).exec();
}

function pushFavoriteByUsernameJobId(username, jobId) {
    return UserModel.updateOne(
        {username: username},
        {$push:{favorites: jobId}}
    ).exec();
}

function pullFavoriteByUsernameJobId(username, jobId) {
    return UserModel.updateOne(
        {username: username},
        {$pull:{favorites: jobId}}
    ).exec();
}

// Make sure to export a function after you create it!
module.exports = {
    insertUser,
    getAllUsers,
    findUserByUsername,
    pushFavoriteByUsernameJobId,
    pullFavoriteByUsernameJobId,
};