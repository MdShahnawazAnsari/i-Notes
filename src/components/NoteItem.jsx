import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  // to convert ISO-8601 format into indian time
  const toIndianStandardTime = (input) => {
    const inputDate = new Date(input);
    const offset = 5.5;
    const IST =
      inputDate.getTime() +
      inputDate.getTimezoneOffset() * 60 * 1000 +
      offset * 60 * 60 * 1000;
    const indianDate = new Date(IST);
    return indianDate.toLocaleTimeString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex flex-grow-1">
              <h5 className="card-title">{props.note.title}</h5>
              <i
                className="fa-regular mx-3 my-1 fa-trash-can"
                onClick={() => deleteNote(props.note._id, props.showAlert)}
              ></i>
              <i
                className="fa-regular mx-3 my-1 fa-pen-to-square"
                onClick={() => {
                  return props.updateNote(props.note);
                }}
              ></i>
            </div>
            <p className="card-text">{props.note.description}</p>
            <p className="card-text">{toIndianStandardTime(props.note.date)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
