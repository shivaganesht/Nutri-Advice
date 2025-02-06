import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        weight: '',
        heightInFeet: '',
        healthIssues: '',
        fruits: '',
        vegetables: '',
        proteinSources: '',
        wholeGrains: '',
        micronutrientDeficiency: ''
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dietaryHabits = {
            fruits: formData.fruits,
            vegetables: formData.vegetables,
            proteinSources: formData.proteinSources,
            wholeGrains: formData.wholeGrains,
            micronutrientDeficiency: formData.micronutrientDeficiency
        };

        try {
            const response = await axios.post('http://localhost:5000/api/nutrition-advice', {
                age: parseInt(formData.age),
                gender: formData.gender,
                weight: parseFloat(formData.weight),
                heightInFeet: parseFloat(formData.heightInFeet),
                healthIssues: formData.healthIssues,
                dietaryHabits
            });

            setResult(response.data);
        } catch (error) {
            console.error("Error fetching advice:", error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Personalized Nutrition Advisor</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Age:
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Gender:
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <br />
                <label>
                    Weight (kg):
                    <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Height (feet):
                    <input type="number" step="0.01" name="heightInFeet" value={formData.heightInFeet} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Health Issues:
                    <input type="text" name="healthIssues" value={formData.healthIssues} onChange={handleChange} placeholder="e.g., diabetes, hypertension" />
                </label>
                <br />
                <h3>Dietary Habits</h3>
                <label>
                    Fruits per week:
                    <input type="number" name="fruits" value={formData.fruits} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Vegetables per week:
                    <input type="number" name="vegetables" value={formData.vegetables} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Protein Sources per week:
                    <input type="number" name="proteinSources" value={formData.proteinSources} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Whole Grains per week:
                    <input type="number" name="wholeGrains" value={formData.wholeGrains} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Micronutrient Deficiency:
                    <input type="text" name="micronutrientDeficiency" value={formData.micronutrientDeficiency} onChange={handleChange} placeholder="e.g., iron, vitamin D" />
                </label>
                <br />
                <button type="submit">Get Advice</button>
            </form>

            {result && (
                <div>
                    <h2>Results</h2>
                    <p><strong>BMI:</strong> {result.bmi}</p>
                    <p><strong>Nutrition Problem:</strong> {result.nutritionProblem}</p>
                    <p><strong>Advice:</strong> {result.advice}</p>
                </div>
            )}
        </div>
    );
}

export default App;