import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import useOnlineStatus from "./UseOnlineStatus";
import { ThemeContext } from "./ThemeContext";

function Header() {
  const [login, setlogin] = useState(false);

  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const onlinestatus = useOnlineStatus();

  return (
    <nav className={darkMode ? "nav dark-nav" : "nav"}>
      <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="logo">
        <img
          src="https://marketplace.canva.com/EAFaFUz4aKo/2/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-JmYWTjUsE-Q.jpg"
          alt="Cooking Logo"
          className="image"
        />
      </div>

      <div className="navs">
        <ul>
          <li>your are: {onlinestatus ? "online" : "offline"}</li>

          <li>
            <Link to="/" className="link">
              HOME
            </Link>
          </li>

          <li>
            <Link to="/about" className="link">
              ABOUT
            </Link>
          </li>

          <li>
            <Link to="/grocery" className="link">
              GROCERY
            </Link>
          </li>

          <li>
            <Link to="/contact" className="link">
              CONTACT
            </Link>
          </li>

          <li>
            <Link to="/login" className="link">
              <button className="akku" onClick={() => setlogin(!login)}>
                Login
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
