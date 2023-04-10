import React from 'react';
import {FaEllipsisH} from 'react-icons/fa'

function NotesList() {
  return (
      <div className='notesListDiv'>
          <div className="noteItem">
              <h2 className="title">Title</h2>
              <p className="description">Description</p>
              <hr />
              <div className="date_editDelete">
                  <div className="dateDiv"><p className="date">Date</p></div>
                  <div className="editDeleteOption">
                      <FaEllipsisH/>
                  </div>
                  
              </div>
              
              
          </div>
    </div>
  )
}

export default NotesList