import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export default function AddNote(props) {
  const context = useContext(noteContext)
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "default" })

  const handleOnChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value })
  };
  const handleOnClick = (event) => {
    event.preventDefault();
    addNote(note.title, note.description, note.tag)
    props.showAlert("Your Note has been Successfully Added", "success")
    setNote({ title: "", description: "", tag: "default" })
  }
  return (
    <>
      <h3 className="my-3">Add a Note</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" onChange={handleOnChange} id="title" value={note.title} required name="title" aria-describedby="emailHelp" minLength={2} placeholder="Type Your Title here" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" onChange={handleOnChange} id="description" value={note.description} required name="description" minLength={5} placeholder="Type Your description here" />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" onChange={handleOnChange} id="tag" value={note.tag} name="tag" minLength={3} />
        </div>

        <button type="submit" className="btn btn-primary" disabled={note.title.length < 3 || note.description.length < 5} onClick={handleOnClick}>Submit</button>
      </form>
    </>
  )
}