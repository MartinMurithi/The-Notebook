import React from "react";
import { FaPen } from "react-icons/fa";
import './Logo.css'
import { useNavigate } from "react-router-dom";

export const Logo = () => {
    const navigate = useNavigate();
    const handleHomeLogo = () => {
        navigate('/');
    }

  return (
    <div className="logoDiv">
      <h1 onClick={handleHomeLogo}>The NoteBook {<FaPen />}</h1>
    </div>
  );
};
