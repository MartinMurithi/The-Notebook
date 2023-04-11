import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./NoteInput.css";
import { editNotes, fetchNotes } from "../../Redux/Features/Slice";

function NoteUpdate() {
  const [closeForm, setCloseForm] = useState(true);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setnoteDescription] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const dispatch = useDispatch();

  const handleCloseForm = () => {
    setCloseForm((current) => !current);
    console.log("close form");
  };
  const handleUpdateNote = async (id) => {
    setDate(date);
    if (noteTitle.trim().length > 0 || noteDescription.trim().length > 0) {
      dispatch(editNotes({ id },{noteTitle: noteTitle, noteDescription: noteDescription, date: date }));
      dispatch(fetchNotes());
      setNoteTitle("");
      setnoteDescription("");
      handleCloseForm();
    } else {
      console.log("Both fields cant be empty");
    }
  };

  return (
    <div className="noteInputDiv">
      {closeForm && (
        <div className="formNote">
          <div className="title_cancelBtn">
            <h4 className="formTitle">Update note</h4>
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

          <button className="addBtn" onClick={handleUpdateNote}>
            Update Note
          </button>
        </div>
      )}
    </div>
  );
}

export default NoteUpdate;
