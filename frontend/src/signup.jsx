import { useState } from "react";
import { signupUser } from "./api";

function Signup({ onSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await signupUser(username, password);
    setMsg(res.message);
    if (res.success) onSignup();
  };

  return (
    <div className="container animate-fade">
      <h2>📝 Create Account</h2>
      <form onSubmit={handleSignup}>
        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
export default Signup;
