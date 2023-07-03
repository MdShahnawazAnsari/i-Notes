import React, { useContext, useState } from "react";
import credentialsContext from "../context/authentication/credentialsContext";


export default function SignUp(props) {

  const context = useContext(credentialsContext)
  const { signUp } = context
  const [credentials, SetCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const handleOnChange = (event) => {
    SetCredentials({ ...credentials, [event.target.name]: event.target.value })
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    // console.log('yup working', credentials.email, credentials.password, typeof credentials.confirmPassword)
    if (credentials.password === credentials.confirmPassword) {
      signUp(credentials.name, credentials.email, credentials.password, props.showAlert)
    } else {
      props.showAlert("password does'nt match", "warning")
    }
  }
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input required type="text" className="form-control" id="name" name="name" minLength={5} value={credentials.name} onChange={handleOnChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input required type="email" className="form-control" id="email" name="email" minLength={5} value={credentials.email} onChange={handleOnChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input required type="password" className="form-control" id="password" name="password" minLength={5} onChange={handleOnChange} value={credentials.password} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Confirm Password</label>
          <input required type="password" className="form-control" id="confirmPassword" name="confirmPassword" minLength={5} onChange={handleOnChange} value={credentials.confirmPassword} />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </>
  )
}
