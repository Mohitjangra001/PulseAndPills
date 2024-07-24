import React, { useContext } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FormatPrice from '../Helper/FormatPrice';
import { CartContext } from '../../Context/ContextProvider';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function HomeSectionCard({ name, price, photos, tag, id, quantity, offerPrice, regularPrice, type }) {
  const product = { name, price, photos, tag, id, quantity };
  const { dispatch } = useContext(CartContext);

  const truncateString = (str, num) => {
    if (!str) {
      return '';
    }
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };

  const tagString = Array.isArray(tag) && tag.length > 0 ? tag[0] : '';
  const truncatedTag = truncateString(tagString, 20);
  const truncatedName = truncateString(name, 25);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await axios.post(
        'https://pilse-and-pills.el.r.appspot.com/api/cart/add', // Replace with your backend URL
        { productId: id, quantity: quantity || 1 },
        { headers: { Authorization: `Bearer ${token}` } },
        toast.success('Your order has been added to the cart')
      );
      if (response.status === 201) {
        dispatch({ type: 'Add', product });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div className='sm:h-96 h-max w-[17rem] sm:w-[18rem] flex flex-col rounded-xl border-2 md:my-2 my-1 relative'>
      <Link to={`/Product-details/${id}`}>
        <div className='w-full object-cover h-40 sm:h-48 relative'>
          {photos && photos.length > 0 ? (
            <img src={photos[0]} alt='product' className='w-full h-full object-contain' />
          ) : (
            <img src={'/path/to/default-image.png'} alt='default' className='w-full h-full object-cover' />
          )}
          {offerPrice !== 0 && (
            <div className='absolute top-0 left-0 bg-red-500 text-white px-2 py-1'>
              Special Offer!
            </div>
          )}
        </div>
        <div className='w-full h-full p-2 sm:p-3 flex flex-col'>
          <div className='text-[#15A9E3] text-base'>{truncatedTag}</div>
          <h1 className='text-[#184363] font-semibold text-base mb-4'>{truncatedName}</h1>
          <div className='flex flex-row h-10 mb-1 sm:mb-6 justify-between items-center'>
            <div className='flex flex-row gap-2'>
              <div className="text-lg text-[#090F47] opacity-75 line-through">Rs<FormatPrice price={regularPrice}/></div>
              <div className='text-[#184363] text-xl'><FormatPrice price={price} /></div>
            </div>
            <div className='w-12 h-8 text-center bg-[#4feb54] rounded-full block sm:hidden shadow-md align-middle'>
              <button onClick={addToCart}>
                <AddShoppingCartIcon className='mt-1' />
              </button>
            </div>
          </div>
        </div>
      </Link>
      {type === 'equipment' || window.location.pathname.includes('/Equipment') ? (
        <button 
          className='text-center align-middle bg-[#EDF4] h-10 w-full mx-auto rounded-full mb-2 hover:bg-[#7474ca] hidden sm:block' 
          onClick={addToCart}
        >
          Enquire Now
        </button>
      ) : (
        <button 
          className='text-center align-middle bg-[#EDF4] h-10 w-full mx-auto rounded-full mb-2 hover:bg-[#7474ca] hidden sm:block' 
          onClick={addToCart}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default HomeSectionCard;
