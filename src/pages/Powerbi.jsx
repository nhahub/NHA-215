import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Powerbi = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-[calc(100vh-72px)]">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#090f0fff] to-[#0c5c5fff] text-white p-4 animate-ultraSmoothFadeIn z-10">
          <div className="max-w-md mx-auto p-6 bg-[#121212] rounded-lg shadow text-white flex items-center gap-2"> 
            <h2 className="text-2xl font-semibold">Loading data...</h2>
            <svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.2" />
              <path d="M2 12a10 10 0 0110-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      )}

      <iframe
        className="w-full min-h-[calc(100vh-72px)]"
        title="MarketTrendsDEPI"
        src="https://app.powerbi.com/view?r=eyJrIjoiMGMzNzY4YzctYzk2OS00M2I2LWI5NjAtNTRmNTU3NzU3NTczIiwidCI6IjIwODJkZTQ2LTFhZmEtNGI2NC1hNDQwLTY1NThmODBlOTg0MCIsImMiOjh9"
        frameBorder="0"
        allowFullScreen={true}
        onLoad={() => setLoading(false)}
      />

      {!loading && (
        <button 
          onClick={() => navigate("/dashboard")}
          className="absolute top-4 left-4 text-[16px] text-white bg-[#0e898e] p-3 rounded-[24px] hover:scale-110 transition-all ease-in duration-300"
        >
          Back
        </button>
      )}
    </div>
  );
};

export default Powerbi;
