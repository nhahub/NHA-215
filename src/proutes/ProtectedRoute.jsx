import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


const ProtectedRoute = ({ children }) => {
    
    const navigate = useNavigate("");
    const token = localStorage.getItem("userToken");

    if (!token) {
        setTimeout(() => {
            navigate("/signin")
        }, 1500)
        return (
        <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gradient-to-br from-[#090f0fff] to-[#0c5c5fff] text-white p-4 animate-ultraSmoothFadeIn">
            <div className="max-w-md mx-auto p-6 bg-[#121212] rounded-lg shadow text-white">
                <h2 className="text-xl font-semibold mb-4 text-green-400">You must log in first to use this page.</h2>
                <p className="text-gray-300">Redirecting…</p>
            </div>
        </div>
        )
    }

    return (children)
}

export default ProtectedRoute