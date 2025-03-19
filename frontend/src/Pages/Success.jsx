import React from 'react'
import { BsCheck2Circle } from 'react-icons/bs'
import { GoHome } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid-lg w-100 d-flex justify-content-center align-items-center">
      <div>
        <div className='d-flex justify-content-center align-items-center'>
          <BsCheck2Circle size={122} color='green' />
        </div>
        <h1 className='text-center'>Success</h1>
        <p>Your order has been placed successfully</p>
        <div>
          <p style={{ cursor: 'pointer' }}>back to hompage <span><GoHome onClick={() => navigate('/')} /></span></p>
        </div>
      </div>

    </div>
  )
}

export default Success