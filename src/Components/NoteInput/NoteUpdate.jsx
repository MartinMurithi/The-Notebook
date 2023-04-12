import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./NoteInput.css";
import { db } from "../../Config/Firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { editNotes, fetchNotes } from "../../Redux/Features/Slice";

function NoteUpdate({ id, title, description }) {
  const [closeForm, setCloseForm] = useState(true);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setnoteDescription] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [notte, setNote] = useState({});

  const dispatch = useDispatch();
  const dbRef = collection(db, "notes");

  useEffect(() => {
    const getNote = async () => {
      try {
        const note = doc(dbRef, id);
        const n = await getDoc(note);
        setNote(n.data());
      } catch (error) {
        console.error(error.message);
      }
    };
    getNote();
  }, [id]);

  console.log(notte);

  const handleCloseForm = () => {
    setCloseForm((current) => !current);
  };

  const editNote = async (id) => {
    setDate(date);

    try {
      if (noteTitle.trim().length > 0 || noteDescription.trim().length > 0) {
        const note = doc(dbRef, id);
        await updateDoc(note, {noteTitle: noteTitle, noteDescription, date });

      }
    } catch (error) {
      console.error(error.message);
    }
    handleCloseForm();
    window.location.reload();
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
            
            id="inputTitle"
            className="noteInput"
            onChange={(e) => {
              setNoteTitle(e.target.value);
            }}
          />

          <label htmlFor="inputDescription" className="titleLabel">
            Description
          </label>
          <textarea
            type="text"
            placeholder="Note description"
            required
            
            id="inputDescription"
            className="noteInput"
            rows={5}
            onChange={(e) => {
              setnoteDescription(e.target.value);
            }}
          />

          <button
            className="addBtn"
            onClick={() => {
              editNote(id);
            }}
          >
            Update Note
          </button>
        </div>
      )}
    </div>
  );
}

export default NoteUpdate;
