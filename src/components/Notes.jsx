import React, { useContext, useEffect, useState, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, fetchAllNotes, editNote } = context;
  useEffect(() => {
    fetchAllNotes();
  }, []);

  // Edit note
  const ref = useRef();
  const refClose = useRef();
  const [note, setNote] = useState({
    id: "",
    editTitle: "",
    editDescription: "",
    editTag: "default",
  });

  const handleOnChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };
  const handleOnClick = () => {
    editNote(
      note.id,
      note.editTitle,
      note.editDescription,
      note.editTag,
      props.showAlert
    );
    refClose.current.click();
  };
  const updateNote = (currentNote) => {
    ref.current.click();
    console.log("update");
    setNote({
      id: currentNote._id,
      editTitle: currentNote.title,
      editDescription: currentNote.description,
      editTag: currentNote.tag,
    });
  };
  return (
    <>
      <AddNote showAlert={props.showAlert} />

      {/* Modal starts */}

      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit your Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleOnChange}
                    value={note.editTitle}
                    id="editTitle"
                    name="editTitle"
                    aria-describedby="emailHelp"
                    minLength={2}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleOnChange}
                    value={note.editDescription}
                    id="editDescription"
                    name="editDescription"
                    minLength={3}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleOnChange}
                    value={note.editTag}
                    id="editTag"
                    name="editTag"
                    minLength={3}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={
                  note.editTitle.length < 3 || note.editDescription.length < 5
                }
                onClick={handleOnClick}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal end */}

      <h4 className="my-3">Your Notes</h4>
      <div className="row my-3">
        <div className="container">
          <h6>
            {notes.length === 0 &&
              "You don't have any Notes to show Write your firest Note"}
          </h6>
        </div>
        {localStorage.getItem("token") &&
          notes?.map((elem) => {
            return (
              <NoteItem
                key={elem._id}
                showAlert={props.showAlert}
                updateNote={updateNote}
                note={elem}
              />
            );
          })}
      </div>
    </>
  );
};

export default Notes;
