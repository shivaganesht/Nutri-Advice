const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: Number,
    gender: String,
    weight: Number,
    heightInFeet: Number,
    healthIssues: String,
    dietaryHabits: {
        fruits: Number,
        vegetables: Number,
        proteinSources: Number,
        wholeGrains: Number,
        micronutrientDeficiency: String
    },
    bmiHistory: [{ date: Date, bmi: Number }]
});

module.exports = mongoose.model('User', userSchema);