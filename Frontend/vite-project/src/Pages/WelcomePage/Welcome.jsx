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
    <div className='welcomePage'>
      Welcome to ERP
    </div>
  );
};

export default Welcome;
