require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');



const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
// Configure Gemini AI
// const genAI = new GoogleGenerativeAI("AIzaSyBTBl4XWZcm8QLLEXOl8xZkdApTqO4JLyY");
const genAI = new GoogleGenerativeAI("AIzaSyDWo-JFvSkDqj5sNeekqtpz6qHdS3zBVYI");

// BMI Calculation
function calculateBMI(weight, heightInFeet) {
    const heightInMeters = heightInFeet * 0.3048;
    if (heightInMeters === 0) return "Height cannot be zero.";
    const bmi = weight / (heightInMeters ** 2);
    return parseFloat(bmi.toFixed(2));
}

// Determine Nutrition Problem
function determineNutritionProblem(bmi, age, gender) {
    if (bmi < 18.5) return "Malnutrition (underweight)";
    if (bmi >= 18.5 && bmi < 24.9) return "Healthy weight";
    if (bmi >= 25 && bmi < 29.9) return "Overweight";
    if (bmi >= 30) return "Obesity";
    if (age >= 65) return "Potential age-related malnutrition";
    return "Undetermined nutrition problem";
}

// Determine Dietary Habits
function determineDietaryHabits(dietaryHabits) {
    const { fruits, vegetables, proteinSources, wholeGrains, micronutrientDeficiency } = dietaryHabits;

    if (fruits < 3 || vegetables < 3 || proteinSources < 2 || wholeGrains < 2) {
        return "Poor dietary diversity";
    }
    if (micronutrientDeficiency.toLowerCase() !== "none") {
        return `Possible micronutrient deficiency (e.g., ${micronutrientDeficiency})`;
    }
    return "Balanced diet";
}

// Generate Nutrition Advice
async function getNutritionAdvice(category, age, gender, healthIssues, weight, heightInFeet, bmi, dietaryHabits) {
    const prompts = {
        "Malnutrition (underweight)": "Explain how to prevent and treat malnutrition, including essential nutrients and diet recommendations.",
        "Healthy weight": "Provide general health and nutrition advice for maintaining a healthy weight.",
        "Overweight": "Provide expert advice on managing overweight, including diet, exercise, and healthy lifestyle changes.",
        "Obesity": "Give expert advice on managing obesity, including diet, exercise, and healthy lifestyle changes.",
        "Potential age-related malnutrition": "Provide nutrition advice for elderly individuals, focusing on preventing age-related malnutrition.",
        "Poor dietary diversity": "Provide advice on how to improve dietary diversity, including incorporating more food groups.",
        "Possible micronutrient deficiency": "Provide advice on addressing micronutrient deficiencies, including food sources and supplementation recommendations.",
        "Balanced diet": "Give general advice on maintaining a balanced and healthy diet."
    };

    const userPrompt = `
        ${prompts[category]} Consider a ${gender}, ${age} years old, with a weight of ${weight} kg,
        height of ${heightInFeet} feet (BMI: ${bmi}). The individual has the following health concerns: ${healthIssues}.
        Dietary habits: ${JSON.stringify(dietaryHabits)}. Make the advice specific to this individual's needs.
    `;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(userPrompt);
        return result.response.text();
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

// API Endpoint
app.post('/api/nutrition-advice', async (req, res) => {
    const { age, gender, weight, heightInFeet, healthIssues, dietaryHabits } = req.body;

    // Calculate BMI
    const bmi = calculateBMI(weight, heightInFeet);

    // Determine Nutrition Problem
    const nutritionProblem = determineNutritionProblem(bmi, age, gender);

    // Determine Dietary Problem
    const dietaryProblem = determineDietaryHabits(dietaryHabits);

    // Combine Problems
    const overallProblem = nutritionProblem !== "Healthy weight" ? nutritionProblem : dietaryProblem;

    // Get Personalized Advice
    const advice = await getNutritionAdvice(overallProblem, age, gender, healthIssues, weight, heightInFeet, bmi, dietaryHabits);

    res.json({
        bmi,
        nutritionProblem: overallProblem,
        advice
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});