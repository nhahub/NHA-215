import React from 'react'
import { useNavigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {

    const token = localStorage.getItem("userToken")
    const navigate = useNavigate("")

    if (token) {
        setTimeout(() =>{
            navigate("/")
        }, 1500)

        return (
            <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gradient-to-br from-[#090f0fff] to-[#0c5c5fff] text-white p-4 animate-ultraSmoothFadeIn">
                <div className="max-w-md mx-auto p-6 bg-[#121212] rounded-lg shadow text-white">
                    <h2 className="text-xl font-semibold mb-4 text-green-400">You are already logged in.</h2>
                    <p className="text-gray-300">Redirecting…</p>
                </div>
            </div>
            )
    }

  return (children)
}

export default PublicRoute