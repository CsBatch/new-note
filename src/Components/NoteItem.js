import React, { useContext } from 'react'
import noteContext from '../Context/Notes/noteContext'

function NoteItem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { notes, updateNote } = props;


    return (
        <>
            <>
                <div className="p-3">
                    <div className="card">
                        <div className="card-header">
                            {notes.title}
                            <button className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { updateNote(notes) }}><i className="bi bi-pencil-square"></i></button>
                            <button className="btn" onClick={() => { deleteNote(notes._id) }}><i className="bi bi-trash3"></i></button>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{notes.description}</p>

                            <p className="card-text"></p>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default NoteItem
