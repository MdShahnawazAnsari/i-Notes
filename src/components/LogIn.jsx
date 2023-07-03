import React, { useContext, useState } from "react";
import credentialsContext from "../context/authentication/credentialsContext";

export default function LogIn(props) {
  const context = useContext(credentialsContext)
  const { login } = context
  const [credentials, SetCredentials] = useState({ email: "", password: "" })
  const handleOnChange = (event) => {
    SetCredentials({ ...credentials, [event.target.name]: event.target.value })
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    // console.log('yup working', credentials.email, credentials.password)
    login(credentials.email, credentials.password,props.showAlert)
  }
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleOnChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={handleOnChange} value={credentials.password} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </>
  )
}
