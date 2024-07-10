import React, { useState, useEffect, useRef } from 'react';
import './AccountSettings.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from "@mui/icons-material/Logout";

const BASE_URL = 'https://pulsenpills.onrender.com/api';

const AccountSettings = ({ isLoggedIn=true, setIsLoggedIn }) => {


  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    phone: '', 
    lastName: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          const response = await axios.get(`${BASE_URL}/users/getUsers`, config);
          setFormData(response.data);
        } else {
          toast.error('Failed to fetch data');

        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        
      }
    };

    fetchUserData();
  },[]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form data submitted:', formData);
  };
  

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <div className='accountsettings mb-16'>
      <h1 className='mainhead1'>Personal Information</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='firstName'>Firsts Name <span>*</span></label>
          <input 
            type='text' 
            name='name' 
            id='name' 
            value={formData.firstName} 
            onChange={handleChange} 
          />
        </div>
        <div className='form-group'>
          <label htmlFor='firstName'>Last Name <span>*</span></label>
          <input 
            type='text' 
            name='lastName' 
            id='name' 
            value={formData.lastName} 
            onChange={handleChange} 
          />
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>Phone/Mobile <span>*</span></label>
          <input 
            type='text' 
            name='phone' 
            id='phone' 
            value={formData.phone} 
            onChange={handleChange} 
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email <span>*</span></label>
          <input 
            type='email' 
            name='email' 
            id='email' 
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>
        <div className=''>
            {isLoggedIn?(<button onClick={handleLogout} className="w-20 ml-1 h-10 border-2 border-gray-200 rounded-lg mt-3 text-black bg-[#3498db]">
              Log out 

            </button>):(<></>)}
            </div>
        
        <button className='mainbutton1' type='submit'>Save Changes</button>
      </form>
    </div>
  );
}

export default AccountSettings;
