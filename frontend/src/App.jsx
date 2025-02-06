



// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [activeTab, setActiveTab] = useState('advice');

//   // State for the Nutrition Advice form
//   const [adviceForm, setAdviceForm] = useState({
//     age: '',
//     gender: '',
//     weight: '',
//     heightInFeet: '',
//     healthIssues: '',
//     fruits: '',
//     vegetables: '',
//     proteinSources: '',
//     wholeGrains: '',
//     micronutrientDeficiency: ''
//   });
//   const [adviceResult, setAdviceResult] = useState(null);

//   // State for the Meal Plan form
//   const [mealPlanForm, setMealPlanForm] = useState({
//     age: '',
//     gender: '',
//     weight: '',
//     heightInFeet: '',
//     healthIssues: '',
//     fruits: '',
//     vegetables: '',
//     proteinSources: '',
//     wholeGrains: '',
//     micronutrientDeficiency: '',
//     cuisinePreference: ''
//   });
//   const [mealPlanResult, setMealPlanResult] = useState(null);

//   // State for the Detailed Analysis form
//   const [analysisForm, setAnalysisForm] = useState({
//     age: '',
//     gender: '',
//     weight: '',
//     heightInFeet: '',
//     healthIssues: '',
//     fruits: '',
//     vegetables: '',
//     proteinSources: '',
//     wholeGrains: '',
//     micronutrientDeficiency: ''
//   });
//   const [analysisResult, setAnalysisResult] = useState(null);

//   // Handle input changes for each form
//   const handleInputChange = (formName, e) => {
//     const { name, value } = e.target;
//     if (formName === 'advice') {
//       setAdviceForm((prev) => ({ ...prev, [name]: value }));
//     } else if (formName === 'mealPlan') {
//       setMealPlanForm((prev) => ({ ...prev, [name]: value }));
//     } else if (formName === 'analysis') {
//       setAnalysisForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // Handle form submissions for each feature
//   const handleSubmit = async (formName, e) => {
//     e.preventDefault();
//     let payload, endpoint;

//     if (formName === 'advice') {
//       payload = {
//         age: Number(adviceForm.age),
//         gender: adviceForm.gender,
//         weight: Number(adviceForm.weight),
//         heightInFeet: Number(adviceForm.heightInFeet),
//         healthIssues: adviceForm.healthIssues || "None",
//         dietaryHabits: {
//           fruits: Number(adviceForm.fruits),
//           vegetables: Number(adviceForm.vegetables),
//           proteinSources: Number(adviceForm.proteinSources),
//           wholeGrains: Number(adviceForm.wholeGrains),
//           micronutrientDeficiency: adviceForm.micronutrientDeficiency || "none"
//         }
//       };
//       endpoint = 'http://localhost:5000/api/nutrition-advice';
//     } else if (formName === 'mealPlan') {
//       payload = {
//         age: Number(mealPlanForm.age),
//         gender: mealPlanForm.gender,
//         weight: Number(mealPlanForm.weight),
//         heightInFeet: Number(mealPlanForm.heightInFeet),
//         healthIssues: mealPlanForm.healthIssues || "None",
//         dietaryHabits: {
//           fruits: Number(mealPlanForm.fruits),
//           vegetables: Number(mealPlanForm.vegetables),
//           proteinSources: Number(mealPlanForm.proteinSources),
//           wholeGrains: Number(mealPlanForm.wholeGrains),
//           micronutrientDeficiency: mealPlanForm.micronutrientDeficiency || "none"
//         },
//         cuisinePreference: mealPlanForm.cuisinePreference || "Any"
//       };
//       endpoint = 'http://localhost:5000/api/meal-plan';
//     } else if (formName === 'analysis') {
//       payload = {
//         age: Number(analysisForm.age),
//         gender: analysisForm.gender,
//         weight: Number(analysisForm.weight),
//         heightInFeet: Number(analysisForm.heightInFeet),
//         healthIssues: analysisForm.healthIssues || "None",
//         dietaryHabits: {
//           fruits: Number(analysisForm.fruits),
//           vegetables: Number(analysisForm.vegetables),
//           proteinSources: Number(analysisForm.proteinSources),
//           wholeGrains: Number(analysisForm.wholeGrains),
//           micronutrientDeficiency: analysisForm.micronutrientDeficiency || "none"
//         }
//       };
//       endpoint = 'http://localhost:5000/api/detailed-analysis';
//     }

