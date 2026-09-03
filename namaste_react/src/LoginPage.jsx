import "./LoginPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import RegisterUser from "./RegisterUser";
function Login() {
  const [submit, setsubmit] = useState();
  const press = () => {
    setsubmit(alert("done"));
  };
  return (
    <div className="containers">
      <div className="box">
        <img src="login.png" alt="" className="jpg" />
        <h1>Welcome Back</h1>

        <input type="email" placeholder="Enter your email" className="input" />

        <input
          type="password"
          placeholder="Enter your password"
          className="input"
        />
        <button className="login-btn" onClick={press}>
          Login
        </button>
        <Link to="/registeruser" className="reg">
          <h5 className="red">Register Your Account</h5>
          <Link to="/forget" className="reg">
            <h5 className="red">Forget Password?</h5>
          </Link>
        </Link>
        {/* <Link to="/forget" className="reg"></Link> */}
      </div>
    </div>
  );
}

export default Login;
