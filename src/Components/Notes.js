import React, { useContext, useState, useEffect, useRef } from 'react';
import noteContext from '../Context/Notes/noteContext';
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';

function Notes() {
    const Context = useContext(noteContext);
    const { notes, getAllNotes, editNote } = Context;
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllNotes();
        }
        else {
            navigate('/Login');
        }
    }, [getAllNotes, navigate])

    const refClose = useRef(null)
    const [input, setInput] = useState({ id: "", editTitle: "", editDescription: "", editTag: "" })

    const updateNote = (currentNote) => {
        setInput({ id: currentNote._id, editTitle: currentNote.title, editDescription: currentNote.description, editTag: currentNote.tag })
    }


    const handleClick = (e) => {
        e.preventDefault();
        editNote(input.id, input.editTitle, input.editDescription, input.editTag)
        refClose.current.click();
    }

    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    return (
        <div className='noteTab container'>
            <div className="row">
                <div className="addNotes pb-5 col-sm-12 col-md-4 ">
                    <AddNotes />
                </div>
                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className='my-3'>
                                    <div className="mb-3">
                                        <label className='form-label' htmlFor="editTitle" >Title</label>
                                        <input className="form-control" type="text" id="editTitle" name="editTitle" value={input.editTitle} onChange={onChange} minLength={3} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className='form-label' htmlFor="editDescription">Description</label>
                                        <input className="form-control" type="text" id="editDescription" name='editDescription' value={input.editDescription} onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className='form-label' htmlFor="editTag">Tag</label>
                                        <input className="form-control" type="text" id="editTag" name='editTag' value={input.editTag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="noteContent col-sm-12 col-md-8 p-2">
                        <div className='listHeader'>Your Notes</div>
                        <div className="noteCollection ">
                            {notes.length === 0 && 'No notes to display!'}
                            {notes.map((notes) => {
                                return <NoteItem key={notes._id} updateNote={updateNote} notes={notes} />
                            })}
                        </div>
                </div>
            </div>

        </div>
    )
}

export default Notes
