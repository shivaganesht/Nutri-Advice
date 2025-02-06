


// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const cors = require('cors');

// const app = express();
// const port = 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// const genAI = new GoogleGenerativeAI("AIzaSyDWo-JFvSkDqj5sNeekqtpz6qHdS3zBVYI");


// function calculateBMI(weight, heightInFeet) {
//   const heightInMeters = heightInFeet * 0.3048;
//   if (heightInMeters === 0) return "Height cannot be zero.";
//   const bmi = weight / (heightInMeters ** 2);
//   return parseFloat(bmi.toFixed(2));
// }


// function determineNutritionProblem(bmi, age, gender) {
//   if (bmi < 18.5) return "Malnutrition (underweight)";
//   if (bmi >= 18.5 && bmi < 24.9) return "Healthy weight";
//   if (bmi >= 25 && bmi < 29.9) return "Overweight";
//   if (bmi >= 30) return "Obesity";
//   if (age >= 65) return "Potential age-related malnutrition";
//   return "Undetermined nutrition problem";
// }


// function determineDietaryHabits(dietaryHabits) {
//   const { fruits, vegetables, proteinSources, wholeGrains, micronutrientDeficiency } = dietaryHabits;
//   if (fruits < 3 || vegetables < 3 || proteinSources < 2 || wholeGrains < 2) {
//     return "Poor dietary diversity";
//   }
//   if (micronutrientDeficiency && micronutrientDeficiency.toLowerCase() !== "none") {
//     return `Possible micronutrient deficiency (e.g., ${micronutrientDeficiency})`;
//   }
//   return "Balanced diet";
// }


// async function getNutritionAdvice(category, age, gender, healthIssues, weight, heightInFeet, bmi, dietaryHabits) {
//   const prompts = {
//     "Malnutrition (underweight)": "Explain how to prevent and treat malnutrition, including essential nutrients and diet recommendations.",
//     "Healthy weight": "Provide general health and nutrition advice for maintaining a healthy weight.",
//     "Overweight": "Provide expert advice on managing overweight, including diet, exercise, and healthy lifestyle changes.",
//     "Obesity": "Give expert advice on managing obesity, including diet, exercise, and healthy lifestyle changes.",
//     "Potential age-related malnutrition": "Provide nutrition advice for elderly individuals, focusing on preventing age-related malnutrition.",
//     "Poor dietary diversity": "Provide advice on how to improve dietary diversity, including incorporating more food groups.",
//     "Possible micronutrient deficiency": "Provide advice on addressing micronutrient deficiencies, including food sources and supplementation recommendations.",
//     "Balanced diet": "Give general advice on maintaining a balanced and healthy diet."
//   };

//   const userPrompt = `
//     ${prompts[category]}
//     Consider a ${gender}, ${age} years old, weighing ${weight} kg with a height of ${heightInFeet} feet (BMI: ${bmi}).
//     Health concerns: ${healthIssues}.
//     Dietary habits: ${JSON.stringify(dietaryHabits)}.
//     Please make the advice specific to this individual's needs.
//   `;

//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const result = await model.generateContent(userPrompt);
//     return result.response.text();
//   } catch (error) {
//     return `Error: ${error.message}`;
//   }
// }


// async function getMealPlan(preferences) {
//   const { age, gender, weight, heightInFeet, healthIssues, dietaryHabits, cuisinePreference } = preferences;
//   const bmi = calculateBMI(weight, heightInFeet);
//   const dietaryAnalysis = determineDietaryHabits(dietaryHabits);
//   const prompt = `
//     Based on the following information, please generate a 3-day meal plan with breakfast, lunch, dinner, and a snack for each day.
//     Age: ${age}, Gender: ${gender}, Weight: ${weight} kg, Height: ${heightInFeet} feet (BMI: ${bmi}).
//     Health concerns: ${healthIssues}.
//     Dietary habits: ${JSON.stringify(dietaryHabits)} (Analysis: ${dietaryAnalysis}).
//     Preferred cuisine: ${cuisinePreference || "Any"}. 
//     Include portion sizes and brief nutritional notes for each meal.
//   `;

