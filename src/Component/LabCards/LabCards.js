import React from 'react';
import research from "../Assets/tests/research.png";
import FormatPrice from '../Helper/FormatPrice';

function LabCards({ title, testLength, regularPrice, sellingPrice, description }) {
  const truncateString = (str, num) => {
    if (!str) {
      return '';
    }
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };

  const truncateddescription = truncateString(description, 110);

  const handleBookNowClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Add any other actions to be performed on button click here
  };

  return (
    <div className='sm:h-[17rem] h-96 w-80 sm:w-96 border-2 shadow-md p-2 bg-white'>
      <img src={research} alt='lab' className='w-16 h-16 object-contain'/>
      <h2 className='text-lg font-bold mt-1 h-12 sm:h-7'>{title}</h2>
      <div className='flex flex-row gap-1 items-center'>
        <p className='text-xl font-semibold text-green-600'><FormatPrice price={sellingPrice} /></p>
        <p className='text-sm line-through'><FormatPrice price={regularPrice} /></p>
      </div>
      <p className='text-sm mt-2'>Test Included: {testLength}</p>
      <p className='text-sm mt-6 sm:mt-2 h-20 sm:h-10'>
      {window.innerWidth <= 640 ? truncateString(description, 180) : truncateddescription}
      </p>
      <button
        className='w-28 h-9 border-2 mt-6 sm:mt-3 rounded-md bg-green-400'
        onClick={handleBookNowClick}
      >
        Book Now
      </button>
    </div>
  );
}

export default LabCards;
