import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import CredentialsState from "./context/authentication/CredentialsState";
import Alert from "./components/Alert";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import React, { useState } from "react";

export default function App() {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 3500);
  };

  return (
    <>
      <BrowserRouter>
        <NoteState>
          <CredentialsState>
            <Navbar showAlert={showAlert} />
            <Alert alert={alert} />
            <div className="container">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<Home showAlert={showAlert} />}
                />
                <Route exact path="/about" element={<About />} />
                <Route
                  exact
                  path="/login"
                  element={<LogIn showAlert={showAlert} />}
                />
                <Route
                  exact
                  path="/signup"
                  element={<SignUp showAlert={showAlert} />}
                />
              </Routes>
            </div>
          </CredentialsState>
        </NoteState>
      </BrowserRouter>
    </>
  );
}
