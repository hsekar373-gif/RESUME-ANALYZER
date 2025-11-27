import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Master from "./Master";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="app-container">
      {!loggedIn ? (
        showSignup ? (
          <Signup onSignup={() => setShowSignup(false)} />
        ) : (
          <Login onLogin={() => setLoggedIn(true)} onSwitch={() => setShowSignup(true)} />
        )
      ) : (
        <Master />
      )}
    </div>
  );
}

export default App;
