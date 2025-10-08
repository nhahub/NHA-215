import React from 'react'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
    const navigate = useNavigate()
  return (
    <section className='min-h-[calc(100vh-72px)] bg-[#172627] p-16'>
        <button
        onClick={() => navigate("/signup")}
        className='text-[20px] text-white bg-[#0e898e] p-4 rounded-[24px] hover:scale-110 hover:bg-[#172627] hover:text-[#0e898e] transition-all'>
        Sign up
        </button>
    </section>
  )
}

export default SignIn