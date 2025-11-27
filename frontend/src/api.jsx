const API_URL = "http://127.0.0.1:5000";

export async function signupUser(username, password) {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function loginUser(username, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function analyzeResume(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    body: formData,npm 
  });
  return res.json();
}
