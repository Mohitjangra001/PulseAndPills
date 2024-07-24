import React, { useState, useEffect } from 'react';
import './YourOrders.css';
import OrderSuccessful from '../Order/OrderSuccessful';
import { useRecoilState } from 'recoil';
import { orderSuccessfulProvider } from '../Providers/OrderSuccessfulProvider';
import axios from 'axios';
import FormatPrice from '../Helper/FormatPrice';

const YourOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(0);
    const [orderSuccessCont, setOrderSuccessCont] = useRecoilState(orderSuccessfulProvider);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                try {
                    const response = await axios.get('https://pilse-and-pills.el.r.appspot.com/api/orders/userOrders', config);
                    const data = response.data;
                    setOrders(data);
                    console.log(data);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            }
        };

        fetchOrders();
    }, []);
    console.log(selectedOrderId);

    return (
        <div className='yourorders'>
            {orderSuccessCont && <OrderSuccessful orderId={selectedOrderId} />}
            <table className='yourorderstable'>
                <thead>
                    <tr>
                        <th scope='col'>Order ID</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Total</th>
                        <th scope='col'>Invoice</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((item) => (
                        <tr key={item._id}>
                            <td data-label='OrderID'>{item._id.slice(-6)}</td> {/* Show only last 6 digits of the Order ID */}
                            <td data-label='OrderDate'>{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td data-label='DeliveryStatus'>
                                <div>
                                    {item.status === 'received' && <span className='greendot'></span>}
                                    {item.status === 'pending' && <span className='yellowdot'></span>}
                                    {item.status === 'shipped' && <span className='bluedot'></span>}
                                    {item.status === 'Cancelled' && <span className='reddot'></span>}
                                    {item.status}
                                </div>
                            </td>
                            <td data-label='Total'> <FormatPrice price={item.totalAmount} /></td>
                            <td data-label='Invoice'>
                                <button
                                    className='mainbutton1'
                                    onClick={() => {
                                        setSelectedOrderId(item._id);
                                        setOrderSuccessCont(true);
                                    }}
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default YourOrders;
