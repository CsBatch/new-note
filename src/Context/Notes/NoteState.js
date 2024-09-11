import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const host = 'http://localhost:5000';
  const exampleNotes = []
  const [notes, setNotes] = useState(exampleNotes);

  //Get note context
  const getAllNotes = async ()=>{
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json)
    
  }
  
  //Add note context
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  //Delete note context
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  //Edit note context
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);


    let NewNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < NewNotes.length; index++) {
      const element = NewNotes[index];
      if (element._id === id) {
        NewNotes[index].title = title;
        NewNotes[index].description = description;
        NewNotes[index].tag = tag;
        break;
      }
    }
    setNotes(NewNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;