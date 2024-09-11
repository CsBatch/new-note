import React, { useContext, useState } from "react";
import noteContext from '../Context/Notes/noteContext';


function AddNotes() {
    const Context = useContext(noteContext);
    const { addNote } = Context

    const [input, setInput] = useState({ title: "", description: "", tag: "" })

    const handleClick = async (e) => {
        e.preventDefault();
        await addNote(input.title, input.description, input.tag);
        setInput({ title: "", description: "", tag: "" });
    }

    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='noteArea'>
                <h2>Add Note</h2>
                <form onSubmit={handleClick} className='my-3'>
                    <div className="mb-3">
                        <i>Title</i>
                        <input className="form-control" type="text" id="title" name="title" value={input.title} onChange={onChange} minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <i>Description</i>
                        <input className="form-control" type="text" id="description" name='description' value={input.description} onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <i>Tag</i>
                        <input className="form-control" type="text" id="tag" name='tag' value={input.tag} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddNotes
