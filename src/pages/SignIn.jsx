import React from 'react'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
    const navigate = useNavigate()
  return (
    <section className='min-h-[calc(100vh-72px)] bg-pri p-16'>
        <button
        onClick={() => navigate("/signup")}
        className='btn-p'>
        Sign up
        </button>
    </section>
  )
}

export default SignIn