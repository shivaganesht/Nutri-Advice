# 🥗 Nutrition Advisor

## 📌 Overview
**Nutrition Advisor** is an AI-powered web application that provides personalized dietary recommendations based on user input such as BMI, age, gender, health conditions, and eating habits. The system leverages **Google Gemini AI** to generate expert-driven nutrition advice to help users maintain a healthy lifestyle.

---

## 🚀 Features
- 📊 **BMI Calculation** - Calculates BMI based on user-provided weight and height.
- 🏥 **Nutrition Problem Detection** - Identifies potential nutrition-related issues.
- 🍎 **Dietary Habit Analysis** - Evaluates user eating habits for deficiencies.
- 🤖 **AI-Powered Advice** - Generates personalized nutrition recommendations.
- 🌍 **Cross-Origin Support** - CORS enabled for seamless frontend-backend communication.

---

## 🛠️ Tech Stack
### **Frontend:**
- React.js
- Axios
- HTML, CSS, JavaScript

### **Backend:**
- Node.js
- Express.js
- Google Generative AI (Gemini Pro)
- Body-parser
- CORS

---

## 🎯 How It Works
1. Users enter their **age, gender, weight, height, and dietary habits**.
2. The system **calculates BMI** and evaluates nutrition-related issues.
3. AI-generated **personalized nutrition advice** is provided based on user data.

---

## 🛠️ Installation & Setup
### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nutrition-advisor.git
   cd nutrition-advisor/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your **Google Gemini API Key**:
   ```
   GOOGLE_API_KEY=your_google_api_key
   ```
4. Start the server:
   ```bash
   npm start
   ```

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm start
   ```

The application will be available at **http://localhost:3000** (frontend) and **http://localhost:5000** (backend).

---

## 📌 API Endpoint
### **POST /api/nutrition-advice**
#### Request Body:
```json
{
  "age": 25,
  "gender": "Male",
  "weight": 70,
  "heightInFeet": 5.9,
  "healthIssues": "Diabetes",
  "dietaryHabits": {
    "fruits": 3,
    "vegetables": 2,
    "proteinSources": 2,
    "wholeGrains": 1,
    "micronutrientDeficiency": "Iron"
  }
}
```
#### Response:
```json
{
  "bmi": 23.5,
  "nutritionProblem": "Healthy weight",
  "advice": "Maintain a balanced diet with sufficient iron intake..."
}
```

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 📬 Contact
For any queries, reach out to **Shiva Ganesh Talikota** via [LinkedIn](https://www.linkedin.com/in/shivaganesht/) or email at **shivaganesh9108@gmail.com**.

---

## 🌟 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request. 🚀
