const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recruiterSchema = new Schema({
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
    },
    bio: String,
    companyDescription: String,
    place: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Recruiter', recruiterSchema);
