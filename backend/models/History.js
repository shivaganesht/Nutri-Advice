const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    type: String, // "BMI", "Nutrition Advice", "Meal Plan", "Dietary Analysis"
    data: Object, // The response data (e.g., BMI, advice, meal plan)
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);