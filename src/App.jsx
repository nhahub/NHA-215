// import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import { NavLink, Route, Routes, Link } from "react-router-dom";
import MainNav from "./layouts/MainNav";
import About from "./pages/About";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Chatbot from "./pages/Chatbot";
import Errorpage from "./pages/Errorpage";
import Logout from "./pages/Logout";
import CVform from "./pages/CVform";
function App() {
  return (
    <>
      {/* start nav */}
      <MainNav />
      {/* end nav */}
      {/* start routes */}
      <Routes>
        <Route path="*" element={<Errorpage />} /> 
        <Route path="/" element={<Home />} /> {/* in nav bar */}
        <Route path="/about" element={<About />} /> {/* in nav bar */}
        <Route path="/chatbot" element={<Chatbot />} /> {/* in nav bar */}
        <Route path="/logout" element={<Logout />} /> {/* in nav bar */}
        <Route path="/signin" element={<SignIn />} /> {/* in About */}
        <Route path="/signup" element={<Signup />} /> {/* in Singin */}
        <Route path="/CVform" element={<CVform />} /> {/* in Singin */}
      </Routes>
      {/* end routes */}
    </>
  );
}

export default App;
