import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import errorImage from '../assets/images/notfoundjpg.jpg'; 

function NotFound() {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(5);
  let counterInterval;

  useEffect(() => {
    reduceTimer();
    return () => clearInterval(counterInterval);
  }, []);

  useEffect(() => {
    if (counter === 0) {
      goToHome();
    }
  }, [counter]);

  const reduceTimer = () => {
    counterInterval = setInterval(() => {
      setCounter(prev => prev - 1);
    }, 1000);
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
       backgroundImage: `url(${errorImage})`, backgroundSize: "cover" ,
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textAlign: 'center',
        opacity: 0.5, 
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <h1 className='text-white text-4xl'>Page Not Found!</h1>
        <h2 className='text-white text-3xl'>{counter}</h2>
      </div>
    </div>
  );
}

export default NotFound;
