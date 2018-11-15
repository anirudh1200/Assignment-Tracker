const mongoose = require('mongoose');
const submissionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    date: {
        type: String,
        requires: true
    },
    time: String,
    content: String,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        default: 'Anonymous'
    }
});
module.exports = mongoose.model("Submission", submissionSchema);
