import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Unable to log in. Please try again.");
        return;
      }

      localStorage.setItem("accessToken", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      navigate("/");
    } catch {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`containers ${darkMode ? "dark" : ""}`}>
      <div className="box">
        <img src="login.png" alt="" className="jpg" />
        <h1>Welcome Back</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
          {error && <p role="alert">{error}</p>}
          <button className="login-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="reg">
          <Link to="/registeruser">
            <h5 className="red">Register Your Account</h5>
          </Link>
          <Link to="/forget">
            <h5 className="red">Forget Password?</h5>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
