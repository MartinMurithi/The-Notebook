import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { auth } from "../../Config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/notes");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="login">
      <div className="loginForm">
        <h2 className="loginTitle">Login</h2>
        <label htmlFor="input_email">Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          required
          id="input_email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label htmlFor="input_password">Password</label>
        <input
          type="password"
          placeholder="Password"
          required
          id="input_password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p className="errorMessage">{error}</p>
        <button className="loginBtn" onClick={handleLogin}>
          Login
        </button>
        <p className="registerOption">
          Don't have an account?{" "}
          <Link to={"/register"} className="registerLink">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
