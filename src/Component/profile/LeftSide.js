import React from 'react';
import { CgProfile } from "react-icons/cg";
import './leftside.css'
import { Link } from 'react-router-dom';

function LeftSide({activePage}) {
  return (
    <div>
        {
            activePage ==='accountsettings'?
        <div className=' s2'>
        <CgProfile className='w-8 h-8 text-gray-400 hover:bg-gray-500 cursor-pointer'/>
        <span >Account Setting</span>
        </div>
        :
        
        <Link  to="/user/accountsettings">
        <div className='s1'>
        <CgProfile />
        <span>Account Setting</span>
        </div>
        </Link>
        }

        {
            activePage ==='yourorders'?
        <div className='s2'>
        <CgProfile />
        <span>Account Setting</span>
        </div>
        : <Link  to="/user/yourorders">
        <div className='s1'>
        <CgProfile />
        <span>Your Order</span>
        </div>
        </Link>
        }

        {
            activePage ==='accountsettings'?
        <div>
        <CgProfile />
        <span>Account Setting</span>
        </div>
        :<div>
        <CgProfile />
        <span>Account Setting</span>
        </div>
        }

        {
            activePage ==='accountsettings'?
        <div>
        <CgProfile />
        <span>Account Setting</span>
        </div>
        :<div>
        <CgProfile />
        <span>Account Setting</span>
        </div>
        }

        {
            activePage ==='accountsettings'?
        <div>
        <CgProfile />
        <span>Account Setting</span>
        </div>
        :<div>
        <CgProfile />
        <span>Account Setting</span>
        </div>
        }

        {
            activePage ==='accountsettings'?
        <div>
        <CgProfile />
        <span>Account Setting</span>
        </div>
        :<div>
        <CgProfile />
        <span>Account Setting</span>
        </div>
        }
    </div>
  )
}

export default LeftSide