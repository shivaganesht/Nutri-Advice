
// import React, { useState } from "react";
// import ReactMarkdown from "react-markdown"; 

// function App() {
//   const [activeTab, setActiveTab] = useState("advice");


//   const [bmiForm, setBmiForm] = useState({ weight: "", heightInFeet: "" });
//   const [bmiResult, setBmiResult] = useState(null);

  
//   const [adviceForm, setAdviceForm] = useState({
//     age: "",
//     gender: "",
//     weight: "",
//     heightInFeet: "",
//     healthIssues: "",
//     fruits: "",
//     vegetables: "",
//     proteinSources: "",
//     wholeGrains: "",
//     micronutrientDeficiency: "",
//   });
//   const [adviceResult, setAdviceResult] = useState(null);

  
//   const [mealPlanForm, setMealPlanForm] = useState({
//     age: "",
//     gender: "",
//     weight: "",
//     heightInFeet: "",
//     healthIssues: "",
//     fruits: "",
//     vegetables: "",
//     proteinSources: "",
//     wholeGrains: "",
//     micronutrientDeficiency: "",
//     cuisinePreference: "",
//   });
//   const [mealPlanResult, setMealPlanResult] = useState(null);

  
//   const [analysisForm, setAnalysisForm] = useState({
//     age: "",
//     gender: "",
//     weight: "",
//     heightInFeet: "",
//     healthIssues: "",
//     fruits: "",
//     vegetables: "",
//     proteinSources: "",
//     wholeGrains: "",
//     micronutrientDeficiency: "",
//   });
//   const [analysisResult, setAnalysisResult] = useState(null);

  
//   const handleChange = (setter) => (e) => {
//     setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

  
//   const handleBMISubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/api/bmi", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           weight: Number(bmiForm.weight),
//           heightInFeet: Number(bmiForm.heightInFeet),
//         }),
//       });
//       const data = await res.json();
//       setBmiResult(data.bmi);
//     } catch (error) {
//       console.error("Error calculating BMI:", error);
//     }
//   };

//   const handleAdviceSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
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
//           micronutrientDeficiency: adviceForm.micronutrientDeficiency || "none",
//         },
//       };

//       const res = await fetch("http://localhost:5000/api/nutrition-advice", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();
//       setAdviceResult(data);
//     } catch (error) {
//       console.error("Error getting advice:", error);
//     }
//   };

//   const handleMealPlanSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
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
//           micronutrientDeficiency: mealPlanForm.micronutrientDeficiency || "none",
//         },
//         cuisinePreference: mealPlanForm.cuisinePreference || "Any",
//       };

//       const res = await fetch("http://localhost:5000/api/meal-plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();
//       setMealPlanResult(data.mealPlan);
//     } catch (error) {
//       console.error("Error getting meal plan:", error);
//     }
//   };

//   const handleAnalysisSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
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
//           micronutrientDeficiency: analysisForm.micronutrientDeficiency || "none",
//         },
//       };

//       const res = await fetch("http://localhost:5000/api/detailed-analysis", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();
//       setAnalysisResult(data.analysis);
//     } catch (error) {
//       console.error("Error getting analysis:", error);
//     }
//   };

 
//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <h1 className="text-3xl font-bold text-center mb-8">Nutrition Advisor</h1>

