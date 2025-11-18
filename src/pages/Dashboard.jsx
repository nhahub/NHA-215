import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();

  return (
    <section className='relative min-h-[calc(100vh-72px)]  bg-gradient-to-br from-[#090f0fff] to-[#0c5c5fff] animate-ultraSmoothFadeIn p-16'>

        {/* Button */}
        <button
          onClick={() => navigate("/powerbi") }
          style={{
            background: "#0066ff",
            color: "white",
            padding: "15px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          View Full Power BI Dashboard
        </button>
    </section>
  );
};


export default Dashboard;