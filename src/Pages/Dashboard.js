import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import UserSidebar from '../Component/profile/UserSidebar';
import AccountSettings from '../Component/profile/AccountSettings';
import ChangePassword from '../Component/profile/ChangePassword';
import UserAddress from '../Component/profile/UserAddress';
import LegalNotice from '../Component/profile/LegalNotice';
import YourOrders from '../Component/profile/YourOrders';
import UserLabTest from '../Component/profile/UserLabTest';
import './Dashboard.css'; // Assuming you have a CSS file for Dashboard styles
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://pilse-and-pills.el.r.appspot.com/api';


function Dashboard( {isLoggedIn, setIsLoggedIn}) {
  const { activepage } = useParams();
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          const response = await axios.get(`${BASE_URL}/users/getUsers`, config);
          setUserName(response.data.firstName);
        } else {
          navigate('/login'); // Redirect to login if no token
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        navigate('/login'); // Redirect to login if fetch fails
      }
    };

    fetchUserData();
  }, [navigate]);


  return (
    <div className='mb-24'>
    <div className="text-black text-2xl font-medium mr-2 text-center">Hey {userName || 'My Dashboard'}!</div>
    <div className="text-black text-lg font-medium mr-2 text-center">Welcome to your dashboard</div>


    <div className='m-2 flex flex-row items-center justify-center gap-5'>
      <div className='userprofilein'>
        <div className='left'>
          <UserSidebar activepage={activepage} />
        </div>
        <div className='right'>
          {activepage === 'accountsettings' && <AccountSettings  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}
          {/* {activepage === 'changepassword' && <ChangePassword />} */}
          {activepage === 'yourorders' && <YourOrders />}

          {activepage === 'LabTest' && <UserLabTest/>}

          {/* {activepage === 'address' && <UserAddress />} */}
          {activepage === 'legalnotice' && <LegalNotice />}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
