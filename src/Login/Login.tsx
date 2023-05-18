import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppStateContext } from "../App";
import "./Login.css";



function validateUser(username: string, password: string): boolean {
  return username === "admin" && password === "password";
}

const Login: React.FC = () => {
  const { setMyState } = useContext(AppStateContext);

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateUser(username, password)) {
      setMessage("Login successful!");
      setMyState(true);
      setTimeout(function () {
        navigate("/dashboard");
      }, 500);
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