//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const result = await model.generateContent(prompt);
//     return result.response.text();
//   } catch (error) {
//     return `Error: ${error.message}`;
//   }
// }


// async function getDetailedDietaryAnalysis(details) {
//   const { age, gender, weight, heightInFeet, healthIssues, dietaryHabits } = details;
//   const bmi = calculateBMI(weight, heightInFeet);
//   const nutritionProblem = determineNutritionProblem(bmi, age, gender);
//   const dietaryProblem = determineDietaryHabits(dietaryHabits);
//   const prompt = `
//     Provide a detailed dietary analysis for an individual with the following details:
//     Age: ${age}, Gender: ${gender}, Weight: ${weight} kg, Height: ${heightInFeet} feet (BMI: ${bmi}).
//     Health concerns: ${healthIssues}.
//     Nutrition issue: ${nutritionProblem}.
//     Dietary habits: ${JSON.stringify(dietaryHabits)} (Analysis: ${dietaryProblem}).
//     Please include recommendations for food choices, portion control, and lifestyle modifications.
//   `;

//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const result = await model.generateContent(prompt);
//     return result.response.text();
//   } catch (error) {
//     return `Error: ${error.message}`;
//   }
// }


// app.post('/api/nutrition-advice', async (req, res) => {
//   const { age, gender, weight, heightInFeet, healthIssues, dietaryHabits } = req.body;
//   const bmi = calculateBMI(weight, heightInFeet);
//   const nutritionProblem = determineNutritionProblem(bmi, age, gender);
//   const dietaryProblem = determineDietaryHabits(dietaryHabits);
//   const overallProblem = nutritionProblem !== "Healthy weight" ? nutritionProblem : dietaryProblem;

//   const advice = await getNutritionAdvice(overallProblem, age, gender, healthIssues, weight, heightInFeet, bmi, dietaryHabits);
//   res.json({
//     bmi,
//     nutritionProblem: overallProblem,
//     advice
//   });
// });


// app.post('/api/bmi', (req, res) => {
//   const { weight, heightInFeet } = req.body;
//   const bmi = calculateBMI(weight, heightInFeet);
//   res.json({ bmi });
// });


// app.post('/api/meal-plan', async (req, res) => {
//   const preferences = req.body;
//   const mealPlan = await getMealPlan(preferences);
//   res.json({ mealPlan });
// });


// app.post('/api/detailed-analysis', async (req, res) => {
//   const details = req.body;
//   const analysis = await getDetailedDietaryAnalysis(details);
//   res.json({ analysis });
// });


// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });



