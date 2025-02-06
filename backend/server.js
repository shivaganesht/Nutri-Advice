


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

// Configure Gemini AI (replace with your own API key if needed)
const genAI = new GoogleGenerativeAI("AIzaSyDWo-JFvSkDqj5sNeekqtpz6qHdS3zBVYI");

// ====================================
// Utility Functions
// ====================================

// BMI Calculation
function calculateBMI(weight, heightInFeet) {
  const heightInMeters = heightInFeet * 0.3048;
  if (heightInMeters === 0) return "Height cannot be zero.";
  const bmi = weight / (heightInMeters ** 2);
  return parseFloat(bmi.toFixed(2));
}

// Determine Nutrition Problem based on BMI, age and gender
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
  if (micronutrientDeficiency && micronutrientDeficiency.toLowerCase() !== "none") {
    return `Possible micronutrient deficiency (e.g., ${micronutrientDeficiency})`;
  }
  return "Balanced diet";
}

// ====================================
// Gemini AI Integration Helpers
// ====================================

// Generate Nutrition Advice based on the problem category
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

// Generate Meal Plan based on user preferences
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

// Generate Detailed Dietary Analysis
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

// ====================================
// API Endpoints
// ====================================

// 1. Nutrition Advice Endpoint
app.post('/api/nutrition-advice', async (req, res) => {
  const { age, gender, weight, heightInFeet, healthIssues, dietaryHabits } = req.body;
  const bmi = calculateBMI(weight, heightInFeet);
  const nutritionProblem = determineNutritionProblem(bmi, age, gender);
  const dietaryProblem = determineDietaryHabits(dietaryHabits);
  const overallProblem = nutritionProblem !== "Healthy weight" ? nutritionProblem : dietaryProblem;

  const advice = await getNutritionAdvice(overallProblem, age, gender, healthIssues, weight, heightInFeet, bmi, dietaryHabits);
  res.json({
    bmi,
    nutritionProblem: overallProblem,
    advice
  });
});

// 2. BMI Calculation Endpoint
app.post('/api/bmi', (req, res) => {
  const { weight, heightInFeet } = req.body;
  const bmi = calculateBMI(weight, heightInFeet);
  res.json({ bmi });
});

// 3. Meal Plan Endpoint
app.post('/api/meal-plan', async (req, res) => {
  const preferences = req.body;
  const mealPlan = await getMealPlan(preferences);
  res.json({ mealPlan });
});

// 4. Detailed Dietary Analysis Endpoint
app.post('/api/detailed-analysis', async (req, res) => {
  const details = req.body;
  const analysis = await getDetailedDietaryAnalysis(details);
  res.json({ analysis });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


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

// // Configure Gemini API via GoogleGenerativeAI
// // Replace the API key with your own if necessary.
// const genAI = new GoogleGenerativeAI("AIzaSyDWo-JFvSkDqj5sNeekqtpz6qHdS3zBVYI");

// // ====================================
// // Utility Functions
// // ====================================

// // BMI Calculation
// function calculateBMI(weight, heightInFeet) {
//   const heightInMeters = heightInFeet * 0.3048;
//   if (heightInMeters === 0) return "Height cannot be zero.";
//   const bmi = weight / (heightInMeters ** 2);
//   return parseFloat(bmi.toFixed(2));
// }

// // Determine Nutrition Problem based on BMI, age and gender
// function determineNutritionProblem(bmi, age, gender) {
//   if (bmi < 18.5) return "Malnutrition (underweight)";
//   if (bmi >= 18.5 && bmi < 24.9) return "Healthy weight";
//   if (bmi >= 25 && bmi < 29.9) return "Overweight";
//   if (bmi >= 30) return "Obesity";
//   if (age >= 65) return "Potential age-related malnutrition";
//   return "Undetermined nutrition problem";
// }

// // Determine Dietary Habits based on provided data
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

// // ====================================
// // Gemini API Integration Helpers
// // ====================================

// // Use the Gemini API to generate nutrition advice
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

// // Use the Gemini API to generate a 3-day meal plan
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

// // Use the Gemini API to generate a detailed dietary analysis
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

// // ====================================
// // API Endpoints
// // ====================================

// // 1. Nutrition Advice Endpoint
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

// // 2. BMI Calculation Endpoint
// app.post('/api/bmi', (req, res) => {
//   const { weight, heightInFeet } = req.body;
//   const bmi = calculateBMI(weight, heightInFeet);
//   res.json({ bmi });
// });

// // 3. Meal Plan Endpoint
// app.post('/api/meal-plan', async (req, res) => {
//   const preferences = req.body;
//   const mealPlan = await getMealPlan(preferences);
//   res.json({ mealPlan });
// });

// // 4. Detailed Dietary Analysis Endpoint
// app.post('/api/detailed-analysis', async (req, res) => {
//   const details = req.body;
//   const analysis = await getDetailedDietaryAnalysis(details);
//   res.json({ analysis });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
