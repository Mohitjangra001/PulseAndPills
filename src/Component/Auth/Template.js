import React from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const Template = ({ title, desc1, desc2, image, formtype, setIsLoggedIn }) => {
  return (
    <div className='flex flex-col-reverse md:flex-row w-11/12 max-w-[1160px] py-10 mx-auto gap-x-12 justify-center items-center gap-y-12 md:gap-y-0 mb-16'>
      <div className='w-full max-w-[450px] text-center md:text-left'>
        <h1 className='font-semibold text-[1.875rem] leading-[2.375rem]'>{title}</h1>
        <p className='text-[1.125rem] leading-[1.625rem] mt-4'>
          <span className='text-richblack-100'>{desc1}</span><br />
          <span className='text-blue-100 italic'>{desc2}</span>
        </p>
        {formtype === 'signup' ? (
          <SignupForm setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
      <div className=' w-full max-w-[450px] flex justify-center'>
        <img className='' src={image} alt='pattern' width={550} height={500} loading='lazy' />
      </div>
    </div>
  );
};

export default Template;
