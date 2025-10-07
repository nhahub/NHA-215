import React from 'react'
import { NavLink } from 'react-router-dom'

const MainNav = () => {

  return (
    <div className=" w-screen h-[72px] bg-[#0e898e] flex justify-between items-center content-center">
        <img className=" w" src="" alt="" />
        <nav className=" flex text-white gap-4">
            <NavLink to='/' className=''> Home</NavLink>
            <NavLink to='/About' className=''> About</NavLink>
        </nav>
        <button className=""></button>
    </div>
  )
}

export default MainNav