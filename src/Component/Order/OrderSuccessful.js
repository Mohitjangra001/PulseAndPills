import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { orderSuccessfulProvider } from '../Providers/OrderSuccessfulProvider';
import axios from 'axios';
import FormatPrice from '../Helper/FormatPrice';

const OrderSuccessful = ({ orderId }) => {
    const [orderSuccessCont, setOrderSuccessCont] = useRecoilState(orderSuccessfulProvider);
    const [orderData, setOrderData] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState('');

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const config = {
                        headers: { Authorization: `Bearer ${token}` }
                    };
                    const response = await axios.get(`https://pulsenpills.onrender.com/api/orders/${orderId}`, config);
                    setOrderData(response.data);
                }
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };

        fetchOrderData();
    }, [orderId]);

    useEffect(() => {
        if (orderData) {
            const calculateTimeRemaining = () => {
                const orderCreatedAt = new Date(orderData.createdAt);
                const deliveryTime = new Date(orderCreatedAt.getTime() + 60 * 60 * 1000); // 1 hour later
                const currentTime = new Date();
                const timeDifference = deliveryTime - currentTime;

                if (timeDifference > 0) {
                    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
                    setTimeRemaining(`${minutes}m`);
                } else {
                    setTimeRemaining('Your order is on the way, sorry for the delay');
                }
            };

            if (orderData.status === 'shipped') {
                const intervalId = setInterval(calculateTimeRemaining, 1000);
                return () => clearInterval(intervalId);
            } else if (orderData.status === 'delivered') {
                setTimeRemaining('Delivered');
            } else if (orderData.status === 'pending') {
                setTimeRemaining('Your order is getting ready for shipment');
            }
        }
    }, [orderData]);

    if (!orderData) return null; // Return null if data is not yet fetched

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <button
                className='absolute top-2 right-2 text-gray-500 w-8 h-8 rounded-full flex justify-center items-center bg-white hover:bg-blue-500 hover:text-white'
                onClick={() => {
                    setOrderSuccessCont(false);
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className='bg-white w-4/5 h-4/5 rounded-lg overflow-y-auto'>
                <div className='flex flex-col p-5'>
                    <div className='flex flex-col items-center mb-5'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                        </svg>
                        <h2 className='text-center text-xl'>{orderData.status === 'delivered' ? 'Delivered' : `Order ID: ${orderId}`}</h2>
                        <h3 className='text-center text-lg text-green-500'>{timeRemaining}</h3>
                    </div>

                    <div className='w-full flex flex-wrap justify-between'>
                        <h2 className='text-lg font-semibold text-blue-500 w-full'>Order Summary</h2>
                        <div className='flex gap-2 w-full md:w-1/2'>
                            <p className='text-gray-600 text-base'>Order Number : </p>
                            <p className='text-gray-800 text-base font-semibold'>{orderData._id.slice(-6)}</p>
                        </div>
                        <div className='flex gap-2 w-full md:w-1/2'>
                            <p className='text-gray-600 text-base'>Order Date : </p>
                            <p className='text-gray-800 text-base font-semibold'>{new Date(orderData.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className='flex gap-2 w-full md:w-1/2'>
                            <p className='text-gray-600 text-base'>Name : </p>
                            <p className='text-gray-800 text-base font-semibold'>{orderData.userId ? `${orderData.userId.firstName} ${orderData.userId.lastName}` : 'Unknown'}</p>
                        </div>
                        <div className='flex gap-2 w-full md:w-1/2'>
                            <p className='text-gray-600 text-base'>Email : </p>
                            <p className='text-gray-800 text-base font-semibold'>{orderData.customerEmail}</p>
                        </div>
                        <div className='flex gap-2 w-full md:w-1/2'>
                            <p className='text-gray-600 text-base'>Payment Method : </p>
                            <p className='text-gray-800 text-base font-semibold'>Cash On Delivery</p>
                        </div>
                        <div className='flex gap-2 w-full md:w-1/2'>
                            <p className='text-gray-600 text-base'>Shipping Address : </p>
                            <p className='text-gray-800 text-base font-semibold'>{orderData.shippingAddress}</p>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <table className='w-full border-collapse'>
                            <thead className='bg-blue-500 text-white'>
                                <tr>
                                    <th className='p-2 text-left'>Sno.</th>
                                    <th className='p-2 text-left'>Product</th>
                                    <th className='p-2 text-left'>Quantity</th>
                                    <th className='p-2 text-left'>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData.products && orderData.products.map((item, index) => (
                                    <tr key={index} className='border-t'>
                                        <td className='p-2'><p>{index + 1}</p></td>
                                        <td className='p-2'><p>{item.productId ? `${item.productId.title}` : 'Unknown'}</p></td>
                                        <td className='p-2'><p>{item.quantity}</p></td>
                                        <td className='p-2'><p><FormatPrice price={item.price * item.quantity} /></p></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className='flex flex-col items-center justify-between mt-5 p-5'>
                        <div className='flex justify-between w-full md:w-1/3'>
                            <p className='text-gray-600'>Shipping</p>
                            <p className='text-gray-800'><FormatPrice price={20} /></p>
                        </div>
                        <div className='flex justify-between w-full md:w-1/3'>
                            <p className='text-gray-600'>Including Tax(18%)</p>
                        </div>
                        <div className='flex justify-between w-full md:w-1/3'>
                            <p className='text-gray-600 font-bold'>Total</p>
                            <p className='text-red-500 font-bold'><FormatPrice price={orderData.totalAmount} /></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessful;
