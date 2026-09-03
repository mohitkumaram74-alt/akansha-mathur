import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./Cards.css";
// import Pizza from "./Pizza.jsx";
// import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "./ThemeContext";
import App from "./App.jsx";
// import ForgetPassword from "./ForgetPassword";
// import RegisterUser from "./RegisterUser";
// import Login from "./LoginPage.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>,
);