//       {/* Tabs */}
//       <div className="flex justify-center space-x-4 mb-8">
//         {[
//           { key: "bmi", label: "BMI Calculator" },
//           { key: "advice", label: "Nutrition Advice" },
//           { key: "mealPlan", label: "Meal Plan" },
//           { key: "analysis", label: "Dietary Analysis" },
//         ].map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveTab(tab.key)}
//             className={`px-4 py-2 rounded ${
//               activeTab === tab.key
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-blue-600 border border-blue-600"
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

      
//       {activeTab === "bmi" && (
//         <div className="max-w-md mx-auto bg-white shadow rounded p-6">
//           <h2 className="text-2xl font-semibold mb-4">BMI Calculator</h2>
//           <form onSubmit={handleBMISubmit}>
//             <input
//               type="number"
//               name="weight"
//               placeholder="Weight (kg)"
//               value={bmiForm.weight}
//               onChange={handleChange(setBmiForm)}
//               className="w-full p-2 mb-4 border rounded"
//               required
//             />
//             <input
//               type="number"
//               name="heightInFeet"
//               placeholder="Height (feet)"
//               value={bmiForm.heightInFeet}
//               onChange={handleChange(setBmiForm)}
//               className="w-full p-2 mb-4 border rounded"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//             >
//               Calculate BMI
//             </button>
//           </form>
//           {bmiResult !== null && (
//             <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
//               <strong>Your BMI:</strong> {bmiResult}
//             </div>
//           )}
//         </div>
//       )}

      
//       {activeTab === "advice" && (
//         <div className=" mx-auto bg-white shadow rounded p-6">
//           <h2 className="text-2xl font-semibold mb-4">Get Nutrition Advice</h2>
//           <form onSubmit={handleAdviceSubmit}>
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="number"
//                 name="age"
//                 placeholder="Age"
//                 value={adviceForm.age}
//                 onChange={handleChange(setAdviceForm)}
//                 className="col-span-1 p-2 border rounded"
//                 required
//               />
//               <select
//                 name="gender"
//                 value={adviceForm.gender}
//                 onChange={handleChange(setAdviceForm)}
//                 className="col-span-1 p-2 border rounded"
//                 required
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div className="mt-4">
//               <input
//                 type="number"
//                 name="weight"
//                 placeholder="Weight (kg)"
//                 value={adviceForm.weight}
//                 onChange={handleChange(setAdviceForm)}
//                 className="w-full p-2 mb-4 border rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="heightInFeet"
//                 placeholder="Height (feet)"
//                 value={adviceForm.heightInFeet}
//                 onChange={handleChange(setAdviceForm)}
//                 className="w-full p-2 mb-4 border rounded"
//                 required
//               />
//               <textarea
//                 name="healthIssues"
//                 placeholder="Health issues (if any)"
//                 value={adviceForm.healthIssues}
//                 onChange={handleChange(setAdviceForm)}
//                 className="w-full p-2 mb-4 border rounded"
//               />
//             </div>
//             <h3 className="text-lg font-medium mb-2">Dietary Habits (per week)</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="number"
//                 name="fruits"
//                 placeholder="Fruits servings"
//                 value={adviceForm.fruits}
//                 onChange={handleChange(setAdviceForm)}
//                 className="col-span-1 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="vegetables"
//                 placeholder="Vegetables servings"
//                 value={adviceForm.vegetables}
//                 onChange={handleChange(setAdviceForm)}
//                 className="col-span-1 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="proteinSources"
//                 placeholder="Protein servings"
//                 value={adviceForm.proteinSources}
//                 onChange={handleChange(setAdviceForm)}
//                 className="col-span-1 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="wholeGrains"
//                 placeholder="Whole grains servings"
//                 value={adviceForm.wholeGrains}
//                 onChange={handleChange(setAdviceForm)}
//                 className="col-span-1 p-2 border rounded"
//                 required
//               />
//             </div>
//             <input
//               type="text"
//               name="micronutrientDeficiency"
//               placeholder="Micronutrient deficiency (or 'none')"
//               value={adviceForm.micronutrientDeficiency}
//               onChange={handleChange(setAdviceForm)}
//               className="w-full p-2 mt-4 mb-4 border rounded"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//             >
//               Get Advice
//             </button>
//           </form>
//           {adviceResult && (
//             <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
//               <ReactMarkdown>
//                 {`**BMI:** ${adviceResult.bmi}\n\n**Issue:** ${adviceResult.nutritionProblem}\n\n**Advice:**\n\n${adviceResult.advice}`}
//               </ReactMarkdown>
//             </div>
//           )}
//         </div>
//       )}

      
//       {activeTab === "mealPlan" && (
//         <div className="max-w-lg mx-auto bg-white shadow rounded p-6">
//           <h2 className="text-2xl font-semibold mb-4">Get Meal Plan</h2>
//           <form onSubmit={handleMealPlanSubmit}>
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="number"
//                 name="age"
//                 placeholder="Age"
//                 value={mealPlanForm.age}
//                 onChange={handleChange(setMealPlanForm)}
//                 className="col-span-1 p-2 border rounded"
//                 required
//               />
//               <select
//                 name="gender"
//                 value={mealPlanForm.gender}
//                 onChange={handleChange(setMealPlanForm)}
//                 className="col-span-1 p-2 border rounded"
//                 required
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div className="mt-4">
//               <input
//                 type="number"
//                 name="weight"
//                 placeholder="Weight (kg)"
//                 value={mealPlanForm.weight}
//                 onChange={handleChange(setMealPlanForm)}
//                 className="w-full p-2 mb-4 border rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="heightInFeet"
//                 placeholder="Height (feet)"
//                 value={mealPlanForm.heightInFeet}
//                 onChange={handleChange(setMealPlanForm)}
//                 className="w-full p-2 mb-4 border rounded"
//                 required
//               />
//               <textarea
//                 name="healthIssues"
//                 placeholder="Health issues (if any)"
//                 value={mealPlanForm.healthIssues}
//                 onChange={handleChange(setMealPlanForm)}
//                 className="w-full p-2 mb-4 border rounded"
//               />
//             </div>
//             <h3 className="text-lg font-medium mb-2">Dietary Habits (per week)</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="number"
//                 name="fruits"
//                 placeholder="Fruits servings"
//                 value={mealPlanForm.fruits}
//                 onChange={handleChange(setMealPlanForm)}
//                 className="col-span-1 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="vegetables"
//                 placeholder="Vegetables servings"
//                 value={mealPlanForm.vegetables}
//                 onChange={handleChange(setMealPlanForm)}
//                 className="col-span-1 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="proteinSources"
//                 placeholder="Protein servings"
//                 value={mealPlanForm.proteinSources}
//                 onChange={handleChange(setMealPlanForm)}
//                 className="col-span-1 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="wholeGrains"
//                 placeholder="Whole grains servings"
//                 value={mealPlanForm.wholeGrains}
//                 onChange={handleChange(setMealPlanForm)}
//                 className="col-span-1 p-2 border rounded"
//                 required
//               />
//             </div>
//             <input
//               type="text"
//               name="micronutrientDeficiency"
//               placeholder="Micronutrient deficiency (or 'none')"
//               value={mealPlanForm.micronutrientDeficiency}
//               onChange={handleChange(setMealPlanForm)}
//               className="w-full p-2 mt-4 mb-4 border rounded"
//               required
//             />
//             <input
//               type="text"
//               name="cuisinePreference"
//               placeholder="Preferred Cuisine (optional)"
//               value={mealPlanForm.cuisinePreference}
//               onChange={handleChange(setMealPlanForm)}
//               className="w-full p-2 mb-4 border rounded"
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//             >
//               Get Meal Plan
//             </button>
//           </form>
//           {mealPlanResult && (
//             <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded whitespace-pre-wrap">
//               <ReactMarkdown>{mealPlanResult}</ReactMarkdown>
//             </div>
//           )}
//         </div>
//       )}

      
//       {activeTab === "analysis" && (
//         <div className="max-w-lg mx-auto bg-white shadow rounded p-6">
//           <h2 className="text-2xl font-semibold mb-4">Detailed Dietary Analysis</h2>
//           <form onSubmit={handleAnalysisSubmit}>
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="number"
//                 name="age"
//                 placeholder="Age"
//                 value={analysisForm.age}
//                 onChange={handleChange(setAnalysisForm)}
//                 className="col-span-1 p-2 border rounded"
//                 required
//               />
//               <select
//                 name="gender"
//                 value={analysisForm.gender}
//                 onChange={handleChange(setAnalysisForm)}
//                 className="col-span-1 p-2 border rounded"
//                 required
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div className="mt-4">
//               <input
//                 type="number"
//                 name="weight"
//                 placeholder="Weight (kg)"
//                 value={analysisForm.weight}
//                 onChange={handleChange(setAnalysisForm)}
//                 className="w-full p-2 mb-4 border rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="heightInFeet"
//                 placeholder="Height (feet)"
//                 value={analysisForm.heightInFeet}
//                 onChange={handleChange(setAnalysisForm)}
//                 className="w-full p-2 mb-4 border rounded"
//                 required
//               />
//               <textarea
//                 name="healthIssues"
//                 placeholder="Health issues (if any)"
//                 value={analysisForm.healthIssues}
//                 onChange={handleChange(setAnalysisForm)}
//                 className="w-full p-2 mb-4 border rounded"
//               />
//             </div>
//             <h3 className="text-lg font-medium mb-2">Dietary Habits (per week)</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="number"
//                 name="fruits"
//                 placeholder="Fruits servings"
//                 value={analysisForm.fruits}
//                 onChange={handleChange(setAnalysisForm)}
//                 className="col-span-1 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="vegetables"
//                 placeholder="Vegetables servings"
//                 value={analysisForm.vegetables}
//                 onChange={handleChange(setAnalysisForm)}
//                 className="col-span-1 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="proteinSources"
//                 placeholder="Protein servings"
//                 value={analysisForm.proteinSources}
//                 onChange={handleChange(setAnalysisForm)}
//                 className="col-span-1 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="wholeGrains"
//                 placeholder="Whole grains servings"
//                 value={analysisForm.wholeGrains}
//                 onChange={handleChange(setAnalysisForm)}
//                 className="col-span-1 p-2 border rounded"
//                 required
//               />
//             </div>
//             <input
//               type="text"
//               name="micronutrientDeficiency"
//               placeholder="Micronutrient deficiency (or 'none')"
//               value={analysisForm.micronutrientDeficiency}
//               onChange={handleChange(setAnalysisForm)}
//               className="w-full p-2 mt-4 mb-4 border rounded"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//             >
//               Get Analysis
//             </button>
//           </form>
//           {analysisResult && (
//             <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded whitespace-pre-wrap">
//               <ReactMarkdown>{analysisResult}</ReactMarkdown>
//             </div>
//           )}
//         </div>
//       )}
//       <div>
      
