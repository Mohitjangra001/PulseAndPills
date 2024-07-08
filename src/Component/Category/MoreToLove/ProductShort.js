import React from 'react';
import DefaultProductImage from "../../Assets/product_image/Product1.png"; // Fallback image
import FormatPrice from '../../Helper/FormatPrice';
import { Link } from 'react-router-dom';

function ProductShort({id, name, firstPrice, photos, LastPrice }) {
  
  const truncateString = (str, num) => {
    if (!str) {
      return '';
    }
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };
  // Ensure photos array has at least two elements to access index 1
  const imageUrl = photos && photos.length > 1 ? photos[1] : DefaultProductImage;
  const truncatedName = truncateString(name, 25);

  return (
    <Link to={`/Product-details/${id}`}>
    <div className='flex flex-row gap-2 w-[22rem] h-28 m-2 rounded-lg border-2 border-gray-200'>
      <div className='h-28'>
        <img src={imageUrl} alt='product' className='w-28 h-full object-contain rounded-md' />
      </div>
      <div className='py-4 flex flex-col gap-2'>
        <h1 className='text-base font-medium'>{truncatedName}</h1>
        <span className='text-[#184363] font-light text-base'><FormatPrice price={firstPrice}/> - <FormatPrice price={LastPrice}/></span>
      </div>
    </div>
    </Link>

  );
}

export default ProductShort;
