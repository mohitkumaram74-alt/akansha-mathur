import "./LoginPage.css";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

import { Link } from "react-router-dom";
function ForgetPassword() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className={`containers ${darkMode ? "dark" : ""}`}>
      <div className="box">
        <img src="pass.jpg" alt="" className="jpg" />
        <h2>Forgot Password </h2>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            placeholder="Enter your email"
            className="input"
            id="email"
          />
        </label>
        <label htmlFor="passwords">
          New Password:
          <input
            type="password"
            placeholder="Creat your new Password"
            className="input"
            id="passwords"
          />
        </label>
        <button className="login-btn">Conform</button>
        <Link to="/login" className="reg">
          <h5 className="red">Return Back to Login Page</h5>
        </Link>
      </div>
    </div>
  );
}
export default ForgetPassword;
