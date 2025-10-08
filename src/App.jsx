import { NavLink, Route, Routes, useNavigate } from "react-router-dom"
import MainNav from "./layouts/MainNav";
import About from "./pages/About";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      {/* start nav */}
      <MainNav />
      {/* end nav */}
      {/* start routes */}
      <Routes>
        <Route path="/" element={<Home/>}/> {/* in nav bar */}
        <Route path="/About" element={<About/>}/> {/* in nav bar */}
        <Route path="/Signin" element={<SignIn/>}/> {/* in About */}
        <Route path="/signup" element={<Signup/>}/> {/* in Singin */}
      </Routes>
      {/* end routes */}
    </>
  )
}

export default App
