'use client'

import React, { useState } from 'react'
import { FormInput, FormSelect, FormTextarea } from './FormElements'

export default function NutritionAdviceForm() {
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
    micronutrientDeficiency: ''
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
      bmi: '22.5',
      nutritionProblem: 'Low vegetable intake',
      advice: 'Increase your daily vegetable consumption to improve overall health.'
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get Nutrition Advice</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          name="age"
          label="Age"
          type="number"
          value={form.age}
          onChange={handleInputChange}
          required
        />
        <FormSelect
          name="gender"
          label="Gender"
          value={form.gender}
          onChange={handleInputChange}
          required
          options={[
            { value: '', label: 'Select Gender' },
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Other', label: 'Other' },
          ]}
        />
        <FormInput
          name="weight"
          label="Weight (kg)"
          type="number"
          value={form.weight}
          onChange={handleInputChange}
          required
        />
        <FormInput
          name="heightInFeet"
          label="Height (feet)"
          type="number"
          value={form.heightInFeet}
          onChange={handleInputChange}
          required
        />
      </div>
      <FormTextarea
        name="healthIssues"
        label="Health issues (if any)"
        value={form.healthIssues}
        onChange={handleInputChange}
      />
      <h3 className="text-lg font-medium text-gray-700 mt-6 mb-2">Dietary Habits (Frequency per week)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          name="fruits"
          label="Fruits servings"
          type="number"
          value={form.fruits}
          onChange={handleInputChange}
          required
        />
        <FormInput
          name="vegetables"
          label="Vegetables servings"
          type="number"
          value={form.vegetables}
          onChange={handleInputChange}
          required
        />
        <FormInput
          name="proteinSources"
          label="Protein source servings"
          type="number"
          value={form.proteinSources}
          onChange={handleInputChange}
          required
        />
        <FormInput
          name="wholeGrains"
          label="Whole grains servings"
          type="number"
          value={form.wholeGrains}
          onChange={handleInputChange}
          required
        />
      </div>
      <FormInput
        name="micronutrientDeficiency"
        label="Micronutrient deficiency (if any, else 'none')"
        type="text"
        value={form.micronutrientDeficiency}
        onChange={handleInputChange}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Get Advice
      </button>
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Results:</h3>
          <p><strong>BMI:</strong> {result.bmi}</p>
          <p><strong>Issue:</strong> {result.nutritionProblem}</p>
          <p><strong>Advice:</strong> {result.advice}</p>
        </div>
      )}
    </form>
  )
}
