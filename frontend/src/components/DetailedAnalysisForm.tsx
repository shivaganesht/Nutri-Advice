

import { useState } from "react"

export default function DetailedAnalysisForm() {
  const [form, setForm] = useState({
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
      analysis: `
Based on the provided information:
- Your BMI is in the normal range
- Your fruit and vegetable intake is below recommended levels
- You may benefit from increasing your protein intake
- Consider adding more variety to your whole grain consumption
- No significant micronutrient deficiencies detected
      `,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detailed Dietary Analysis</h2>
      {/* Add the same form fields as in NutritionAdviceForm */}
      {/* ... */}
      <button
        type="submit"
        className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300"
      >
        Get Analysis
      </button>
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Analysis:</h3>
          <pre className="whitespace-pre-wrap">{result.analysis}</pre>
        </div>
      )}
    </form>
  )
}

