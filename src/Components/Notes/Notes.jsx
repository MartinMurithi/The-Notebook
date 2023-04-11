import React, { useState } from "react";
import { auth } from "../../Config/Firebase";
import { useNavigate } from "react-router-dom";
import "./Notes.css";
import { FaPlus } from "react-icons/fa";
import { Logo } from "../Logo/Logo";
import NoteInput from "../NoteInput/NoteInput";
import NoteItem from "../NotesItem/NotesItem";

function Notes() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [displayNoteInputForm, setDisplayNoteInputForm] = useState(false);

  const handleLogout = async () => {
    try {
      const user = await auth.signOut();
      console.log(user);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDisplayNoteInput = () => {
    setDisplayNoteInputForm((current) => !current);
    console.log("Enter note");
  };
  return (
    <div className="notesDiv">
      <Logo />

      <div className="logOutBtnDiv">
        <button onClick={handleLogout} className="logOutBtn">
          LogOut
        </button>
      </div>
      <div className="util">
        <div className="section">
          <div className="addNoteDiv">
            <div className="bcgDiv">
              <FaPlus className="addNoteBtn" onClick={handleDisplayNoteInput} />
            </div>
          </div>
          {displayNoteInputForm && <NoteInput />}
        </div>
        <NoteItem />
      </div>
    </div>
  );
}

export default Notes;
