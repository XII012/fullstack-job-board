const Schema = require('mongoose').Schema;

exports.JobSchema = new Schema({
    jobTitle: {
        type: String,
    },
    companyName: {
        type: String,
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    },
    employerEmail: {
        type: String,
    },
    companyWebsite: {
        type: String,
        optional: true,
    },
    postDate: {
        type: Date,
        default: Date.now,
    },
    poster: {
        type: String,
    }
// this explicitly declares what collection we're using
}, { collection : 'jobs' });