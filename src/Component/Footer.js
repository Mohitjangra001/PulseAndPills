import React from 'react'
import Logo from "./Assets/Logo.png";
import Payment from "./Assets/payments2.png.png";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import { FaFacebookF,FaLinkedinIn } from "react-icons/fa";
import { FaInstagram,FaXTwitter } from "react-icons/fa6";



function Footer() {
  return (
    <div className='w-full hidden sm:block bg-[#184363] h-96'>
    {/* first section */}
      <div className='w-[87%] m-auto  flex flex-row h-80 pt-10 justify-evenly'>

        <div className='flex flex-col gap-2 items-baseline h-11 '>
          <div className='flex flex-row gap-2 h-full mt-2'>
            <img src={Logo} alt='logo' className='h-full object-cover'/>
            <div className='text-2xl text-white font-bold drop-shadow-xl'>PULSE & PILLS</div>
          </div>

          <p className='text-white my-2 font-light'>Stay tuned for latest updates and new features</p>

          <div className='w-96 flex flex-row h-12 mt-7 ' >
          <input type='text' placeholder='Email address' className='w-72 py-2 px-4 rounded-l-full bg-white border border-r-0 border-gray-300 focus:outline-none flex-grow font-inter bg-transparent'/>
              <button className='bg-[#F2971F] w-28 text-white py-2 px-4  rounded-r-full border border-l-0 border-gray-300 hover:bg-blue-600 transition duration-300 font-inter '>
              Subscribe
              </button>
          </div>

          <div className='space-x-2 mt-3'>
          <input type='checkbox'></input>
          <label>I accept terms and conditions & privacy policy</label>
        </div>


        </div>

     

        <div className='flex flex-row gap-8 text-white mt-2'>
          <div>
            <p className='font-semibold  text-xl'>Information</p>
            <ul className='mt-4 text-base font-normal space-y-1 text-gray-200'>
              <li>About us</li>
              <li>Delivery information</li>
              <li>Privacy Policy</li>
              <li>Sales</li>
            </ul>
            <p className='mt-4'>Terms & Conditions</p>
          </div>
          <div>
            <p className='font-semibold  text-xl'>Account</p>
            <ul className='mt-4 text-base font-normal space-y-1 text-gray-200'>
              <li>Dashboard</li>
              <li>My orders</li>
              <li>Account details</li>
              <li>Returns</li>
            </ul>
            <p className='mt-4'>Wishlist</p>
          </div>

          
        </div>





        <div className='flex flex-col text-white mt-2'>
          <p className='font-semibold  text-xl'>About / Contacts</p>
          <div className='mt-10 flex flex-col gap-4'>
            <div className='flex flex-row gap-2'><LocationOnIcon/><p>sector 35, Chandigarh, India</p></div>
            <div  className='flex flex-row gap-2'><MailIcon/><p>Pulseandpills@gmail.com</p></div>
          </div>
          <div className='flex flex-row gap-2 mt-6'>
            <div className='w-12 h-12 bg-[#15A9E3] rounded-xl place-content-center'><FaFacebookF className='text-2xl m-auto'/></div>
            <div className='w-12 h-12 bg-[#15A9E3] rounded-xl place-content-center'><FaInstagram className='text-2xl m-auto'/></div>
            <div className='w-12 h-12 bg-[#15A9E3] rounded-xl place-content-center'><FaLinkedinIn className='text-2xl m-auto'/></div>
            <div className='w-12 h-12 bg-[#15A9E3] rounded-xl place-content-center'><FaXTwitter className='text-2xl m-auto'/></div>
          </div>
        </div>


      </div>


{/* second section */}
      <div className='w-[87%] h-10 border-t-2 border-gray-300 m-auto flex flex-row justify-between items-center'>
        <div className='text-white'>Developed by RowX</div>
        <div>
          <img src={Payment} alt='logo of accept payment'/>
        </div>
      </div>
    </div>
  )
}

export default Footer