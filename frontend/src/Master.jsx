import { useState } from "react";
import { analyzeResume } from "./api";

function Master() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await analyzeResume(file);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="container animate-slide">
      <h1>📄 AI Resume Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".txt,.pdf,.docx" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">{loading ? "Analyzing..." : "Upload & Analyze"}</button>
      </form>

      {result && (
        <div className="result-box">
          <h2>Analysis Result</h2>
          <p><b>Score:</b> {result.score}</p>
          <h3>✅ Strengths</h3>
          <ul>{result.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
          <h3>⚠ Weaknesses</h3>
          <ul>{result.weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul>
          <h3>💡 Suggestions</h3>
          <ul>{result.suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
      )}
    </div>
  );
}
export default Master;