//     try {
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });
//       const result = await response.json();
//       if (formName === 'advice') {
//         setAdviceResult(result);
//       } else if (formName === 'mealPlan') {
//         setMealPlanResult(result);
//       } else if (formName === 'analysis') {
//         setAnalysisResult(result);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Nutrition Advisor</h1>
//       <div className="tabs">
//         <button onClick={() => setActiveTab('advice')} className={activeTab === 'advice' ? 'active' : ''}>
//           Nutrition Advice
//         </button>
//         <button onClick={() => setActiveTab('mealPlan')} className={activeTab === 'mealPlan' ? 'active' : ''}>
//           Meal Plan
//         </button>
//         <button onClick={() => setActiveTab('analysis')} className={activeTab === 'analysis' ? 'active' : ''}>
//           Detailed Analysis
//         </button>
//       </div>

//       {/* Nutrition Advice Form */}
//       {activeTab === 'advice' && (
//         <div className="form-container">
//           <h2>Get Nutrition Advice</h2>
//           <form onSubmit={(e) => handleSubmit('advice', e)}>
//             <input type="number" name="age" placeholder="Age" value={adviceForm.age} onChange={(e) => handleInputChange('advice', e)} required />
//             <select name="gender" value={adviceForm.gender} onChange={(e) => handleInputChange('advice', e)} required>
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//             <input type="number" name="weight" placeholder="Weight (kg)" value={adviceForm.weight} onChange={(e) => handleInputChange('advice', e)} required />
//             <input type="number" name="heightInFeet" placeholder="Height (feet)" value={adviceForm.heightInFeet} onChange={(e) => handleInputChange('advice', e)} required />
//             <textarea name="healthIssues" placeholder="Health issues (if any)" value={adviceForm.healthIssues} onChange={(e) => handleInputChange('advice', e)}></textarea>
//             <h3>Dietary Habits (Frequency per week)</h3>
//             <input type="number" name="fruits" placeholder="Fruits servings" value={adviceForm.fruits} onChange={(e) => handleInputChange('advice', e)} required />
//             <input type="number" name="vegetables" placeholder="Vegetables servings" value={adviceForm.vegetables} onChange={(e) => handleInputChange('advice', e)} required />
//             <input type="number" name="proteinSources" placeholder="Protein source servings" value={adviceForm.proteinSources} onChange={(e) => handleInputChange('advice', e)} required />
//             <input type="number" name="wholeGrains" placeholder="Whole grains servings" value={adviceForm.wholeGrains} onChange={(e) => handleInputChange('advice', e)} required />
//             <input type="text" name="micronutrientDeficiency" placeholder="Micronutrient deficiency (if any, else 'none')" value={adviceForm.micronutrientDeficiency} onChange={(e) => handleInputChange('advice', e)} required />
//             <button type="submit">Get Advice</button>
//           </form>
//           {adviceResult && (
//             <div className="result">
//               <p><strong>BMI:</strong> {adviceResult.bmi}</p>
//               <p><strong>Issue:</strong> {adviceResult.nutritionProblem}</p>
//               <p><strong>Advice:</strong> {adviceResult.advice}</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Meal Plan Form */}
//       {activeTab === 'mealPlan' && (
//         <div className="form-container">
//           <h2>Get Meal Plan</h2>
//           <form onSubmit={(e) => handleSubmit('mealPlan', e)}>
//             <input type="number" name="age" placeholder="Age" value={mealPlanForm.age} onChange={(e) => handleInputChange('mealPlan', e)} required />
//             <select name="gender" value={mealPlanForm.gender} onChange={(e) => handleInputChange('mealPlan', e)} required>
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//             <input type="number" name="weight" placeholder="Weight (kg)" value={mealPlanForm.weight} onChange={(e) => handleInputChange('mealPlan', e)} required />
//             <input type="number" name="heightInFeet" placeholder="Height (feet)" value={mealPlanForm.heightInFeet} onChange={(e) => handleInputChange('mealPlan', e)} required />
//             <textarea name="healthIssues" placeholder="Health issues (if any)" value={mealPlanForm.healthIssues} onChange={(e) => handleInputChange('mealPlan', e)}></textarea>
//             <h3>Dietary Habits (Frequency per week)</h3>
//             <input type="number" name="fruits" placeholder="Fruits servings" value={mealPlanForm.fruits} onChange={(e) => handleInputChange('mealPlan', e)} required />
//             <input type="number" name="vegetables" placeholder="Vegetables servings" value={mealPlanForm.vegetables} onChange={(e) => handleInputChange('mealPlan', e)} required />
//             <input type="number" name="proteinSources" placeholder="Protein source servings" value={mealPlanForm.proteinSources} onChange={(e) => handleInputChange('mealPlan', e)} required />
//             <input type="number" name="wholeGrains" placeholder="Whole grains servings" value={mealPlanForm.wholeGrains} onChange={(e) => handleInputChange('mealPlan', e)} required />
//             <input type="text" name="micronutrientDeficiency" placeholder="Micronutrient deficiency (if any, else 'none')" value={mealPlanForm.micronutrientDeficiency} onChange={(e) => handleInputChange('mealPlan', e)} required />
//             <input type="text" name="cuisinePreference" placeholder="Cuisine Preference (optional)" value={mealPlanForm.cuisinePreference} onChange={(e) => handleInputChange('mealPlan', e)} />
//             <button type="submit">Get Meal Plan</button>
//           </form>
//           {mealPlanResult && (
//             <div className="result">
//               <p><strong>Meal Plan:</strong></p>
//               <pre>{mealPlanResult.mealPlan}</pre>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Detailed Analysis Form */}
//       {activeTab === 'analysis' && (
//         <div className="form-container">
//           <h2>Detailed Dietary Analysis</h2>
//           <form onSubmit={(e) => handleSubmit('analysis', e)}>
//             <input type="number" name="age" placeholder="Age" value={analysisForm.age} onChange={(e) => handleInputChange('analysis', e)} required />
//             <select name="gender" value={analysisForm.gender} onChange={(e) => handleInputChange('analysis', e)} required>
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//             <input type="number" name="weight" placeholder="Weight (kg)" value={analysisForm.weight} onChange={(e) => handleInputChange('analysis', e)} required />
//             <input type="number" name="heightInFeet" placeholder="Height (feet)" value={analysisForm.heightInFeet} onChange={(e) => handleInputChange('analysis', e)} required />
//             <textarea name="healthIssues" placeholder="Health issues (if any)" value={analysisForm.healthIssues} onChange={(e) => handleInputChange('analysis', e)}></textarea>
//             <h3>Dietary Habits (Frequency per week)</h3>
//             <input type="number" name="fruits" placeholder="Fruits servings" value={analysisForm.fruits} onChange={(e) => handleInputChange('analysis', e)} required />
//             <input type="number" name="vegetables" placeholder="Vegetables servings" value={analysisForm.vegetables} onChange={(e) => handleInputChange('analysis', e)} required />
//             <input type="number" name="proteinSources" placeholder="Protein source servings" value={analysisForm.proteinSources} onChange={(e) => handleInputChange('analysis', e)} required />
//             <input type="number" name="wholeGrains" placeholder="Whole grains servings" value={analysisForm.wholeGrains} onChange={(e) => handleInputChange('analysis', e)} required />
//             <input type="text" name="micronutrientDeficiency" placeholder="Micronutrient deficiency (if any, else 'none')" value={analysisForm.micronutrientDeficiency} onChange={(e) => handleInputChange('analysis', e)} required />
//             <button type="submit">Get Analysis</button>
//           </form>
//           {analysisResult && (
//             <div className="result">
//               <p><strong>Analysis:</strong></p>
//               <pre>{analysisResult.analysis}</pre>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;




