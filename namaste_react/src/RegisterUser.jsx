import "./Register.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
function RegisterUser() {
  const [submit, setsubmit] = useState();
  const { darkMode } = useContext(ThemeContext);
  // const press = () => {
  //   setsubmit(alert("done"));
  // };
  return (
    <div className={`containers ${darkMode ? "dark" : ""}`}>
      <div className="box">
        <h1>REGISTER YOUR ACCOUNT</h1>

        <input type="text" placeholder="Enter Your Name" className="input" />
        {/* <input
          type="text"
          placeholder="Enter Your Last Name"
          className="input"
        /> */}
        <input type="email" placeholder="Enter your email" className="input" />
        <input
          type="password"
          placeholder="Enter your password"
          className="input"
          maxLength={10}
        />
        {/* <input type="text" placeholder="Enter Your Address" className="input" /> */}
        <button className="login-btn">Submit</button>
        <Link to="/login" className="reg">
          <h5 className="red">Return Back to Login Page</h5>
        </Link>
      </div>
    </div>
  );
}

export default RegisterUser;
