import React from "react";
import FormatPrice from "../Helper/FormatPrice";
import { Link } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux

function OffersCards({ id, title, price, image, description,regularPrice }) {
  const dispatch = useDispatch(); // Initialize dispatch
  const imageUrl = Array.isArray(image) && image.length > 0 ? image[0] : '';

  // Add to cart function
  const addToCart = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await axios.post(
        'https://pulsenpills.onrender.com/api/cart/add', // Replace with your backend URL
        { productId: id, quantity: 1 }, // Fixed quantity to 1 for this example
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201) {
        dispatch({ type: 'Add', product: { id, title, price, image, description } });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const truncateString = (str, num) => {
    if (!str) {
      return '';
    }
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };

  const truncatedDescription = truncateString(description, 65);
  const truncatedTitle = truncateString(title, 32);

  return (
    <Link to={`/Product-details/${id}`}>

    <div className="h-[22rem] w-80 sm:w-[610px] flex flex-row my-6 rounded-lg border-2 txt-[#184363]">
        <div>
          <img
            src={imageUrl}
            alt="product on sale"
            className="h-full w-64 object-contain "
          />
        </div>
      <div className="pl-5 pt-4 pr-3 w-[22rem] gap-1 flex flex-col">
        <h1 className="text-xl font-bold h-16 mb-2">{truncatedTitle}</h1>
        <div className="flex gap-2 items-center">
        <div className="text-lg text-[#090F47] opacity-75 line-through">Rs<FormatPrice price={regularPrice}/></div>
        <h2 className="text-xl font-bold h-8"><FormatPrice price={price}/></h2>
        </div>
        <ul className="my-7 space-y-2 h-24">{truncatedDescription}</ul>

        <div>
          <button
            onClick={addToCart}
            className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
          >
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
              <svg
                className="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
              <svg
                className="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
              Check Out
            </span>
          </button>
        </div>
      </div>
    </div>
    </Link>

  );
}

export default OffersCards;
