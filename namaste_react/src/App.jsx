import { Suspense, lazy, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import About from "./About";
import ResturentManu from "./ResturentManu";
import Contact from "./Contact";
import Login from "./LoginPage";
import Body from "./Body";
import RegisterUser from "./RegisterUser";
import ForgetPassword from "./ForgetPassword";

import { ThemeContext } from "./ThemeContext";

const Grocery = lazy(() => import("./Grocery"));

export default function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? "main dark" : "main"}>
      {/* Common Header */}
      <Header />

      {/* All Routes */}
      <Routes>
        <Route path="/" element={<Body />} />

        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />

        <Route path="/registeruser" element={<RegisterUser />} />

        <Route path="/forget" element={<ForgetPassword />} />

        <Route path="/resturants/:resId" element={<ResturentManu />} />

        <Route
          path="/grocery"
          element={
            <Suspense fallback={<h1>Loading.......</h1>}>
              <Grocery />
            </Suspense>
          }
        />

        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}
