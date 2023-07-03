import credentialsContext from "./credentialsContext";
// import {useHistory} from 'react-router-dom'

const CredentialsState = (props) => {
  // const history = useHistory();
  const host = import.meta.env.VITE_APP_SERVER_URL;

  // login context using Post /api/auth/loginuser
  const login = async (email, password, alert) => {
    try {
      const response = await fetch(`${host}/api/auth/loginuser`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        alert("Loged in successfully", "success");
        // window.location.reload();
        // history.push("/")
      } else {
        alert("please login with correct email and password", "danger");
      }
      // history.push("/")
    } catch (error) {
      console.log(error.message);
    }
  };

  // signUp context using Post /api/auth/createuser

  const signUp = async (name, email, password, alert) => {
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        alert("created new user successfully", "success");
      } else {
        alert("sorry a user with this email already exist", "danger");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <credentialsContext.Provider value={{ login, signUp }}>
      {props.children}
    </credentialsContext.Provider>
  );
};
export default CredentialsState;
