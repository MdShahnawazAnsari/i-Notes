import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = import.meta.env.VITE_APP_SERVER_URL;
  const [notes, setNotes] = useState([]);

  // Adding a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    setNotes(notes.concat(json));
  };
  // Fetch All Notes
  const fetchAllNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setNotes(json);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Editin a Note
  const editNote = async (id, title, description, tag, alert) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    // console.log(json)
    // Edit in Clint Side
    const newNote = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNote.length; i++) {
      if (newNote[i]._id === id) {
        alert("Your Note has been updated", "success");
        newNote[i].title = title;
        newNote[i].description = description;
        newNote[i].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  };

  // Deleting a note
  const deleteNote = async (id, alert) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
    let newNote = notes.filter((item) => {
      return item._id !== id;
    });
    alert("Your Note has been deleted Successfully", "success");
    return setNotes(newNote);
  };
  return (
    <noteContext.Provider
      value={{ notes, addNote, fetchAllNotes, editNote, deleteNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
