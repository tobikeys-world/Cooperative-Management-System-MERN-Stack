const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: String,
    Occupation: String,
    nextOfKin: String,
    membershipType: {
        type: String,
        enum: ["daily", "weekly", "monthly"],
        default: "monthly"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Member", memberSchema);