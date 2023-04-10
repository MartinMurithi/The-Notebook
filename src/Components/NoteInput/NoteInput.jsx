import React, { useState } from "react";
import "./NoteInput.css";
import { db } from "../../Config/Firebase";
import { addDoc, collection } from "firebase/firestore";

function NoteInput() {
  const [closeForm, setCloseForm] = useState(true);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setnoteDescription] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const dbRef = collection(db, "notes");

  const handleCloseForm = () => {
    setCloseForm((current) => !current);
  };

  const handleAddNote = async () => {
    setDate(date);
    const noteObj = { noteTitle, noteDescription, date };
    if (noteTitle.trim().length > 0 || noteDescription.trim().length > 0) {
      try {
        await addDoc(dbRef, noteObj);
        console.log(noteTitle, noteDescription, date);
      } catch (error) {
        console.error(error.message);
      }
      setNoteTitle("");
      setnoteDescription("");
      setCloseForm(false);
    } else {
      console.log("Both fields cant be empty");
    }
  };

  return (
    <div className="noteInputDiv">
      {closeForm && (
        <div className="formNote">
          <div className="title_cancelBtn">
            <h4 className="formTitle">Add a new note</h4>
            <p className="cancelBtn" onClick={handleCloseForm}>
              X
            </p>
          </div>
          <label htmlFor="inputTitle" className="titleLabel">
            Title
          </label>
          <input
            type="text"
            placeholder="Note title"
            required
            name="inputTitle"
            value={noteTitle}
            id="inputTitle"
            className="noteInput"
            onChange={(e) => {
              setNoteTitle(e.target.value);
            }}
          />
          {/* {isTitleEmpty ? (
            <p className="error">*Field cannot be empty</p>
          ) : ''} */}

          <label htmlFor="inputDescription" className="titleLabel">
            Description
          </label>
          <textarea
            type="text"
            placeholder="Note description"
            required
            value={noteDescription}
            id="inputDescription"
            className="noteInput"
            rows={5}
            onChange={(e) => {
              setnoteDescription(e.target.value);
            }}
          />

          <button className="addBtn" onClick={handleAddNote}>
            Add Note
          </button>
        </div>
      )}
    </div>
  );
}

export default NoteInput;
