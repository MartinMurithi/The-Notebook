import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./NotesItem.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, deleteNotes } from "../../Redux/Features/Slice";
import NoteUpdate from "../NoteInput/NoteUpdate";

function NoteItem() {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescriptio] = useState("");
  const [date, setDate] = useState("");
  const [noteItems, setNoteItems] = useState([]);
  const [displayUpdateForm, setDisplayUpdateForm] = useState(false);

  const dispatch = useDispatch();

  let { notes } = useSelector((state) => {
    return state;
  });

  const deleteNote = (id) => {
    dispatch(deleteNotes({ id }));
    dispatch(fetchNotes());
  };

  const updateNote = (id) => {
    setDisplayUpdateForm(true);
    console.log('edit note');
  };

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  return (
    <>
      {notes.notes && notes.notes.length > 0
        ? notes.notes.map((note) => {
            return (
              <>
                <div className="noteItemDiv" key={note.id}>
                  <div className="noteItem" >
                    <div className="titleDiv">
                      <h2 className="noteTitle">{note.noteTitle}</h2>
                    </div>
                    <div className="noteDescriptionDiv">
                      <p className="noteDescription">{note.noteDescription}</p>
                    </div>
                    <hr className="split" />
                    <div className="date_editDelete">
                      <div className="dateDiv">
                        <p className="date">{note.date}</p>
                      </div>
                      <div className="editDeleteOption">
                        <FaEdit
                          className="utilIcons"
                          onClick={() => {
                            updateNote(note.id);
                          }}
                        />
                        <FaTrash
                          className="utilIcons"
                          onClick={() => {
                            deleteNote(note.id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {displayUpdateForm && <NoteUpdate/>}
              </>
            );
          })
        : null}
    </>
  );
}

export default NoteItem;
