import React from "react";
import { RxCross2 } from "react-icons/rx";
import FormatPrice from "../Helper/FormatPrice";
import axios from "axios";

function CartItems({ product, onRemove,onQuantityChange  }) {
  console.log(product)
  const deleteProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const userResponse = await axios.get(`https://pulsenpills.onrender.com/api/users/getUsers`, config);
        const userId = userResponse.data._id; // Assuming the response contains user data with _id

        await axios.post('https://pulsenpills.onrender.com/api/cart/remove', {
          userId: userId,
          productId: product.productId._id
        }, config);

        // Call the onRemove callback to update the parent component's state
        onRemove(product.productId._id);
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
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

  const name = product.productId.title;
  const truncatedName = truncateString(name, 35); // Adjust the number as needed

 
  const increment = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const userResponse = await axios.get(`https://pulsenpills.onrender.com/api/users/getUsers`, config);
        const userId = userResponse.data._id;

        await axios.post('https://pulsenpills.onrender.com/api/cart/add', {
          productId: product.productId._id,
          quantity: 1
        }, config);

        onQuantityChange(product.productId._id, product.quantity + 1);
      }
    } catch (error) {
      console.error("Error incrementing product quantity:", error);
    }
  };

  const decrement = async () => {
    try {
      if (product.quantity > 1) {
        const token = localStorage.getItem('token');
        if (token) {
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          const userResponse = await axios.get(`https://pulsenpills.onrender.com/api/users/getUsers`, config);
          const userId = userResponse.data._id;

          await axios.post('https://pulsenpills.onrender.com/api/cart/add', {
            productId: product.productId._id,
            quantity: -1
          }, config);

          onQuantityChange(product.productId._id, product.quantity - 1);
        }
      }
    } catch (error) {
      console.error("Error decrementing product quantity:", error);
    }};

  return (
    <div className="flex flex-row w-full h-52 lg:h-44 border-2 border-[#d0cece] mb-16">
      {/* left side photo */}
      <div className="md:w-48 w-44 h-full">
        <img
          src={product.productId.images && product.productId.images.length > 0 ? product.productId.images[0] : '/path/to/default-image.png'}
          alt="productImg"
          className="w-full h-full object-contain p-2"
        />
      </div>

      {/* right side product details */}
      <div className="flex flex-col gap-2 w-full px-2 py-3 md:p-4">
        <div className="flex flex-row justify-between">
          <div>{truncatedName}</div>
          <div>
            <button onClick={deleteProduct}>
              <RxCross2 className="font-semibold" />
            </button>
          </div>
        </div>

        <div>
          {/* price */}
          <div className="mt-2">
            Price: <FormatPrice price={product.productId.offerPrice === 0 ? product.productId.discountFees : product.productId.offerPrice} />
          </div>

          {/* increment and decrement */}
          <div className="py-1 px-2 inline-block bg-white border border-gray-200 rounded-lg mt-6">
            <div className="flex items-center gap-x-1.5">
              <button
                type="button"
                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={decrement}
                disabled={product.quantity === 1}
              >
                <svg
                  className="flex-shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                </svg>
              </button>
              <input
                className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0"
                type="text"
                value={product.quantity}
                readOnly
              />
              <button
                type="button"
                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={increment}              >
                <svg
                  className="flex-shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
