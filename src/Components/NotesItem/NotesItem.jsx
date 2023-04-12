import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./NotesItem.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, deleteNotes } from "../../Redux/Features/Slice";
import NoteUpdate from "../NoteInput/NoteUpdate";

function NoteItem() {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setnoteDescription] = useState("");
  const [date, setDate] = useState("");
  const [displayUpdateForm, setDisplayUpdateForm] = useState(false);

  const [formUpdateID, setFormUpdateID] = useState(null);
  const [formUpdateTitle, setFormUpdateTitle] = useState(null);
  const [formUpdateDescription, setFormUpdateDescription] = useState(null);

  const dispatch = useDispatch();

  let { notes } = useSelector((state) => {
    return state;
  });

  const deleteNote = (id) => {
    dispatch(deleteNotes({ id }));
  };

  const handleDisplayUpdateForm = (id, title, description) => {
    setDisplayUpdateForm((current) => !current);
    setFormUpdateID(id);
    setFormUpdateTitle(title);
    setFormUpdateDescription(description);
  };

  console.log(notes.notes);

  return (
    <>
      {notes.notes && notes.notes.length > 0
        ? notes.notes.map((note) => {
            return (
              <>
                <div className="noteItemDiv" key={note.id}>
                  <div className="noteItem">
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
                            handleDisplayUpdateForm(
                              note.id,
                              note.noteTitle,
                              note.noteDescription
                            );
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

                {displayUpdateForm && (
                  <NoteUpdate
                    id={formUpdateID}
                    title={formUpdateTitle}
                    description={formUpdateDescription}
                  />
                )}
              </>
            );
          })
        : null}
    </>
  );
}

export default NoteItem;
