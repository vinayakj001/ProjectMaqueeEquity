import React, { useState } from "react";
import "./Login.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  password: string;
}

function validateUser(username: string, password: string): boolean {
  return username === "admin" && password === "password";
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateUser(username, password)) {
      setMessage("Login successful!");
      localStorage.setItem("authenticated", "72f4f34t4ytg44");
      setTimeout(function () {
        navigate("/dashboard");
      }, 1000);
    } else {
      setMessage("Invalid username or password.");
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </label>
        <br />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default Login;