//       </div>
      
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

function App() {
  // Tab state
  const [activeTab, setActiveTab] = useState("advice");

  // BMI Calculator state
  const [bmiForm, setBmiForm] = useState({ weight: "", heightInFeet: "" });
  const [bmiResult, setBmiResult] = useState(null);

  // Nutrition Advice state
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

  // Meal Plan state
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

  // Detailed Dietary Analysis state
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

  // History state
  const [history, setHistory] = useState([]);

  // Fetch History from backend
  const fetchHistory = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/history");
      const data = await res.json();
      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  // Fetch history on component mount
  useEffect(() => {
    fetchHistory();
  }, []);

  // Helper to update form fields
  const handleChange = (setter) => (e) => {
    setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handler for BMI submission
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
      fetchHistory();
    } catch (error) {
      console.error("Error calculating BMI:", error);
    }
  };

  // Handler for Nutrition Advice submission
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
          micronutrientDeficiency:
            adviceForm.micronutrientDeficiency || "none",
        },
      };
      const res = await fetch("http://localhost:5000/api/nutrition-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setAdviceResult(data);
      fetchHistory();
    } catch (error) {
      console.error("Error getting advice:", error);
    }
  };

  // Handler for Meal Plan submission
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
          micronutrientDeficiency:
            mealPlanForm.micronutrientDeficiency || "none",
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
      fetchHistory();
    } catch (error) {
      console.error("Error getting meal plan:", error);
    }
  };

  // Handler for Detailed Analysis submission
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
          micronutrientDeficiency:
            analysisForm.micronutrientDeficiency || "none",
        },
      };
      const res = await fetch("http://localhost:5000/api/detailed-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setAnalysisResult(data.analysis);
      fetchHistory();
    } catch (error) {
      console.error("Error getting analysis:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Nutrition Advisor
        </h1>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex justify-center space-x-4 mb-10">
        {[
          { key: "bmi", label: "BMI Calculator" },
          { key: "advice", label: "Nutrition Advice" },
          { key: "mealPlan", label: "Meal Plan" },
          { key: "analysis", label: "Dietary Analysis" },
          { key: "history", label: "History" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded transition-colors ${
              activeTab === tab.key
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* BMI Calculator */}
      {activeTab === "bmi" && (
        <section className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            BMI Calculator
          </h2>
          <form onSubmit={handleBMISubmit} className="space-y-4">
            <div>
              <label className="block font-medium text-gray-600">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={bmiForm.weight}
                onChange={handleChange(setBmiForm)}
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-600">
                Height (feet)
              </label>
              <input
                type="number"
                step="0.01"
                name="heightInFeet"
                value={bmiForm.heightInFeet}
                onChange={handleChange(setBmiForm)}
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Calculate BMI
            </button>
          </form>
          {bmiResult !== null && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
              <strong className="text-gray-700">Your BMI:</strong>{" "}
              {bmiResult}
            </div>
          )}
        </section>
      )}

      {/* Nutrition Advice */}
      {activeTab === "advice" && (
        <section className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Get Nutrition Advice
          </h2>
          <form onSubmit={handleAdviceSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-600">Age</label>
                <input
                  type="number"
                  name="age"
                  value={adviceForm.age}
                  onChange={handleChange(setAdviceForm)}
                  className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-600">
                  Gender
                </label>
                <select
                  name="gender"
                  value={adviceForm.gender}
                  onChange={handleChange(setAdviceForm)}
                  className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-600">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={adviceForm.weight}
                  onChange={handleChange(setAdviceForm)}
                  className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-600">
                  Height (feet)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="heightInFeet"
                  value={adviceForm.heightInFeet}
                  onChange={handleChange(setAdviceForm)}
                  className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-600">
                Health Issues
              </label>
              <input
                type="text"
                name="healthIssues"
                value={adviceForm.healthIssues}
                onChange={handleChange(setAdviceForm)}
                placeholder="e.g., diabetes, hypertension"
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Dietary Habits (per week)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-600">
                    Fruits
                  </label>
                  <input
                    type="number"
                    name="fruits"
                    value={adviceForm.fruits}
                    onChange={handleChange(setAdviceForm)}
                    className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-600">
                    Vegetables
                  </label>
                  <input
                    type="number"
                    name="vegetables"
                    value={adviceForm.vegetables}
                    onChange={handleChange(setAdviceForm)}
                    className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-600">
                    Protein Sources
                  </label>
                  <input
                    type="number"
                    name="proteinSources"
                    value={adviceForm.proteinSources}
                    onChange={handleChange(setAdviceForm)}
                    className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-600">
                    Whole Grains
                  </label>
                  <input
                    type="number"
                    name="wholeGrains"
                    value={adviceForm.wholeGrains}
                    onChange={handleChange(setAdviceForm)}
                    className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-600">
                Micronutrient Deficiency
              </label>
              <input
                type="text"
                name="micronutrientDeficiency"
                value={adviceForm.micronutrientDeficiency}
                onChange={handleChange(setAdviceForm)}
                placeholder="e.g., iron, vitamin D"
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Get Advice
            </button>
          </form>
          {adviceResult && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
              <ReactMarkdown>
                {`**BMI:** ${adviceResult.bmi}\n\n**Issue:** ${adviceResult.nutritionProblem}\n\n**Advice:**\n\n${adviceResult.advice}`}
              </ReactMarkdown>
            </div>
          )}
        </section>
      )}

      {/* Meal Plan */}
      {activeTab === "mealPlan" && (
        <section className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Get Meal Plan
          </h2>
          <form onSubmit={handleMealPlanSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-600">Age</label>
                <input
                  type="number"
                  name="age"
                  value={mealPlanForm.age}
                  onChange={handleChange(setMealPlanForm)}
                  className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-600">
                  Gender
                </label>
                <select
                  name="gender"
                  value={mealPlanForm.gender}
                  onChange={handleChange(setMealPlanForm)}
                  className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-600">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={mealPlanForm.weight}
                  onChange={handleChange(setMealPlanForm)}
                  className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-600">
                  Height (feet)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="heightInFeet"
                  value={mealPlanForm.heightInFeet}
                  onChange={handleChange(setMealPlanForm)}
                  className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-600">
                Health Issues
              </label>
              <input
                type="text"
                name="healthIssues"
                value={mealPlanForm.healthIssues}
                onChange={handleChange(setMealPlanForm)}
                placeholder="e.g., diabetes, hypertension"
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Dietary Habits (per week)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-600">
                    Fruits
                  </label>
                  <input
                    type="number"
                    name="fruits"
                    value={mealPlanForm.fruits}
                    onChange={handleChange(setMealPlanForm)}
                    className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-600">
                    Vegetables
                  </label>
                  <input
                    type="number"
                    name="vegetables"
                    value={mealPlanForm.vegetables}
                    onChange={handleChange(setMealPlanForm)}
                    className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-600">
                    Protein Sources
                  </label>
                  <input
                    type="number"
                    name="proteinSources"
                    value={mealPlanForm.proteinSources}
                    onChange={handleChange(setMealPlanForm)}
                    className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-600">
                    Whole Grains
                  </label>
                  <input
                    type="number"
                    name="wholeGrains"
                    value={mealPlanForm.wholeGrains}
                    onChange={handleChange(setMealPlanForm)}
                    className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-600">
                Micronutrient Deficiency
              </label>
              <input
                type="text"
                name="micronutrientDeficiency"
                value={mealPlanForm.micronutrientDeficiency}
                onChange={handleChange(setMealPlanForm)}
                placeholder="e.g., iron, vitamin D"
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-600">
                Cuisine Preference
              </label>
              <input
                type="text"
                name="cuisinePreference"
                value={mealPlanForm.cuisinePreference}
                onChange={handleChange(setMealPlanForm)}
                placeholder="e.g., Italian, Indian"
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Get Meal Plan
            </button>
          </form>
          {mealPlanResult && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded whitespace-pre-wrap">
              <ReactMarkdown>{mealPlanResult}</ReactMarkdown>
            </div>
          )}
        </section>
      )}

      {/* Detailed Dietary Analysis */}
      {activeTab === "analysis" && (
        <section className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Detailed Dietary Analysis
          </h2>
          <form onSubmit={handleAnalysisSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-600">Age</label>
                <input
                  type="number"
                  name="age"
                  value={analysisForm.age}
                  onChange={handleChange(setAnalysisForm)}
                  className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-600">
                  Gender
                </label>
                <select
                  name="gender"
                  value={analysisForm.gender}
                  onChange={handleChange(setAnalysisForm)}
                  className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-600">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={analysisForm.weight}
                  onChange={handleChange(setAnalysisForm)}
                  className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-600">
                  Height (feet)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="heightInFeet"
                  value={analysisForm.heightInFeet}
                  onChange={handleChange(setAnalysisForm)}
                  className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-600">
                Health Issues
              </label>
              <input
                type="text"
                name="healthIssues"
                value={analysisForm.healthIssues}
                onChange={handleChange(setAnalysisForm)}
                placeholder="e.g., diabetes, hypertension"
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Dietary Habits (per week)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-600">
                    Fruits
                  </label>
                  <input
                    type="number"
                    name="fruits"
                    value={analysisForm.fruits}
                    onChange={handleChange(setAnalysisForm)}
                    className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-600">
                    Vegetables
                  </label>
                  <input
                    type="number"
                    name="vegetables"
                    value={analysisForm.vegetables}
                    onChange={handleChange(setAnalysisForm)}
                    className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-600">
                    Protein Sources
                  </label>
                  <input
                    type="number"
                    name="proteinSources"
                    value={analysisForm.proteinSources}
                    onChange={handleChange(setAnalysisForm)}
                    className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-600">
                    Whole Grains
                  </label>
                  <input
                    type="number"
                    name="wholeGrains"
                    value={analysisForm.wholeGrains}
                    onChange={handleChange(setAnalysisForm)}
                    className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-600">
                Micronutrient Deficiency
              </label>
              <input
                type="text"
                name="micronutrientDeficiency"
                value={analysisForm.micronutrientDeficiency}
                onChange={handleChange(setAnalysisForm)}
                placeholder="e.g., iron, vitamin D"
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Get Analysis
            </button>
          </form>
          {analysisResult && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded whitespace-pre-wrap">
              <ReactMarkdown>{analysisResult}</ReactMarkdown>
            </div>
          )}
        </section>
      )}

      {/* History */}
      {activeTab === "history" && (
        <section className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">History</h2>
          {history.length > 0 ? (
            <ul className="space-y-4">
              {history.map((entry, index) => (
                <li key={index} className="p-4 border rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">
                      Type: {entry.type}
                    </span>
                    <small className="text-gray-500">
                      {new Date(entry.timestamp).toLocaleString()}
                    </small>
                  </div>
                  <div className="prose">
                    <ReactMarkdown>
                      {JSON.stringify(entry.data, null, 2)}
                    </ReactMarkdown>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No history available.</p>
          )}
        </section>
      )}
    </div>
  );
}

export default App;
