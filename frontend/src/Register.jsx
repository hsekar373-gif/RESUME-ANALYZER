import { useState } from "react";
import { registerUser } from "./api";

function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(username, password);
      setMsg(res.message);
      if (res.success) {
        onRegister();
      }
    } catch {
      setMsg("Registration failed");
    }
  };

  return (
    <div className="card">
      <h2>📝 Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username}
          onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      {msg && <p style={{ color: "green" }}>{msg}</p>}
    </div>
  );
}

export default Register;
