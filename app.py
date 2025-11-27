from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import re

app = Flask(__name__)
CORS(app)

# 🔹 Connect MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["resumeDB"]
users_col = db["users"]
analysis_col = db["analysis"]

# ✅ Home route
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend Running! Use /login, /signup, /analyze"}), 200

# ✅ Signup
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if users_col.find_one({"username": username}):
        return jsonify({"success": False, "message": "User already exists"}), 400

    users_col.insert_one({"username": username, "password": password})
    return jsonify({"success": True, "message": "Account created successfully"}), 200

# ✅ Login
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = users_col.find_one({"username": username, "password": password})
    if user:
        return jsonify({"success": True, "message": "Login successful"}), 200
    return jsonify({"success": False, "message": "Invalid credentials"}), 401

# ✅ AI Resume Analyzer
@app.route("/analyze", methods=["POST"])
def analyze_resume():
    file = request.files["file"]

    # Convert text (for demo, just read PDF/DOCX as plain text)
    text = file.read().decode(errors="ignore")

    # 🔹 Simple AI Analysis (Mock)
    strengths = []
    weaknesses = []
    suggestions = []

    if re.search(r"Python|Java|C\+\+", text, re.IGNORECASE):
        strengths.append("Good programming skills detected")
    else:
        weaknesses.append("No programming skills found")

    if len(text.split()) > 300:
        strengths.append("Resume length is good")
    else:
        weaknesses.append("Resume too short")

    if "team" not in text.lower():
        suggestions.append("Add teamwork experience")
    if "project" not in text.lower():
        suggestions.append("Highlight projects")

    result = {
        "score": 75 if strengths else 40,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "suggestions": suggestions,
    }

    # Save to DB
    analysis_col.insert_one({"resume": text[:100], "result": result})

    return jsonify(result), 200


if __name__ == "__main__":
    app.run(debug=True)
