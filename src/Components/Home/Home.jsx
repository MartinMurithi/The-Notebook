import React from "react";
import { FaPen } from "react-icons/fa";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

  return (
    <div className="home">
      <div className="homePage">
        <div className="title">
          <h1 className="titleText">THE NOTEBOOK {<FaPen />}</h1>
        </div>

        <div className="about">
          <p className="aboutText">
            This application allows users to add notes( title and their
            description) and saves them to the firestore database. It uses
            technologies such as React, firestore, firebase authentication and
            react icons.
          </p>
        </div>
        <div className="btns">
          <button className="signIn" id="btn" onClick={()=>{navigate('/login')}}>Sign In</button>
          <button className="signUp" id="btn" onClick={()=>{navigate('/register')}}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
