const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    jobTitle: {
        type: String,
        required: true
    },
    maxPositions: {
        type: Number,
        required: true,
        min: 1
    },
    maxApplicants: {
        type: Number,
        required: true,
        min: 1
    },
    deadline: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value > Date.now();
            },
            message: 'Deadline must be in the future.'
        }
    },
    dateOfPosting: {
        type: Date,
        default: Date.now
    },
    skillSet: {
        type: [String],
        required: true,
        validate: {
            validator: function(value) {
                return value.length > 0;
            },
            message: 'At least one skill is required.'
        }
    },
    duration: String,
    jobDescription: String,
    salary: Number,
    recruiterId: {
        type: Schema.Types.ObjectId,
        ref: 'Recruiter',
        required: true
    },
    jobLocation: {
        type: String,
        required: true
    },
    acceptedCandidates: [{
        type: Schema.Types.ObjectId,
        ref: 'Candidate'
    }]
});

module.exports = mongoose.model('Job', jobSchema);
