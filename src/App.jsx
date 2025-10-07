import { NavLink, Route, Routes, useNavigate } from "react-router-dom"
import MainNav from "./layouts/MainNav";
import About from "./pages/About";
import Home from "./pages/Home";

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
      </Routes>
      {/* end routes */}
    </>
  )
}

export default App
