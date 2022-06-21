// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Job Schema
const jobSchema = new mongoose.Schema({
    DateApplied: String, 
    PositionTitle: String,
    Company: String,
    Description: String,
    Salary: String,
    ContactInfo: String,
    Logo: String,
    Contacted: Boolean,
    googleId: String
}, 
{timestamps: true});

// Job model
const Job = mongoose.model('Job', jobSchema);

//Export Job model

module.exports = Job;