// "use client"

// import { useState } from "react"
// import NutritionAdviceForm from "./components/NutritionAdviceForm"
// import MealPlanForm from "./components/MealPlanForm"
// import DetailedAnalysisForm from "./components/DetailedAnalysisForm"
// import TabButton from "./components/TabButton"

// export default function NutritionAdvisor() {
//   const [activeTab, setActiveTab] = useState("advice")

//   const tabs = [
//     { id: "advice", label: "Nutrition Advice" },
//     { id: "mealPlan", label: "Meal Plan" },
//     { id: "analysis", label: "Detailed Analysis" },
//   ]

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-4xl mx-auto p-6">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Nutrition Advisor</h1>
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <div className="flex border-b border-gray-200">
//             {tabs.map((tab) => (
//               <TabButton key={tab.id} isActive={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>
//                 {tab.label}
//               </TabButton>
//             ))}
//           </div>
//           <div className="p-6">
//             {activeTab === "advice" && <NutritionAdviceForm />}
//             {activeTab === "mealPlan" && <MealPlanForm />}
//             {activeTab === "analysis" && <DetailedAnalysisForm />}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



import React, { useState } from "react";
import ReactMarkdown from "react-markdown"; // Import react-markdown

function App() {
  const [activeTab, setActiveTab] = useState("advice");

  // -----------------------
  // State for BMI Calculation
  // -----------------------
  const [bmiForm, setBmiForm] = useState({ weight: "", heightInFeet: "" });
  const [bmiResult, setBmiResult] = useState(null);

  // -----------------------
  // State for Nutrition Advice
  // -----------------------
  const [adviceForm, setAdviceForm] = useState({
    age: "",
    gender: "",
    weight: "",
    heightInFeet: "",
    healthIssues: "",
    fruits: "",
    vegetables: "",
    proteinSources: "",
    wholeGrains: "",
    micronutrientDeficiency: "",
  });
  const [adviceResult, setAdviceResult] = useState(null);

  // -----------------------
  // State for Meal Plan
  // -----------------------
  const [mealPlanForm, setMealPlanForm] = useState({
    age: "",
    gender: "",
    weight: "",
    heightInFeet: "",
    healthIssues: "",
    fruits: "",
    vegetables: "",
    proteinSources: "",
    wholeGrains: "",
    micronutrientDeficiency: "",
    cuisinePreference: "",
  });
  const [mealPlanResult, setMealPlanResult] = useState(null);

  // -----------------------
  // State for Detailed Dietary Analysis
  // -----------------------
  const [analysisForm, setAnalysisForm] = useState({
    age: "",
    gender: "",
    weight: "",
    heightInFeet: "",
    healthIssues: "",
    fruits: "",
    vegetables: "",
    proteinSources: "",
    wholeGrains: "",
    micronutrientDeficiency: "",
  });
  const [analysisResult, setAnalysisResult] = useState(null);

  // -----------------------
  // Helper: Update Form Fields
  // -----------------------
  const handleChange = (setter) => (e) => {
    setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // -----------------------
  // Handlers: Form Submission
  // -----------------------
  const handleBMISubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/bmi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weight: Number(bmiForm.weight),
          heightInFeet: Number(bmiForm.heightInFeet),
        }),
      });
      const data = await res.json();
      setBmiResult(data.bmi);
    } catch (error) {
      console.error("Error calculating BMI:", error);
    }
  };

  const handleAdviceSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        age: Number(adviceForm.age),
        gender: adviceForm.gender,
        weight: Number(adviceForm.weight),
        heightInFeet: Number(adviceForm.heightInFeet),
        healthIssues: adviceForm.healthIssues || "None",
        dietaryHabits: {
          fruits: Number(adviceForm.fruits),
          vegetables: Number(adviceForm.vegetables),
          proteinSources: Number(adviceForm.proteinSources),
          wholeGrains: Number(adviceForm.wholeGrains),
          micronutrientDeficiency: adviceForm.micronutrientDeficiency || "none",
        },
      };

      const res = await fetch("http://localhost:5000/api/nutrition-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setAdviceResult(data);
    } catch (error) {
      console.error("Error getting advice:", error);
    }
  };

  const handleMealPlanSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        age: Number(mealPlanForm.age),
        gender: mealPlanForm.gender,
        weight: Number(mealPlanForm.weight),
        heightInFeet: Number(mealPlanForm.heightInFeet),
        healthIssues: mealPlanForm.healthIssues || "None",
        dietaryHabits: {
          fruits: Number(mealPlanForm.fruits),
          vegetables: Number(mealPlanForm.vegetables),
          proteinSources: Number(mealPlanForm.proteinSources),
          wholeGrains: Number(mealPlanForm.wholeGrains),
          micronutrientDeficiency: mealPlanForm.micronutrientDeficiency || "none",
        },
        cuisinePreference: mealPlanForm.cuisinePreference || "Any",
      };

      const res = await fetch("http://localhost:5000/api/meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setMealPlanResult(data.mealPlan);
    } catch (error) {
      console.error("Error getting meal plan:", error);
    }
  };

  const handleAnalysisSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        age: Number(analysisForm.age),
        gender: analysisForm.gender,
        weight: Number(analysisForm.weight),
        heightInFeet: Number(analysisForm.heightInFeet),
        healthIssues: analysisForm.healthIssues || "None",
        dietaryHabits: {
          fruits: Number(analysisForm.fruits),
          vegetables: Number(analysisForm.vegetables),
          proteinSources: Number(analysisForm.proteinSources),
          wholeGrains: Number(analysisForm.wholeGrains),
          micronutrientDeficiency: analysisForm.micronutrientDeficiency || "none",
        },
      };

      const res = await fetch("http://localhost:5000/api/detailed-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setAnalysisResult(data.analysis);
    } catch (error) {
      console.error("Error getting analysis:", error);
    }
  };

  // -----------------------
  // Render UI
  // -----------------------
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Nutrition Advisor</h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        {[
          { key: "bmi", label: "BMI Calculator" },
          { key: "advice", label: "Nutrition Advice" },
          { key: "mealPlan", label: "Meal Plan" },
          { key: "analysis", label: "Dietary Analysis" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded ${
              activeTab === tab.key
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border border-blue-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* BMI Calculator */}
      {activeTab === "bmi" && (
        <div className="max-w-md mx-auto bg-white shadow rounded p-6">
          <h2 className="text-2xl font-semibold mb-4">BMI Calculator</h2>
          <form onSubmit={handleBMISubmit}>
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={bmiForm.weight}
              onChange={handleChange(setBmiForm)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="number"
              name="heightInFeet"
              placeholder="Height (feet)"
              value={bmiForm.heightInFeet}
              onChange={handleChange(setBmiForm)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Calculate BMI
            </button>
          </form>
          {bmiResult !== null && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
              <strong>Your BMI:</strong> {bmiResult}
            </div>
          )}
        </div>
      )}

      {/* Nutrition Advice */}
      {activeTab === "advice" && (
        <div className=" mx-auto bg-white shadow rounded p-6">
          <h2 className="text-2xl font-semibold mb-4">Get Nutrition Advice</h2>
          <form onSubmit={handleAdviceSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={adviceForm.age}
                onChange={handleChange(setAdviceForm)}
                className="col-span-1 p-2 border rounded"
                required
              />
              <select
                name="gender"
                value={adviceForm.gender}
                onChange={handleChange(setAdviceForm)}
                className="col-span-1 p-2 border rounded"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mt-4">
              <input
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                value={adviceForm.weight}
                onChange={handleChange(setAdviceForm)}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="number"
                name="heightInFeet"
                placeholder="Height (feet)"
                value={adviceForm.heightInFeet}
                onChange={handleChange(setAdviceForm)}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <textarea
                name="healthIssues"
                placeholder="Health issues (if any)"
                value={adviceForm.healthIssues}
                onChange={handleChange(setAdviceForm)}
                className="w-full p-2 mb-4 border rounded"
              />
            </div>
            <h3 className="text-lg font-medium mb-2">Dietary Habits (per week)</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="fruits"
                placeholder="Fruits servings"
                value={adviceForm.fruits}
                onChange={handleChange(setAdviceForm)}
                className="col-span-1 p-2 border rounded"
                required
              />
              <input
                type="number"
                name="vegetables"
                placeholder="Vegetables servings"
                value={adviceForm.vegetables}
                onChange={handleChange(setAdviceForm)}
                className="col-span-1 p-2 border rounded"
                required
              />
              <input
                type="number"
                name="proteinSources"
                placeholder="Protein servings"
                value={adviceForm.proteinSources}
                onChange={handleChange(setAdviceForm)}
                className="col-span-1 p-2 border rounded"
                required
              />
              <input
                type="number"
                name="wholeGrains"
                placeholder="Whole grains servings"
                value={adviceForm.wholeGrains}
                onChange={handleChange(setAdviceForm)}
                className="col-span-1 p-2 border rounded"
                required
              />
            </div>
            <input
              type="text"
              name="micronutrientDeficiency"
              placeholder="Micronutrient deficiency (or 'none')"
              value={adviceForm.micronutrientDeficiency}
              onChange={handleChange(setAdviceForm)}
              className="w-full p-2 mt-4 mb-4 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Get Advice
            </button>
          </form>
          {adviceResult && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
              {/* Render the advice output using ReactMarkdown to format it */}
              <ReactMarkdown>
                {`**BMI:** ${adviceResult.bmi}\n\n**Issue:** ${adviceResult.nutritionProblem}\n\n**Advice:**\n\n${adviceResult.advice}`}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}

      {/* Meal Plan */}
      {activeTab === "mealPlan" && (
        <div className="max-w-lg mx-auto bg-white shadow rounded p-6">
          <h2 className="text-2xl font-semibold mb-4">Get Meal Plan</h2>
          <form onSubmit={handleMealPlanSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={mealPlanForm.age}
                onChange={handleChange(setMealPlanForm)}
                className="col-span-1 p-2 border rounded"
                required
              />
              <select
                name="gender"
                value={mealPlanForm.gender}
                onChange={handleChange(setMealPlanForm)}
                className="col-span-1 p-2 border rounded"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mt-4">
              <input
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                value={mealPlanForm.weight}
                onChange={handleChange(setMealPlanForm)}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="number"
                name="heightInFeet"
                placeholder="Height (feet)"
                value={mealPlanForm.heightInFeet}
                onChange={handleChange(setMealPlanForm)}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <textarea
                name="healthIssues"
                placeholder="Health issues (if any)"
                value={mealPlanForm.healthIssues}
                onChange={handleChange(setMealPlanForm)}
                className="w-full p-2 mb-4 border rounded"
              />
            </div>
            <h3 className="text-lg font-medium mb-2">Dietary Habits (per week)</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="fruits"
                placeholder="Fruits servings"
                value={mealPlanForm.fruits}
                onChange={handleChange(setMealPlanForm)}
                className="col-span-1 p-2 border rounded"
                required
              />
              <input
                type="number"
                name="vegetables"
                placeholder="Vegetables servings"
                value={mealPlanForm.vegetables}
                onChange={handleChange(setMealPlanForm)}
                className="col-span-1 p-2 border rounded"
                required
              />
              <input
                type="number"
                name="proteinSources"
                placeholder="Protein servings"
                value={mealPlanForm.proteinSources}
                onChange={handleChange(setMealPlanForm)}
                className="col-span-1 p-2 border rounded"
                required
              />
              <input
                type="number"
                name="wholeGrains"
                placeholder="Whole grains servings"
                value={mealPlanForm.wholeGrains}
                onChange={handleChange(setMealPlanForm)}
                className="col-span-1 p-2 border rounded"
                required
              />
            </div>
            <input
              type="text"
              name="micronutrientDeficiency"
              placeholder="Micronutrient deficiency (or 'none')"
              value={mealPlanForm.micronutrientDeficiency}
              onChange={handleChange(setMealPlanForm)}
              className="w-full p-2 mt-4 mb-4 border rounded"
              required
            />
            <input
              type="text"
              name="cuisinePreference"
              placeholder="Preferred Cuisine (optional)"
              value={mealPlanForm.cuisinePreference}
              onChange={handleChange(setMealPlanForm)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Get Meal Plan
            </button>
          </form>
          {mealPlanResult && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded whitespace-pre-wrap">
              <ReactMarkdown>{mealPlanResult}</ReactMarkdown>
            </div>
          )}
        </div>
      )}

      {/* Detailed Dietary Analysis */}
      {activeTab === "analysis" && (
        <div className="max-w-lg mx-auto bg-white shadow rounded p-6">
          <h2 className="text-2xl font-semibold mb-4">Detailed Dietary Analysis</h2>
          <form onSubmit={handleAnalysisSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={analysisForm.age}
                onChange={handleChange(setAnalysisForm)}
                className="col-span-1 p-2 border rounded"
                required
              />
              <select
                name="gender"
                value={analysisForm.gender}
                onChange={handleChange(setAnalysisForm)}
                className="col-span-1 p-2 border rounded"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mt-4">
              <input
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                value={analysisForm.weight}
                onChange={handleChange(setAnalysisForm)}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="number"
                name="heightInFeet"
                placeholder="Height (feet)"
                value={analysisForm.heightInFeet}
                onChange={handleChange(setAnalysisForm)}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <textarea
                name="healthIssues"
                placeholder="Health issues (if any)"
                value={analysisForm.healthIssues}
                onChange={handleChange(setAnalysisForm)}
                className="w-full p-2 mb-4 border rounded"
              />
            </div>
            <h3 className="text-lg font-medium mb-2">Dietary Habits (per week)</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="fruits"
                placeholder="Fruits servings"
                value={analysisForm.fruits}
                onChange={handleChange(setAnalysisForm)}
                className="col-span-1 p-2 border rounded"
                required
              />
              <input
                type="number"
                name="vegetables"
                placeholder="Vegetables servings"
                value={analysisForm.vegetables}
                onChange={handleChange(setAnalysisForm)}
                className="col-span-1 p-2 border rounded"
                required
              />
              <input
                type="number"
                name="proteinSources"
                placeholder="Protein servings"
                value={analysisForm.proteinSources}
                onChange={handleChange(setAnalysisForm)}
                className="col-span-1 p-2 border rounded"
                required
              />
              <input
                type="number"
                name="wholeGrains"
                placeholder="Whole grains servings"
                value={analysisForm.wholeGrains}
                onChange={handleChange(setAnalysisForm)}
                className="col-span-1 p-2 border rounded"
                required
              />
            </div>
            <input
              type="text"
              name="micronutrientDeficiency"
              placeholder="Micronutrient deficiency (or 'none')"
              value={analysisForm.micronutrientDeficiency}
              onChange={handleChange(setAnalysisForm)}
              className="w-full p-2 mt-4 mb-4 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Get Analysis
            </button>
          </form>
          {analysisResult && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded whitespace-pre-wrap">
              <ReactMarkdown>{analysisResult}</ReactMarkdown>
            </div>
          )}
        </div>
      )}
      <div>
      
      </div>
      
    </div>
  );
}

export default App;
