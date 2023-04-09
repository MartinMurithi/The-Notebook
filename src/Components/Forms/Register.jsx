import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Config/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/notes');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="registration">
      <div className="signUpForm">
        <h2 className="registerTitle">Register</h2>
        <label htmlFor="input_email">Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          required
          id="input_email"
          onChange={(e)=>{setEmail(e.target.value)}}
        />

        <label htmlFor="input_password">Password</label>
        <input
          type="password"
          placeholder="Password"
          required
          id="input_password"
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <p className="errorMessage">{ error }</p>

        <button className="registerBtn" onClick={handleRegister}>Sign Up</button>
        <p className="signInOption">Already have an accout? <Link to={'/login'} className="logInLink">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
