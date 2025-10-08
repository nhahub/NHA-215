import React from 'react'
import Aboutcard from '../components/Aboutcard'
import { Outlet, useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <section className='min-h-[calc(100vh-72px)] bg-[#172627] px-16'>
      <h2 className='py-16 text-white text-[50px]'>| Step by step</h2>
      <div className='flex flex-wrap content-center items-center pb-12 justify-between gap-16'>
      <Aboutcard text={"Resume Intelligence & Job Matching"} icon={"fa-regular fa-file text-[70px] text-[#172627]"}/>
      <Aboutcard text={"Market Trends Support and Analysis"} icon={"fa-regular fa-comments text-[70px] text-[#172627]"}/>
      <Aboutcard text={"Interview Simulation Chatbot "} icon={"fa-solid fa-money-bill-trend-up text-[70px] text-[#172627]"}/>
      </div>
      <button
      onClick={() => navigate("/signin")}
      className='text-[20px] text-white bg-[#0e898e] p-4 rounded-[24px] hover:scale-110 hover:bg-[#172627] hover:text-[#0e898e] transition-all'>
      Start your new journey
      </button>
    </section>
  )

}

export default About