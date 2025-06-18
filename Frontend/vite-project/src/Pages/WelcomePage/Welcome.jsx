import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Welcome.css'

const Welcome = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/Login'); 
    }, 5000); 

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className='welcomePage-container'>
     <h2>Welcome to ERP</h2>
    </div>
  );
};

export default Welcome;
