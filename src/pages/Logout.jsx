import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await signOut(auth);
      
      
          localStorage.removeItem("userToken");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userId");
      
          navigate("/signin");
      
        } catch (error) {
          console.error("Logout failed:", error);
        }
      };

  return (
    <section className='min-h-[calc(100vh-72px)] flex items-center justify-center bg-gradient-to-br from-[#090f0fff] to-[#0c5c5fff] text-white p-4 animate-ultraSmoothFadeIn'>
        <div className="w-full max-w-md bg-[#121212] p-8 rounded-xl shadow-lg flex flex-col justify-center content-center items-center gap-5">
            <h2 className='text-4xl'>To confirm login</h2>
            <p className='text-xl'>Some data may be lost after logging out</p>
            <button
            className='text-[16px] text-white bg-[#0e898e] p-2 rounded-md  hover:bg-red-600 hover:text-white transition-all ease-in duration-300'
            onClick={handleLogout}
            >
            Logout
            </button>
        </div>
    </section>
  )
}

export default Logout