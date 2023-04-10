import React, { useEffect, useState } from "react";
import { db } from "../../Config/Firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function Notes() {
  //state to store our data
  const [notesList, setNotesList] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [time, setTime] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateBody, setUpdateBody] = useState("");

  const notesCollectionRef = collection(db, "notes");

  const fetchData = async () => {
    try {
      const response = await getDocs(notesCollectionRef);
      //return the data which we only need
      const notes = response.docs.map((note) => ({
        ...note.data(),
        id: note.id,
      }));
      setNotesList(notes);
      console.log(notes);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addNote = async () => {
    try {
      let note = { title, body, time };
      await addDoc(notesCollectionRef, note);
      fetchData();
      setTitle("");
      setBody("");
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      let note = doc(notesCollectionRef, id);
      await deleteDoc(note);
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateNote = async (id) => {
    try {
      let newNote = doc(notesCollectionRef, id);
      await updateDoc(newNote, { title: updateTitle, body: updateBody });
      fetchData();
      setUpdateTitle("");
      setUpdateBody("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <form action="">
        <input
          type="text"
          placeholder="title..."
          value={title}
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          type="text"
          placeholder="body..."
          value={body}
          required
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <input
          type="datetime-local"
          value={time}
          required
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />

        <button type="button" onClick={addNote}>
          Add note
        </button>
      </form>

      {notesList && notesList.length > 0 ? (
        notesList.map((note) => {
          return (
            <div key={note.id}>
              <h1>{note.title}</h1>
              <p>{note.body}</p>
              <p>{note.time}</p>
              <input
                type="text"
                value={updateTitle}
                placeholder="Update Title...."
                onChange={(e) => {
                  setUpdateTitle(e.target.value);
                }}
              />
              <input
                type="text"
                value={updateBody}
                placeholder="Update body....."
                onChange={(e) => {
                  setUpdateBody(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateNote(note.id);
                }}
              >
                Update
              </button>
              <button
                onClick={() => {
                  deleteNote(note.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })
      ) : (
        <h5>No notes available</h5>
      )}
    </>
  );
}

export default Notes;