require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(
    "mongodb://localhost:27017/nutrition-app"
    , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Import Models
const History = require('./models/History');

// Configure Gemini AI
const genAI = new GoogleGenerativeAI("AIzaSyDWo-JFvSkDqj5sNeekqtpz6qHdS3zBVYI");

// Helper Functions
function calculateBMI(weight, heightInFeet) {
    const heightInMeters = heightInFeet * 0.3048;
    if (heightInMeters === 0) return "Height cannot be zero.";
    const bmi = weight / (heightInMeters ** 2);
    return parseFloat(bmi.toFixed(2));
}

function determineNutritionProblem(bmi, age, gender) {
    if (bmi < 18.5) return "Malnutrition (underweight)";
    if (bmi >= 18.5 && bmi < 24.9) return "Healthy weight";
    if (bmi >= 25 && bmi < 29.9) return "Overweight";
    if (bmi >= 30) return "Obesity";
    if (age >= 65) return "Potential age-related malnutrition";
    return "Undetermined nutrition problem";
}

function determineDietaryHabits(dietaryHabits) {
    const { fruits, vegetables, proteinSources, wholeGrains, micronutrientDeficiency } = dietaryHabits;
    if (fruits < 3 || vegetables < 3 || proteinSources < 2 || wholeGrains < 2) {
        return "Poor dietary diversity";
    }
    if (micronutrientDeficiency && micronutrientDeficiency.toLowerCase() !== "none") {
        return `Possible micronutrient deficiency (e.g., ${micronutrientDeficiency})`;
    }
    return "Balanced diet";
}

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
        ${prompts[category]}
        Consider a ${gender}, ${age} years old, weighing ${weight} kg with a height of ${heightInFeet} feet (BMI: ${bmi}).
        Health concerns: ${healthIssues}.
        Dietary habits: ${JSON.stringify(dietaryHabits)}.
        Please make the advice specific to this individual's needs.
    `;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(userPrompt);
        return result.response.text();
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

async function getMealPlan(preferences) {
    const { age, gender, weight, heightInFeet, healthIssues, dietaryHabits, cuisinePreference } = preferences;
    const bmi = calculateBMI(weight, heightInFeet);
    const dietaryAnalysis = determineDietaryHabits(dietaryHabits);
    const prompt = `
        Based on the following information, please generate a 3-day meal plan with breakfast, lunch, dinner, and a snack for each day.
        Age: ${age}, Gender: ${gender}, Weight: ${weight} kg, Height: ${heightInFeet} feet (BMI: ${bmi}).
        Health concerns: ${healthIssues}.
        Dietary habits: ${JSON.stringify(dietaryHabits)} (Analysis: ${dietaryAnalysis}).
        Preferred cuisine: ${cuisinePreference || "Any"}.
        Include portion sizes and brief nutritional notes for each meal.
    `;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

async function getDetailedDietaryAnalysis(details) {
    const { age, gender, weight, heightInFeet, healthIssues, dietaryHabits } = details;
    const bmi = calculateBMI(weight, heightInFeet);
    const nutritionProblem = determineNutritionProblem(bmi, age, gender);
    const dietaryProblem = determineDietaryHabits(dietaryHabits);
    const prompt = `
        Provide a detailed dietary analysis for an individual with the following details:
        Age: ${age}, Gender: ${gender}, Weight: ${weight} kg, Height: ${heightInFeet} feet (BMI: ${bmi}).
        Health concerns: ${healthIssues}.
        Nutrition issue: ${nutritionProblem}.
        Dietary habits: ${JSON.stringify(dietaryHabits)} (Analysis: ${dietaryProblem}).
        Please include recommendations for food choices, portion control, and lifestyle modifications.
    `;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

// API Endpoints
app.post('/api/nutrition-advice', async (req, res) => {
    const { age, gender, weight, heightInFeet, healthIssues, dietaryHabits } = req.body;
    const bmi = calculateBMI(weight, heightInFeet);
    const nutritionProblem = determineNutritionProblem(bmi, age, gender);
    const dietaryProblem = determineDietaryHabits(dietaryHabits);
    const overallProblem = nutritionProblem !== "Healthy weight" ? nutritionProblem : dietaryProblem;
    const advice = await getNutritionAdvice(overallProblem, age, gender, healthIssues, weight, heightInFeet, bmi, dietaryHabits);

    // Save to history
    const historyEntry = new History({
        type: "Nutrition Advice",
        data: { bmi, nutritionProblem: overallProblem, advice }
    });
    await historyEntry.save();

    res.json({ bmi, nutritionProblem: overallProblem, advice });
});

app.post('/api/bmi', async (req, res) => {
    const { weight, heightInFeet } = req.body;
    const bmi = calculateBMI(weight, heightInFeet);

    // Save to history
    const historyEntry = new History({
        type: "BMI",
        data: { bmi }
    });
    await historyEntry.save();

    res.json({ bmi });
});

app.post('/api/meal-plan', async (req, res) => {
    const preferences = req.body;
    const mealPlan = await getMealPlan(preferences);

    // Save to history
    const historyEntry = new History({
        type: "Meal Plan",
        data: { mealPlan }
    });
    await historyEntry.save();

    res.json({ mealPlan });
});

app.post('/api/detailed-analysis', async (req, res) => {
    const details = req.body;
    const analysis = await getDetailedDietaryAnalysis(details);

    // Save to history
    const historyEntry = new History({
        type: "Dietary Analysis",
        data: { analysis }
    });
    await historyEntry.save();

    res.json({ analysis });
});

app.get('/api/history', async (req, res) => {
    try {
        const history = await History.find().sort({ timestamp: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch history" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});