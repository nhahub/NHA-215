import React from 'react'
import { NavLink } from 'react-router-dom'

const MainNav = () => {

  return (
    <div className=" w-screen h-[72px] bg-sec flex justify-between items-center content-center">
        <img className=" w" src="" alt="" />
        <nav className=" flex text-white gap-8">
            <NavLink to='/' className='nav-t'> Home</NavLink>
            <NavLink to='/About' className='nav-t'> About</NavLink>
            <NavLink to='/Chatbot' className='nav-t'> Chatbot</NavLink>
        </nav>
        <button className=""></button>
    </div>
  )
}

export default MainNav