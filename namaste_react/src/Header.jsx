import { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "./UseOnlineStatus";
import { Routes, Route, NavLink } from "react-router-dom";
import Login from "./LoginPage";
import Home from "./Home";
import About from "./About";
import ResturentManu from "./ResturentManu";
import Contact from "./Contact";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import Body from "./Body";
import RegisterUser from "./RegisterUser";
import ForgetPassword from "./ForgetPassword";
const Grocery = lazy(() => import("./Grocery"));
function Header() {
  const [login, setlogin] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  // const logbtn = (logins) => {
  //   if (logins === "Log in") {
  //     setlogin == "Logout";
  //   } else {
  //     setlogin("log in");
  //   }
  // const logbtn = (logins) => {
  //   login === "Login" ? setlogin("logout") : setlogin("login");
  // };
  const onlinestatus = useOnlineStatus();
  return (
    <div className="main">
      <nav className={darkMode ? "nav dark-nav" : "nav"}>
        <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>
        <div className="logo">
          <img
            src="https://marketplace.canva.com/EAFaFUz4aKo/2/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-JmYWTjUsE-Q.jpg"
            alt="img"
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
      <Routes>
        <Route path="/" element={<Body></Body>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/registeruser" element={<RegisterUser />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route
          path="/resturants/:resId"
          element={<ResturentManu></ResturentManu>}
        ></Route>
        <Route
          path="/grocery"
          element={
            <Suspense fallback={<h1>Loding.......</h1>}>
              <Grocery></Grocery>
            </Suspense>
          }
        ></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
      </Routes>
    </div>
  );
}

export default Header;
