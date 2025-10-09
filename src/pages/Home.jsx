import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
  return (
    <header className='min-h-[calc(100vh-72px)] px-16 bg-pri flex flex-col items-start gap-10 justify-center'>
        <h1 className=' text-[70px] font-bold text-white'>Find Your Dream Job!</h1>
        <p className=' text-[30px] text-white'>
            Looking for a new job? We’re here to help! <br /> 
            Explore top companies, apply in minutes, and <br />
            find the right role that matches your skills <br />
            and passion.
        </p>
        <button onClick={() => navigate("/About")} className='btn-p'>More details</button>
    </header>
  )
}

export default Home