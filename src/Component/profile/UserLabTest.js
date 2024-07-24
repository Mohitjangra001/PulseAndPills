import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './YourOrders.css'; // Reuse the CSS for simplicity
import { toast } from 'react-toastify';
import FormatPrice from '../Helper/FormatPrice';

const UserLabTest = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        try {
          const response = await axios.get('https://pilse-and-pills.el.r.appspot.com/api/bookings/getLabTest', config);
          const data = response.data;
          setBookings(data);
        } catch (error) {
          console.error('Error fetching bookings:', error);
          toast.error('Failed to fetch bookings.');
        }
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className='yourorders'>
      <h2>Your Lab Tests</h2>
      <table className='yourorderstable'>
        <thead>
          <tr>
            <th scope='col'>Booking ID</th>
            <th scope='col'>Date</th>
            <th scope='col'>Test</th>
            <th scope='col'>Total</th>
            <th scope='col'>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td data-label='BookingID'>{booking._id.slice(-6)}</td> {/* Show only last 6 digits of the Booking ID */}
              <td data-label='Date'>{new Date(booking.createdAt).toLocaleDateString()}</td>
              <td data-label='Test'>
                {booking.tests.map((test) => (
                  <span key={test._id}>{test.title}<br /></span>
                ))}
              </td>
              <td data-label='Total'><FormatPrice price={booking.totalAmount} /></td>
              <td data-label='Status'>{booking.requestStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserLabTest;
