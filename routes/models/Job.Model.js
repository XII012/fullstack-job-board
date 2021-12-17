const mongoose = require("mongoose")
const JobSchema = require('../schema/Job.Schema').JobSchema

const JobModel = mongoose.model("Job", JobSchema);

function insertJob(job) {
    return JobModel.create(job);
}

function getAllJob() {
    return JobModel.find().exec();
}

function findJobByTitle(title) {
    // User.find({ "name": { "$regex": partialUserString, "$options": "i" } }).exec();

    return JobModel.find(
        { "jobTitle": { "$regex": title, "$options": "i" } }
        ).exec();
}

function findJobByPoster(poster) {
    return JobModel.find({
        poster: poster
    }).exec();
}

function findJobById(id) {
    return JobModel.findById(id).exec();
}

function updateJobById(id, job) {
    return JobModel.updateOne({
        _id: id
    }, {
        $set:{...job}
    }).exec();
}

function deleteById(id) {
    return JobModel.deleteOne({_id: id}).exec();
}
// Make sure to export a function after you create it!
module.exports = {
    findJobByPoster,
    insertJob,
    findJobByTitle,
    getAllJob,
    findJobById,
    updateJobById,
    deleteById,
};