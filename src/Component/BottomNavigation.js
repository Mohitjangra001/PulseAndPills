import React, { useState, useEffect } from 'react';
import PrescriptionUpload from "../Component/Assets/icon/prescriptionIcon.png";
import cart from "../Component/Assets/icon/cart.png";
import Home from "../Component/Assets/icon/home.png";
import User from "../Component/Assets/icon/user.png";
import call from "../Component/Assets/icon/order.png";
import { Link } from 'react-router-dom';

const BottomNavigation = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeItem, setActiveItem] = useState('home');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleOrderOnCallClick = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      window.location.href = 'tel:8708427649'; // Initiates the call
    }, 3000);
  };

  if (!isMobile) {
    return null;
  }

  return (
    <nav className="z-40 fixed bottom-0 left-0 right-0 bg-white px-4 py-2 flex justify-evenly items-center gap-6 text-black border-t">
      <Link to='/' className={`flex flex-col items-center ${activeItem === 'home' ? 'text-green-500' : ''}`} onClick={() => handleItemClick('home')}>
        <img src={Home} className="w-8 h-8" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link to='/prescription' className={`flex flex-col mr-10 items-center ${activeItem === 'upload' ? 'text-green-500' : ''}`} onClick={() => handleItemClick('upload')}>
        <img src={PrescriptionUpload} className='w-8 h-8'/>
        <span className="text-xs mt-1">Upload</span>
      </Link>
      <div className={`absolute -top-8 ${activeItem === 'order-on-call' ? 'text-green-500' : ''}`} onClick={handleOrderOnCallClick}>
        <div className='flex flex-col items-center w-28 h-20 bg-white border-4 border-green-500 rounded-full p-1'>
          <img src={call} className='w-8 h-8'/>
          <span className="text-xs mt-1 font-bold rounded-full">Order On Call</span>
        </div>
      </div>
      <Link to='/cart' className={`flex flex-col ml-10 items-center ${activeItem === 'cart' ? 'text-green-500' : ''}`} onClick={() => handleItemClick('cart')}>
        <img src={cart} className="w-8 h-8" />
        <span className="text-xs mt-1">Cart</span>
      </Link>
      <Link to='/user/:activepage' className={`flex flex-col items-center ${activeItem === 'userProfile' ? 'text-green-500' : ''}`} onClick={() => handleItemClick('userProfile')}>
        <img src={User} className="w-8 h-8" />
        <span className="text-xs mt-1">Profile</span>
      </Link>
      
      {showPopup && (
        <div className="fixed bottom-16 left-0 right-0 bg-gray-800 text-white text-center py-2">
          Place an order by calling easily. Please wait...
        </div>
      )}
    </nav>
  );
};

export default BottomNavigation;
