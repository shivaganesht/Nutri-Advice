'use client'

import React, { useState } from 'react'
import { FormInput, FormSelect, FormTextarea } from './FormElements'

export default function MealPlanForm() {
  const [form, setForm] = useState({
    age: '',
    gender: '',
    weight: '',
    heightInFeet: '',
    healthIssues: '',
    fruits: '',
    vegetables: '',
    proteinSources: '',
    wholeGrains: '',
    micronutrientDeficiency: '',
    cuisinePreference: ''
  })
  const [result, setResult] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Implement form submission logic here
    // For now, we'll just set a mock result
    setResult({
      mealPlan: `
Breakfast: Oatmeal with berries and nuts
Lunch: Grilled chicken salad with mixed vegetables
Dinner: Baked salmon with quinoa and steamed broccoli
Snacks: Greek yogurt with honey, Apple slices with almond butter
      `
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get Meal Plan</h2>
      {/* Add the same form fields as in NutritionAdviceForm */}
      {/* ... */}
      <FormInput
        name="cuisinePreference"
        label="Cuisine Preference (optional)"
        type="text"
        value={form.cuisinePreference}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
      >
        Get Meal Plan
      </button>
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Meal Plan:</h3>
          <pre className="whitespace-pre-wrap">{result.mealPlan}</pre>
        </div>
      )}
    </form>
  )
}
