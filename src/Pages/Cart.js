import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItems from '../Component/CartProduct/CartItems';
import emptycart from '../Component/Assets/emptyCart.png'
import { FaAngleLeft } from "react-icons/fa6";
import { MdAddLocationAlt } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart({ isLoggedIn }) {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [cartProduct, setCartProduct] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!isLoggedIn) {
        navigate('/login');
      } else {
        try {
          const token = localStorage.getItem('token');
          if (token) {
            const config = {
              headers: { Authorization: `Bearer ${token}` }
            };

            const userResponse = await axios.get('http://localhost:4000/api/users/getUsers', config);
            const userId = userResponse.data._id;

            const cartResponse = await axios.get(`http://localhost:4000/api/cart/${userId}`, config);
            setCartProduct(cartResponse.data.items);
            console.log(cartResponse.data.items)

          }
        } catch (error) {
          console.error('Error fetching cart products:', error);
        }
      }
    };

    fetchProduct();
  }, [isLoggedIn, navigate]);

  const handleRemoveItem = (productId) => {
    setCartProduct(cartProduct.filter(item => item.productId._id !== productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setCartProduct(cartProduct.map(item => 
      item.productId._id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handlePlaceOrder = async () => {
    if (cartProduct.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!isLoggedIn) {
      navigate('/login');
    } else if (!address.trim()) {
      setErrorMessage('Please enter a valid address to place the order.');
    } else {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };

          const orderDetails = {
            shippingAddress: address,
            items: cartProduct.map(item => ({
              productId: item.productId._id,
              quantity: item.quantity,
              price: item.productId.offerPrice === 0 ? item.productId.discountFees : item.productId.offerPrice,
            })),
            totalAmount: calculateTotalPrice(),
            phNumber: '' // Replace with actual phone number from user data
          };

          await axios.post('http://localhost:4000/api/orders/placeOrder', orderDetails, config);
          toast.success('Order placed successfully');
          navigate('/');

          const userResponse = await axios.get('http://localhost:4000/api/users/getUsers', config);
          const id = userResponse.data._id;
          
          // Remove all items
          await axios.delete(`http://localhost:4000/api/cart/clear/${id}`);
        }
      } catch (error) {
        console.error('Error placing order:', error);
        toast.error('Failed to place order');
      }
    }
  };

  const handleAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  const updateAddress = () => {
    if (newAddress.trim()) {
      setAddress(newAddress);
      setNewAddress('');
      setErrorMessage('');
    }
  };

  const calculateTotalPrice = () => {
    return cartProduct.reduce((total, item) => {
      const price = item.productId.offerPrice === 0 ? item.productId.discountFees : item.productId.offerPrice;
      return total + (price * item.quantity);
    }, 0) + 20;
  };

  return (
    <div className='md:w-4/5 w-full p-4 flex flex-col mx-auto my-5'>
      {/* address section */}
      <div className='w-full bg-[#FEFBF3] h-16 Border-slate-200 my-4 flex flex-row justify-between border-2 rounded-md py-2 px-4 items-center'>
        <input 
          className='items-center text-xl w-full h-full' 
          placeholder='Enter address' 
          value={newAddress}
          onChange={handleAddressChange}
        />
        <div className='hidden md:block w-44 h-full place-content-center px-4 border-l-2'>
          <button 
            className='text-center text-[#F2971F] text-lg flex flex-row gap-2 font-semibold items-center' 
            onClick={updateAddress}
          >
            <span>Add Address</span>
            <MdAddLocationAlt className='text-3xl' />
          </button>
        </div>
        <div className='block md:hidden'>
          <button className='text-3xl p-2' onClick={updateAddress}>
            <MdAddLocationAlt />
          </button>
        </div>
      </div>
      <p className='text-xl my-2'>Current Address: {address}</p>
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}

      {/* product checkout details */}
      <div className='my-10 w-full flex md:flex-row flex-col gap-6'>
        {/* left side */}
        <div className='md:w-3/5 w-full border-2'>
          <Link to="/">
            <div className='ml-4 pt-4 flex flex-row md:text-xl text-lg items-center'>
              <FaAngleLeft />
              <p>Back to Shop</p>
            </div>
          </Link>

          <div className='w-full md:p-10 p-4'>
            <div className='flex flex-row justify-between my-4 text-[#9D9D9D]'>
              <div>My Orders</div>
              <div>Total Items: {cartProduct.length}</div>
            </div>

            <div className='md:px-4 w-full my-2'>
              {cartProduct.map((product) => (
                <CartItems key={product.productId._id} product={product} onRemove={handleRemoveItem} onQuantityChange={handleQuantityChange} />
              ))}
              {cartProduct.length === 0 && <div className='flex flex-col gap-1 items-center justify-center'><img src={emptycart} className='w-80 h-80'/>Your cart is empty</div>}
            </div>
          </div>
        </div>

        {/* right side */}
        <div className='md:w-[35%] w-full border-2 flex flex-col p-4'>
          {/* coupons code */}
          <div className='flex flex-col gap-2'>
            <label className='text-lg font-semibold'>Discount</label>
            <input 
              type='text' 
              placeholder='Enter your promo code' 
              className='border-2 border-gray-300 rounded-md h-8 p-4' 
            />
          </div>
          {/* total price */}
          <div className='my-6 flex flex-col'>
            <p className='text-lg font-semibold'>Price details</p>
            <div className='bg-[#f5f4f4] p-3 mt-2 mb-6 flex flex-col gap-3'>
              {/* subtotal */}
              <div className='flex flex-row justify-between items-center'>
                <div className='text-gray-700 text-base'>Subtotal</div>
                <div>{calculateTotalPrice() - 20}</div>
              </div>
              {/* shipping charge */}
              <div className='flex flex-row justify-between items-center'>
                <div className='text-gray-700 text-base'>Shipping Fee</div>
                <div>20</div>
              </div>
              {/* tax */}
              <div className='flex flex-row justify-between items-center'>
                <div className='text-gray-700 text-base'>including Tax</div>
              </div>
            </div>
            {/* buttons */}
            <button
              className='bg-blue-500 h-10 rounded-lg w-full text-white text-lg font-medium'
              onClick={handlePlaceOrder}
            >
              Place Order (Cash On Delivery only)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
