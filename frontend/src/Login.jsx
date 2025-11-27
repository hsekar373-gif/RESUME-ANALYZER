import { useState } from "react";
import { loginUser } from "./api";

function Login({ onLogin, onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await loginUser(username, password);
    if (res.success) onLogin();
    else setError(res.message);
  };

  return (
    <div className="container animate-fade">
      <h2>🔐 Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "yellow" }}>{error}</p>}
      <p>
        Don’t have an account? <span onClick={onSwitch} style={{ cursor: "pointer", color: "cyan" }}>Sign up</span>
      </p>
    </div>
  );
}
export default Login;
