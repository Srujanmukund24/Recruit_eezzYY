const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    recruiterId: {
        type: Schema.Types.ObjectId,
        ref: 'Recruiter',
        required: true
    },
    candidateId: {
        type: Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },
    status: {
        type: String,
        enum: ['applied', 'accepted', 'rejected', 'cancelled'],
        default: 'applied',
        required: true
    },
    dateOfApplication: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Application', applicationSchema);
