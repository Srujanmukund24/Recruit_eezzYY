const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    profile: String,
    skills: {
        type: [String],
        required: true,
        validate: {
            validator: function(value) {
                return value.length > 0;
            },
            message: 'At least one skill is required.'
        }
    },
    education: [{
        instituteName: {
            type: String,
            required: true
        },
        startYear: {
            type: Number,
            required: true
        },
        endYear: {
            type: Number,
            required: true
        }
    }],
    experience: String,
    contact: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                // Regex pattern for validating phone number
                return /^\d{10}$/.test(value);
            },
            message: 'Please enter a valid phone number.'
        }
    }
});

module.exports = mongoose.model('Candidate', candidateSchema);
